import { Injectable } from '@angular/core';
import {
  query,
  Firestore,
  getFirestore,
  collection,
  collectionData,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  DocumentData,
  CollectionReference,
  onSnapshot,
  QuerySnapshot,
  where,
  setDoc,
} from '@angular/fire/firestore';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Job } from '../../Models/job';
import { Application } from '../../Models/application';
import { SavedJobs } from '../../Models/saved-jobs';
import { app } from '../../environment/environment';
import { v4 as uuidv4 } from 'uuid';
import { application } from 'express';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  db = getFirestore(app);
  private listSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  public homeList$: Observable<any[]> = this.listSubject.asObservable();

  constructor(
    private firestore: Firestore,
    public jobObject: Job,
    public appliedJobObject: Application,
    public savedJobs: SavedJobs
  ) {}
  // get a snapshot from the table you want
  async getSnapshot(table: string) {
    const db = collection(this.firestore, table);
    const snapshot = await getDocs(db);
    return snapshot;
  }
  // get a list of jobs
  async getJobs() {
    let jobsSnapshot = await this.getSnapshot('/Jobs');
    let jobsArray = this.jobObject.convertToArray(jobsSnapshot);
    return jobsArray;
    // this.updateHomepageList(jobsArray);
  }
  // update the list of jobs
  async getAllJobs() {
    let jobsSnapshot = await this.getSnapshot('/Jobs');
    let jobsArray = this.jobObject.convertToArray(jobsSnapshot);

    this.updateHomepageList(jobsArray);
  }
  // get a list applied jobs
  async getAppliedJobs() {
    let appliedJobsSnapshot = await this.getSnapshot('/Applications');
    let appliedJobsArray =
    this.appliedJobObject.convertToArray(appliedJobsSnapshot);
    return appliedJobsArray;
  }
  // get a list of the saved jobs
  async getSavedJobs() {
    let savedJobsSnapshot = await this.getSnapshot('/Saved_Jobs');
    let savedJobsArray = this.savedJobs.convertToArray(savedJobsSnapshot);
    console.log(savedJobsArray);
    return savedJobsArray;
  }
  // Search the jobs and filter them out
  async searchJobs(
    job: string ,
    jobType: string,
    salary: number,
    location: string
  ) {
    let jobsSnapshot = await this.getSnapshot('/Jobs');
    const jobsArray = this.jobObject.convertToArray(jobsSnapshot);
    console.log(jobsArray);
    if(job===undefined) job=''
    if(jobType===undefined) jobType=''
    if(salary===undefined) salary=0;
    if(location===undefined) location=''
    // Perform your filtering operation
    const filteredList = jobsArray.filter(
      (item: {
        location: string;
        salary: any;
        jobType: string;
        jobName: string;
      }) =>
        item.jobName.toLocaleLowerCase().includes(job.toLocaleLowerCase()) ||
        item.jobType.toLocaleLowerCase().includes(jobType.toLocaleLowerCase()) ||
        item.salary >= salary ||
        item.location.toLocaleLowerCase().includes(location.toLocaleLowerCase())
    );
    // Update the list in the service
    // this.listSubject.next(newList);
    console.log(filteredList);
    this.updateHomepageList(filteredList);
  }

  updateHomepageList(newList: any[]) {
    this.listSubject.next(newList);
  }

  // get the job detail
  async getJobDetail(jobID: string | null) {
    const jobRef = collection(this.db, 'Jobs');
    // Create a query against the collection.
    const q = query(jobRef, where('job_id', '==', jobID));
    const querySnapshot = await getDocs(q);
    const jobDetail = this.jobObject.convertToArray(querySnapshot)[0];
    console.log(jobDetail);
    return jobDetail;
  }

  ///////////////////////////////////////////////////////////////////////////////
  // Save job
  //////////////////////////////////////////////////////////////////////////////
  async saveJobs(jobId:any): Promise<boolean>{
    try{
      const uid = uuidv4();
      const userID= localStorage.getItem('user_id');
      await setDoc(doc(this.db, 'Saved_Jobs', uid), {
        user_id: userID,
        job_id:jobId
      })
      return true;
    }catch(err:any){
      console.log(err);
      return false;
    } 
  
  }
  
}
