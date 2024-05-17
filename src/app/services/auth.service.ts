import { inject, Injectable, NgZone } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

import { Router } from '@angular/router';
import { ref, uploadBytes,  } from 'firebase/storage';
import { of, concatMap } from 'rxjs';
import { Observable } from 'rxjs';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { iuser } from '../Models/iuser';
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
  doc,
  updateDoc,
  DocumentData,
  CollectionReference,
  onSnapshot,
  QuerySnapshot,
  where,
  setDoc,
} from '@angular/fire/firestore';
import { app } from '../environment/environment';
import { Company } from '../Models/company';
import { combineAll } from 'rxjs';
import { User } from '../Models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  db = getFirestore(app);
  isCompany=false;
  isLoggedIn = false;
  users: any[] = [];

  constructor(private firestore: Firestore, private router: Router , public company:Company  , public user:User,private afAuth: AngularFireAuth) {
  }
  // async getAllUsers() {
  //   const db = collection(this.firestore, 'Users');
  //   const snapshot = await getDocs(db);
  //   return this.user.convertToArray(snapshot);
  // }
  // async getAllCompany() {
  //   const db = collection(this.firestore, 'Company');
  //   const snapshot = await getDocs(db);
  //   // console.log(snapshot);
  //   const company = this.company.convertToArray(snapshot);
  //   return company;
  // }
  // async getAllUsers() {
  //   const db = collection(this.firestore, 'Users');
  //   const snapshot = await getDocs(db);
  //   return this.user.convertToArray(snapshot);
  // }
  // async getAllCompany() {
  //   const db = collection(this.firestore, 'Company');
  //   const snapshot = await getDocs(db);
  //   // console.log(snapshot);
  //   const company = this.company.convertToArray(snapshot);
  //   return company;
  // }

  async login(isCompany: boolean, email: string, password: string) {
    // console.log(doc(this.db, 'Users','K73Msphfsl79G1KlpVj0'));
    console.log(isCompany , ' ' , email ,' ' , password);
    if (isCompany) {
      console.log("d5lt");
      this.isCompany=true;
      this.companyLogin(email, password);
    } else {
      this.userLogin(email, password);
    }
  }
  async userLogin(email: string, password: string) {
    const userRef = collection(this.db, 'Users');
    // Create a query against the collection.
    const q = query(userRef, where('Email', '==', email),where('Password' ,'==' , password));
    const querySnapshot = await getDocs(q);
    const userDetail = this.user.convertToArray(querySnapshot)[0];
    // querySnapshot.forEach((doc) => {
    //   // doc.data() is never undefined for query doc snapshots
    //   console.log(doc.id, ' => ', doc.data());
    // });
    console.log(userDetail);
    // const userData = await this.getAllUsers();
    // console.log(userData);
    // let result = userData.find(
    //   (user) => user.email === email && user.password === password
    // );
    // console.log(result)
    if (userDetail != undefined) {
      this.isLoggedIn = true;
      localStorage.setItem('token', 'true');
      localStorage.setItem('user_id', userDetail.user_id);
      localStorage.setItem('name', userDetail.firstName + ' ' + userDetail  .lastName);
      localStorage.setItem('jobTitle', userDetail.jobTitle);
      localStorage.setItem('phone', userDetail.phoneNumber);
      localStorage.setItem('overview', userDetail.overview);
      localStorage.setItem('email', userDetail.email);
      localStorage.setItem('resume', userDetail.resume);
      localStorage.setItem('logged', 'true');
      this.router.navigate(['/homepage']);
    } else {
      alert('invalid email or password');
      this.router.navigate(['/user/signin']);
    }
  }
  async companyLogin(email: string, password: string) {
    const companyRef = collection(this.db, 'Company');
    // Create a query against the collection.
    const q = query(companyRef, where('Email', '==', email),where('Password' ,'==' , password));
    const querySnapshot = await getDocs(q);
    const companyDetail = this.company.convertToArray(querySnapshot)[0];
    
    // console.log(companyDetail);
    
    // const companyData = await this.getAllCompany();
    // console.log(companyData);
    // let result = companyData.find(
    //   (company) => company.email === email && company.password === password
    // );
    // console.log(result.address  , ' ' , result.address.city , ' ' , result.address.city+" " +result.address.area)
    // console.log(result)
    if (companyDetail != undefined) {
      this.isLoggedIn = true;
      localStorage.setItem('token', 'true');
      localStorage.setItem('company', 'true');
      localStorage.setItem('logged', 'true');
      
      localStorage.setItem('company_id', companyDetail.company_id);
      localStorage.setItem('name', companyDetail.name);
      localStorage.setItem('email', companyDetail.email);
      localStorage.setItem('address', companyDetail.address.city + ' '+companyDetail.address.area);
      localStorage.setItem('description', companyDetail.description);
      localStorage.setItem('industry', companyDetail.industry);
      localStorage.setItem('logo', companyDetail.logo);
      localStorage.setItem('website', companyDetail.website);

      this.router.navigate(['/posts']);
    } else {
      alert('invalid email or password');
      this.router.navigate(['/company/signin']);
    }
  }

  async signUp(user: iuser) {
    const uid = uuidv4();
    // console.log(uid);
    // console.log(user);
    await setDoc(doc(this.db, 'Users', uid), {
      user_id: uid,
      Email: user.emailsignup,
      Password: user.password_signup,
      First_Name: user.firstName,
      Last_Name: user.lastName,
      Gender: user.gender || '',
      Phone_Number: user.phoneNumber,
      Education: user.education || ' ',
      Job_Title: user.jobTitle || '',
      Resume:user.resume || '',
      Overview: user.overview || '',
      
    }).then(() =>
      // this.router.navigate(['/user/signin'], { queryParams: { signup: 'true' } })
      //   .catch((err) => console.log(err))
      console.log("message")
    );
    // console.log(response);
  }

  async companySignUp(company:any){
    const uid = uuidv4();
    console.log(uid);
    console.log(company);
    await setDoc(doc(this.db, 'Company', uid), {
      company_id: uid,
      Address:{
        City:company.city,
        area:company.area
      },
      Email: company.emailsignup,
      Password: company.password_signup,
      Name: company.name,
      Phone_Number: company.phoneNumber,
      Description:company.description||'',
      Industry:company.industry||'',
      Logo:company.logo||'',
      Website:company.website
    }).then(() =>
      this.router
        .navigate(['/company/signin'], { queryParams: { signup: 'true' } })
        .catch((err) => console.log(err))
    );
  }
  
}
