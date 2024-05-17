import { NgModule, importProvidersFrom } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { GetstartComponent } from './components/getstart/getstart.component';
import { SigninComponent } from './components/userflow/signin/signin.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AccountComponent } from './components/account/account.component';
import { SignupComponent } from './components/userflow/signup/signup.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { NavBarComponent } from './components/home-page/nav-bar/nav-bar.component';
import { SearchBarComponent } from './components/home-page/search-bar/search-bar.component';
import { InputTextModule}from 'primeng/inputtext'
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { JobListComponent } from './components/home-page/job-list/job-list.component';
import { CardModule } from 'primeng/card';
import { JobDetailsComponent } from './components/userflow/job-details/job-details.component';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from './environment/environment';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideStorage, getStorage } from '@angular/fire/storage';
import {AngularFireStorageModule} from '@angular/fire/compat/storage'
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/compat/auth';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { ProfileComponent } from './components/userflow/profile/profile.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { EditComponent } from './components/userflow/edit/edit.component';
// import { NavbarComponent } from './components/profile/navbar/navbar.component';
import { AppliedJobsComponent } from './components/userflow/applied-jobs/applied-jobs.component';
import { NavbarComponent } from './components/userflow/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { SignincompanyComponent } from './components/companyflow/signincompany/signincompany.component';
import { SignupCompanyComponent } from './components/companyflow/signup-company/signup-company.component';
import { JobPostsComponent } from './components/companyflow/job-posts/job-posts.component';
import { NavbarCompanyComponent } from './components/companyflow/navbar-company/navbar-company.component';
import { PostsDetailsComponent } from './components/companyflow/posts-details/posts-details.component';
import { ApplicantsComponent } from './components/companyflow/applicants/applicants.component';
import { ApplicantModalComponent } from './components/companyflow/applicant-modal/applicant-modal.component';
import { NewpostComponent } from './components/companyflow/newpost/newpost.component';
import { ApplicantsnavComponent } from './components/companyflow/applicantsnav/applicantsnav.component';
import { ProfilecompanyComponent } from './components/companyflow/profilecompany/profilecompany.component';
import { FooterComponent } from './components/companyflow/footer/footer.component';
import { EditcompanyComponent } from './components/companyflow/editcompany/editcompany.component';
import { EditPostComponent } from './components/companyflow/edit-post/edit-post.component';
import { DeleteConfirmationModalComponent } from './components/companyflow/delete-confirmation-modal/delete-confirmation-modal.component';
import { SavedJobsComponent } from './components/userflow/saved-jobs/saved-jobs.component';
// import { CardModule } from 'primeng/card';
@NgModule({
  declarations: [
    AppComponent,
    GetstartComponent,
    SigninComponent,
    AccountComponent,
    SignupComponent,
    ProfileComponent,
    EditComponent,
    NavbarComponent,
    AppliedJobsComponent,
    HomePageComponent,
    NavBarComponent,
    SearchBarComponent,
    JobListComponent,
    JobDetailsComponent,
    SignincompanyComponent,
    SignupCompanyComponent,
    JobPostsComponent,
    NavbarCompanyComponent,
    PostsDetailsComponent,
    ApplicantsComponent,
    ApplicantModalComponent,
    NewpostComponent,
    ApplicantsnavComponent,
    ProfilecompanyComponent,
    FooterComponent,
    EditcompanyComponent,
    EditPostComponent,
    DeleteConfirmationModalComponent,
    SavedJobsComponent,
  ],
  providers: [
    provideClientHydration(),
    // importProvidersFrom(AngularFireAuth)
    { provide: FIREBASE_OPTIONS, useValue: environment.firebase }
  ],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    InputTextModule,
    DropdownModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    CardModule,
    DialogModule,
    BrowserAnimationsModule,
    FileUploadModule,
    ToastModule,
    HttpClientModule,
    FontAwesomeModule,
    provideFirebaseApp(()=>initializeApp(environment.firebase)),
    provideFirestore(()=>getFirestore()),
    provideStorage(()=>getStorage()),
    AngularFireModule,
    AngularFireAuthModule,
    MatFormFieldModule,
    AngularFireStorageModule,
MatSelectModule,
CardModule,
CommonModule
   
  ],
})
export class AppModule {}
