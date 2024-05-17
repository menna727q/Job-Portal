import { Injectable } from '@angular/core';
import { doc, getFirestore, setDoc } from 'firebase/firestore';
import { app } from '../../environment/environment';
import { v4 as uuidv4 } from 'uuid';
import { Route, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ApplicationService {
  db = getFirestore(app);

  constructor(public router: Router) {}
  // you also need the job and user ids 
  async sendApplication(jobID :any,email: string, phoneNumber: string, cv: any = '') {
    const uid = uuidv4();
    await setDoc(doc(this.db, 'Applications', uid), {
      application_id: uid,
      Application: {
        User_Email: email,
        User_Phone_Num: phoneNumber,
        User_Resume: cv,
      },
      user_id:localStorage.getItem('user_id'),
      job_id:jobID
      // profilePicture:any,
      // resume:any
    }).then((response) => console.log(response))
      .catch((err) => console.log(err));
  }
}
