import { stat } from 'fs';
import { Ijob } from './ijob';
import { DocumentData, QuerySnapshot } from 'firebase/firestore';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Job {
  // jobName!: string;
  // salary!: number;
  // jobType!: string;
  // location!: string;
  // //   companyName: string;
  // companyRefrence: any;
  // exprienceLevel!: string;
  // qualification!: string;
  // status!: string;
  // constructor(
  //   jobName: string,
  //   salary: number,
  //   jobType: string,
  //   location: string,
  //   // companyName: string,
  //   companyRefrence: any,
  //   exprienceLevel: string,
  //   qualification: string,
  //   status: string
  // ) {
  //   // this.companyName = companyName;
  //   this.companyRefrence = companyRefrence;
  //   this.exprienceLevel = exprienceLevel;
  //   this.jobName = jobName;
  //   this.jobType = jobType;
  //   this.location = location;
  //   this.qualification = qualification;
  //   this.salary = salary;
  //   this.status = status;
  // }
  convertToArray(snapshot: QuerySnapshot<DocumentData>) {
    const jobs: any[] = [];
    // console.log('alooooooooooooooooooo');
    snapshot.docs.forEach((job: any) => {
      jobs.push({
        jobName: job.data().Job_title,
        salary: job.data().Salary,
        jobType: job.data().Job_Type,
        location: job.data().Location,
        companyRefrence: job.data().Company_Ref,
        qualification: job.data().Qualification,
        job_description: job.data().Job_Description,
        status: job.data().Status,
        job_id:job.data().job_id,
        company_id:job.data().company_id,
      });
    });
    // console.log(jobs);
    return jobs;
  }
}
