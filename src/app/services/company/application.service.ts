import { Injectable } from '@angular/core';
import { Firestore, collection, getDocs } from '@angular/fire/firestore';
import { Job } from '../../Models/job';
import { Application } from '../../Models/application';
import { SavedJobs } from '../../Models/saved-jobs';
import { User } from '../../Models/user';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApplicationService {
 
  public applicantSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>(
    []
  );
  public applicantsList$: Observable<any[]> = this.applicantSubject.asObservable();
 //////////////////////////////////////////////////////////////////////////////////////
  public allApplicantSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>(
    []
  );
  public allApplicantList$: Observable<any[]> = this.allApplicantSubject.asObservable();
  ////////////////////////////////////////////////////////////////////////////////////

  constructor(
    private firestore: Firestore,
    public jobObject: Job,
    public appliedJobObject: Application,
    public user: User
  ) {}
  /////////////////////////////////////////////////////////////////////
  // get the applicants of a specified jobs 
  //////////////////////////////////////////////////////////////////////

  // get a snapshot from the table you want
  async getSnapshot(table: string) {
    const db = collection(this.firestore, table);
    const snapshot = await getDocs(db);
    return snapshot;
  }
  // get a list applications
  async getApplications() {
    let appliedJobsSnapshot = await this.getSnapshot('/Applications');
    let appliedJobsArray =
      this.appliedJobObject.convertToArray(appliedJobsSnapshot);
    return appliedJobsArray;
  }
  // get a list of users
  async getUsers() {
    let userSnapshot = await this.getSnapshot('/Users');
    let userArray = this.user.convertToArray(userSnapshot);
    return userArray;
  }
  async getUsersIDs(jobID: string) {
    const userIDs: any = [];
    // first we will take the job ids from the application to know the job details
    const applications = await this.getApplications();
    for (let application of applications) {
      if (application.job_id === jobID) {
        userIDs.push(application.user_id);
      }
    }
    return userIDs;
  }
  async getJobApplications(jobID: string) {
    const applicants: any = [];
    const IDS = await this.getUsersIDs(jobID);
    // fetch all users
    const users = await this.getUsers();
    for (let id of IDS) {
      for (let user of users) {
        if (id === user.user_id) {
          console.log(id);
          applicants.push(user);
          break;
        }
      }
    }
    this.updateApplicantsList(applicants);
  }

  updateApplicantsList(newList: any[]) {
    this.applicantSubject.next(newList);
  }

  /////////////////////////////////////////////////////////////////////////
  // get all applicants 
  ////////////////////////////////////////////////////////////////////////
  async getApplicantsIDSWhoAppliedForTheCompany(){
    const company_id = localStorage.getItem('company_id');
    console.log(company_id)
    const applicantions = await this.getApplications();
    const applicant_ids=[];
    for(let application of applicantions){
      console.log(company_id , ' ' , application.company_id)
      if(application.company_id===company_id){
        applicant_ids.push(application.user_id);
      }
    }
    return applicant_ids;
  }
  async getAllApplicants(){
    const applicant_ids = await this.getApplicantsIDSWhoAppliedForTheCompany();
    const users = await this.getUsers();
    const applicants=[];
    for(let user_id of applicant_ids){
      for(let user of users){
        if(user.user_id ===user_id){
          applicants.push(user);
        }
      }
    }
    this.updateAllApplicantsList(applicants);
  }
  updateAllApplicantsList(newList:any){
    this.allApplicantSubject.next(newList);
  }


  /////////////////////////////////////////////////////////////////////////
  // Search applicants 
  ////////////////////////////////////////////////////////////////////////
  async getApplicants(){
    const applicant_ids = await this.getApplicantsIDSWhoAppliedForTheCompany();
    const users = await this.getUsers();
    const applicants=[];
    for(let user_id of applicant_ids){
      for(let user of users){
        if(user.user_id ===user_id){
          applicants.push(user);
        }
      }
    }
    return applicants;
  }
  async searchApplicants(name:string){
    const applicants = await this.getApplicants();
     // Perform your filtering operation
     const filteredList = applicants.filter(
      (item: {
        firstName:string,
        lastName:string
      }) =>
        item.firstName.toLowerCase().includes(name.toLocaleLowerCase())||item.lastName.toLowerCase().includes(name.toLocaleLowerCase())
    );
    this.updateAllApplicantsList(filteredList);
  }


}
