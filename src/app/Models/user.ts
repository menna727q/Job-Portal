import { DocumentData, QuerySnapshot } from 'firebase/firestore';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class User {
  convertToArray(snapshot: QuerySnapshot<DocumentData>) {
    const users: any[] = [];
    // console.log(snapshot);
    snapshot.docs.forEach((user: any) => {
        // console.log(user.payload.doc.id)
          users.push({
          email: user.data().Email,
          password: user.data().Password,
          firstName: user.data().First_Name,
          lastName: user.data().Last_Name,
          gender: user.data().Gender,
          emailsignup: user.data().Email,
          phoneNumber: user.data().Phone_Number,
          password_signup: user.data().Password,
          education: user.data().Education,
          jobTitle: user.data().Job_Title,
          overview: user.data().Overview,
          profilePicture: user.data().Profile_Picture,
          resume: user.data().Resume,
          user_id: user.data().user_id,
        });
      });
      return users;
  }
}
