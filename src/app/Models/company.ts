import { DocumentData, QuerySnapshot } from 'firebase/firestore';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Company {
  convertToArray(snapshot: QuerySnapshot<DocumentData>) {
    const company: any[] = [];
    snapshot.docs.forEach((cmp: any) => {
      company.push({
        address: {
          city: cmp.data().Address.City,
          area: cmp.data().Address.area,
        },
        phoneNumber:cmp.data().Phone_Number,
        description: cmp.data().Description,
        email: cmp.data().Email,
        password:cmp.data().Password,
        industry: cmp.data().Industry,
        logo: cmp.data().Logo,
        name: cmp.data().Name,
        website: cmp.data().Website,
        company_id:cmp.data().company_id,
        overview: cmp.data().Overview,
        profilePicture:cmp.data().Profile_Picture
      });
    });
    return company;
  }
}
