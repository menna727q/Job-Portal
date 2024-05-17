import { Injectable } from '@angular/core';
import {
  query,
  Firestore,
  collection,
  collectionData,
  addDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  DocumentData,
  CollectionReference,
  onSnapshot,
  QuerySnapshot,
  where,
} from '@angular/fire/firestore';
import { Job } from '../../Models/job';
import { app } from '../../environment/environment';
import { doc, getFirestore, setDoc } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  db = getFirestore(app);

  constructor(public firestore: Firestore, public jobObject: Job , public router:Router) {}

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
  }

  // get the job detail
  async getJobDetail(jobID: string | null) {
    const jobRef = collection(this.db, 'Jobs');
    // Create a query against the collection.
    const q = query(jobRef, where('job_id', '==', jobID));
    const querySnapshot = await getDocs(q);
    const jobDetail = this.jobObject.convertToArray(querySnapshot)[0];
    // querySnapshot.forEach((doc) => {
    //   // doc.data() is never undefined for query doc snapshots
    //   console.log(doc.id, ' => ', doc.data());
    // });
    console.log(jobDetail.job_description)
    console.log(jobDetail);
    return jobDetail;
  }
  ////////////////////////////////////////////////////////////////////////

  // delete job
  async deletePostedJobs(jobId: string) {
    await deleteDoc(doc(this.db, 'Jobs', jobId));
    // lazm n delete al applications ale m3mola 3leha kaman
  }
  /////////////////////////////////////////////////////////////////////////

  //post a job
  async postJob(jobData: any) {
    const uid = uuidv4();
    await setDoc(doc(this.db, 'Jobs', uid), {
      Job_title:jobData.jobName,
      Salary:Number(jobData.salary),
      Job_Type:jobData.jobType.jobtype,
      Location:jobData.location,
      Qualification:jobData.qualification,
      Job_Description:jobData.job_description,
      Status:'opened',
      job_id:uid,
      company_id:localStorage.getItem('company_id'),
    })
      .then(()=>this.router.navigate(['/posts']))
      .catch((err) => console.log(err));
  }

  ////////////////////////////////////////////////////////////////////////////
  // edit post
  ////////////////////////////////////////////////////////////////////////////
  async updatePost(jobId: any , jobData:any) {
    const jobRef = doc(this.db, 'Jobs', jobId);
    // Set the "capital" field of the city 'DC'
    await updateDoc(jobRef, {
      Job_title:jobData.jobName,
      Salary:jobData.salary,
      Location:jobData.location,
      Job_Type:jobData.jobType,
      Job_Description:jobData.job_description,
      Qualification:jobData.qualification
    }).then(()=>this.router.navigate(['/posts-detail/' , jobId]));
    // You can also update a single field with: await cityRef.UpdateAsync("Capital", false);
  }

}
