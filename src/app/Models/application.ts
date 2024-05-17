import { DocumentData, QuerySnapshot } from 'firebase/firestore';
import { Iapplication } from './iapplication';
import { Injectable } from '@angular/core';

// User_Email
// User_Phone_Num
// User_Resume
// Job_Ref
// User_Ref
@Injectable({
  providedIn: 'root',
})

export class Application  {
  // userEmail!: string;
  // userPhoneNumber!: string;
  // userResume!: string;
  // JobReference!: string;
  // UserRefrence!: string;
  // constructor(
  //   userEmail: string,
  //   userPhoneNumber: string,
  //   userResume: string,
  //   JobReference: string,
  //   UserRefrence: string
  // ) {
  //   this.userEmail = userEmail;
  //   this.JobReference = JobReference;
  //   this.UserRefrence = UserRefrence;
  //   this.userResume = userResume;
  //   this.userPhoneNumber = userPhoneNumber;
  // }
  convertToArray(snapshot: QuerySnapshot<DocumentData>) {
    const applications : any = [];
    snapshot.docs.forEach((app: any) => {
      //  console.log(app.data())
        applications.push({
          userEmail:app.data().Application.User_Email,
          userPhoneNumber:app.data().Application.User_Phone_Num,
          userResume:app.data().Application.User_Resume,
          user_id:app.data().user_id,
          job_id:app.data().job_id,
          company_id:app.data().company_id
          // JobReference:app.data().Job_Ref,
          // UserRefrence:app.data().User_Ref
        });
    });
    return applications;
  }
}
