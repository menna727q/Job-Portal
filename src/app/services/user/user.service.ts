import { inject, Injectable, NgZone } from '@angular/core';
import { updateProfile } from 'firebase/auth';
// import {
//   Auth,
//   signInWithEmailAndPassword,
//   UserCredential,
// } from '@angular/fire/auth';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
// import {  Observable } from 'rxjs';
import { Route, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { iuser } from '../../Models/iuser';
import * as firebase from 'firebase/app';
// import { Injectable } from '@angular/core';
import {
  query,
  Firestore,
  getFirestore,
  collection,
  collectionData,
  addDoc,
  getDocs,
  deleteDoc,
  DocumentData,
  CollectionReference,
  onSnapshot,
  QuerySnapshot,
  where,
  DocumentReference,
} from '@angular/fire/firestore';
import { doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL} from 'firebase/storage';
import {Storage} from'@angular/fire/storage'
import { from , switchMap } from 'rxjs';
// import {
//   AngularFireDatabase,
//   AngularFireList,
// } from '@angular/fire/compat/database';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { AuthService } from '../auth.service';
import { JobService } from './job.service';
import { app } from '../../environment/environment';
import { User } from '../../Models/user';
import { SavedJobs } from '../../Models/saved-jobs';
// import { application } from 'express';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  applications: any = [];
  jobs: any[] = [];
  savedJobs: any = [];
  db = getFirestore(app);

  // user_id: number;
  user: any = {
    user_id: localStorage.getItem('user_id'),
    name: localStorage.getItem('name') || '',
    jobTitle: localStorage.getItem('jobTitle') || '',
    phoneNumber: localStorage.getItem('phone') || '',
    overview: localStorage.getItem('overview') || '',
    email: localStorage.getItem('email') || '',
    password: '',
    gender: false,
    emailsignup: '',
    password_signup: '',
    education: '',
    profilePicture: undefined,
    resume: undefined,
  };

  private listAppliedSubject: BehaviorSubject<any[]> = new BehaviorSubject<
    any[]
  >([]);
  public appliedJobs$: Observable<any[]> =
    this.listAppliedSubject.asObservable();

  private listSavedSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>(
    []
  );
  public savedJobs$: Observable<any[]> = this.listSavedSubject.asObservable();

  constructor(
    public authService: AuthService,
    public jobService: JobService,
    public userObject: User,
    public router: Router,
    private storage:Storage
  ) {}

  // we will fetch the applied , saved and his profile data
  async getJobIdsInAppicationTable() {
    const jobId: any = [];
    // first we will take the job ids from the application to know the job details
    this.applications = await this.jobService.getAppliedJobs();
    for (let application of this.applications) {
      if (application.user_id === this.user.user_id) {
        jobId.push(application.job_id);
      }
    }
    return jobId;
  }
  async getAppliedJobs() {
    const appliedjobs: any[] = [];
    const IDS = await this.getJobIdsInAppicationTable();
    await this.jobService.getAllJobs();
    let jobs = await this.jobService.getJobs();
    // console.log(IDS);
    // console.log(jobs);
    for (let id of IDS) {
      for (let job of jobs) {
        if (id == job.job_id) {
          // console.log(id);
          appliedjobs.push(job);
        }
      }
    }
    this.updateAppliedJobsList(appliedjobs);
  }

  updateAppliedJobsList(newList: any[]) {
    this.listAppliedSubject.next(newList);
  }
  //fetch saved jobs
  async getJobIdsInSavedJobsTable() {
    const jobId: any = [];
    // first we will take the job ids from the application to know the job details
    this.savedJobs = await this.jobService.getSavedJobs();
    for (let savedJob of this.savedJobs) {
      if (savedJob.user_id === this.user.user_id) {
        jobId.push(savedJob.job_id);
      }
    }
    return jobId;
  }
  async getSavedJobs() {
    const savedjobs: any[] = [];
    const jobIDS = await this.getJobIdsInSavedJobsTable();
    await this.jobService.getAllJobs();
    let jobs = await this.jobService.getJobs();
    // console.log(jobIDS);
    // console.log(jobs);
    for (let id of jobIDS) {
      for (let job of jobs) {
        if (id == job.job_id) {
          // console.log(id);
          savedjobs.push(job);
        }
      }
    }
    this.updateSavedJobsList(savedjobs);
  }

  // async updateProfile(formData: any): Promise<void> {
  //   try{
  //   if(loginUser){
  //     console.log(loginUser,"Not updated yet")
  //     const ref =doc(this.firestore,'Users',loginUser.uid)

  //     return updateDoc(ref,{...formData})
  //   }
  //   }catch(error:any){
  //     console.error('Error updating profile:', error);
  //     throw new Error('Failed to update profile: ' + error.message);
  //   }
  // }
  updateSavedJobsList(newList: any[]) {
    this.listSavedSubject.next(newList);
  }

  // fetch profile
  async getUserInfo() {
    const userRef = collection(this.db, 'Users');
    // Create a query against the collection.
    const q = query(userRef, where('user_id', '==', this.user.user_id));
    const querySnapshot = await getDocs(q);
    const userDetail = this.userObject.convertToArray(querySnapshot)[0];
    // querySnapshot.forEach((doc) => {
    //   // doc.data() is never undefined for query doc snapshots
    //   console.log(doc.id, ' => ', doc.data());
    // });
    // console.log(userDetail);
    return userDetail;
  }

  /////////////////////////////////////////////////////////////////////////////////////
  // Edit profile info
  ////////////////////////////////////////////////////////////////////////////////////
  async editUserProfile(userData: any) {
    const userRef = doc(this.db, 'Users', this.user.user_id);
    // Set the "capital" field of the city 'DC'

    await updateDoc(userRef, {
      Email: userData.email,
      Password: userData.password,
      // First_Name: userData.First_Name,
      // Last_Name: userData.lastName,
      // Gender: userData.gender,
      Phone_Number: userData.phoneNumber,
      Education: userData.education,
      Job_Title: userData.jobTitle,
      Overview: userData.overview,
      Profile_Picture: userData.profilePicture || '',
      Resume: userData.resume || '',
    })
      .then()
      .catch((err) => console.log(err));
    // You can also update a single field with: await cityRef.UpdateAsync("Capital", false);
  }

  /////////////////////////////////////////////////////////////////////////////
  // unsave job
  ////////////////////////////////////////////////////////////////////////////
  async searchInSavedJobs(jobID: any) {
    const savedJobsRef = collection(this.db, 'Saved_Jobs');
    const user_id = localStorage.getItem('user_id');
    // Create a query against the collection.
    const q = query(
      savedJobsRef,
      where('user_id', '==', user_id),
      where('job_id', '==', jobID)
    );
    const querySnapshot = await getDocs(q);
    const result: any[] = [];
    querySnapshot.docs.forEach((savedJob: any) => {
      // console.log(user.payload.doc.id)
        result.push(
          savedJob.id
      );
    });
    // querySnapshot.forEach((doc) => {
    //   // doc.data() is never undefined for query doc snapshots
    //   console.log(doc.id, ' => ', doc.data());
    // });
    // console.log(userDetail);
    return result[0];
  }
  async unSaveJob(jobID: any) {
    // console.log(jobID)
    const savedJob = await this.searchInSavedJobs(jobID);
    console.log(savedJob);
    await deleteDoc(doc(this.db, 'Saved_Jobs', savedJob))
      .then(() => this.router.navigate(['saved-jobs']))
      .catch((err) => console.log(err));
    // lazm n delete al applications ale m3mola 3leha kaman
  }
  uploadImage(image: File, path: string): Observable<string> {
    const storageRef = ref(this.storage, path); // Concatenate the path directly with the storage reference
    const uploadTask = from(uploadBytes(storageRef, image));
    return uploadTask.pipe(switchMap((result) => getDownloadURL(result.ref)));
    
  }
  
  // updateProfile(profileData: Partial<User>): Observable<any> {
  //   const userRef = collection(this.db, 'Users');
  //   // Create a query against the collection.
  //   const q = query(userRef, where('Email', '==', email),where('Password' ,'==' , password));
  //   const querySnapshot = await getDocs(q);
  //   const userDetail = this.user.convertToArray(querySnapshot)[0];
  //   return of(userDetail).pipe(
  //     concatMap((userDetail) => {
  //       if (!userDetail) throw new Error('Not authenticated');

  //       return this.updateProfile(userDetail, profileData);
  //     })
  //   );
  // }
}
