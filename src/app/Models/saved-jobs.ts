import { Injectable } from '@angular/core';
import { DocumentData, QuerySnapshot } from 'firebase/firestore';
@Injectable({
  providedIn: 'root',
})
export class SavedJobs {
  convertToArray(snapshot: QuerySnapshot<DocumentData>) {
    const jobs: any[] = [];
    snapshot.docs.forEach((job: any) => {
      jobs.push({
        user_id: job.data().user_id,
        job_id: job.data().job_id,
      });
    });
    console.log(jobs);
    return jobs;
  }
}
