import { Injectable } from '@angular/core';
import { JobService } from './job.service';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from '@angular/fire/firestore';
import { app } from '../../environment/environment';
import { Job } from '../../Models/job';
import { Company } from '../../Models/company';
import { doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL} from 'firebase/storage';
import {Storage} from'@angular/fire/storage'
import { from , switchMap } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  db = getFirestore(app);
  // user_id: number;

  jobs: any;

  public jobPostedSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>(
    []
  );
  public jobPostedList$: Observable<any[]> =
    this.jobPostedSubject.asObservable();

  constructor(
    public jobService: JobService,
    public jobObject: Job,
    public companyObject: Company,
    private storage:Storage
  ) {}
  // fetch job posts
  async getPostedJobs() {
    const postedJobs: any = [];
    const company_id = localStorage.getItem('company_id');
    // first we will take the job ids from the application to know the job details
    this.jobs = await this.jobService.getJobs();
    for (let job of this.jobs) {
      // console.log(this.company.company_id , ' ' , job.company_id)
      if (company_id === job.company_id) {
        postedJobs.push(job);
      }
    }
    console.log(postedJobs);
    this.updatePostedJobs(postedJobs);
  }
  updatePostedJobs(newList: any[]) {
    this.jobPostedSubject.next(newList);
  }

  /////////////////////////////////////////////////////////////////////////
  // fetch profile info
  ////////////////////////////////////////////////////////////////////////
  async getCompanyInfo() {
    const companyRef = collection(this.db, 'Company');
    const company_id = localStorage.getItem('company_id');
    // Create a query against the collection.
    const q = query(companyRef, where('company_id', '==', company_id));
    const querySnapshot = await getDocs(q);
    const compcanyDetail = this.companyObject.convertToArray(querySnapshot)[0];
    // querySnapshot.forEach((doc) => {
    //   // doc.data() is never undefined for query doc snapshots
    //   console.log(doc.id, ' => ', doc.data());
    // });
    console.log(compcanyDetail);
    return compcanyDetail;
    // console.log(this.user);
  }

  /////////////////////////////////////////////////////////////////////////////////////
  // Edit profile info
  ////////////////////////////////////////////////////////////////////////////////////
  async editUserProfile(companyData: any) {
    const company_id = localStorage.getItem('company_id') || '';
    const companyRef = doc(this.db, 'Company', company_id);

    // Set the "capital" field of the city 'DC'

    await updateDoc(companyRef, {
      Email: companyData.email,
      Password: companyData.password,
      Name: companyData.name,
      Address: {
        City: companyData.address.city,
        area: companyData.address.area,
      },
      Industry: companyData.industry,
      Website: companyData.website,
      // First_Name: userData.First_Name,
      // Last_Name: userData.lastName,
      // Gender: userData.gender,
      Phone_Number: companyData.phoneNumber,
      Profile_Picture: companyData.profilePicture || '',
      Overview: companyData.overview
    });
    // You can also update a single field with: await cityRef.UpdateAsync("Capital", false);
  }
  uploadImage(image: File, path: string): Observable<string> {
    const storageRef = ref(this.storage, path); // Concatenate the path directly with the storage reference
    const uploadTask = from(uploadBytes(storageRef, image));
    return uploadTask.pipe(switchMap((result) => getDownloadURL(result.ref)));
    
  }
}
