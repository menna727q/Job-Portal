import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GetstartComponent } from './components/getstart/getstart.component';
import { SigninComponent } from './components/userflow/signin/signin.component';
import { AccountComponent } from './components/account/account.component';
import { SignupComponent } from './components/userflow/signup/signup.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { JobDetailsComponent } from './components/userflow/job-details/job-details.component';
import { AuthGuard } from './services/auth-guard.service';
import { EditComponent } from './components/userflow/edit/edit.component';
import { ProfileComponent } from './components/userflow/profile/profile.component';
import { AppliedJobsComponent } from './components/userflow/applied-jobs/applied-jobs.component';
import { SignincompanyComponent } from './components/companyflow/signincompany/signincompany.component';
import { SignupCompanyComponent } from './components/companyflow/signup-company/signup-company.component';
import { JobPostsComponent } from './components/companyflow/job-posts/job-posts.component';
import { PostsDetailsComponent } from './components/companyflow/posts-details/posts-details.component';
import { ApplicantsComponent } from './components/companyflow/applicants/applicants.component';
import { NewpostComponent } from './components/companyflow/newpost/newpost.component';
import { ApplicantsnavComponent } from './components/companyflow/applicantsnav/applicantsnav.component';
import { ProfilecompanyComponent } from './components/companyflow/profilecompany/profilecompany.component';
import { EditcompanyComponent } from './components/companyflow/editcompany/editcompany.component';
import { EditPostComponent } from './components/companyflow/edit-post/edit-post.component';
import { SavedJobsComponent } from './components/userflow/saved-jobs/saved-jobs.component';

const routes: Routes = [
  { path: '', component: GetstartComponent },
  { path: 'user/signin', component: SigninComponent },
  { path: 'account', component: AccountComponent },
  { path: 'signup', component: SignupComponent },
  // canActivate: [AuthGuard]
  { path: 'homepage', component: HomePageComponent },
  { path: 'job-detail/:id', component: JobDetailsComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'applied', component: AppliedJobsComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'edit', component: EditComponent },
  {path:'saved-jobs',component:SavedJobsComponent},
  //company Flow
  { path: 'company/signin', component: SignincompanyComponent },
  { path: 'company/signup', component: SignupCompanyComponent },
  { path: 'posts', component: JobPostsComponent },
  { path: 'posts-detail/:id', component: PostsDetailsComponent },
  { path: 'posts-detail/:id/applicants', component: ApplicantsComponent },
  { path: 'newpost', component: NewpostComponent },
  { path: 'navappli', component: ApplicantsnavComponent },
  { path: 'company/profile', component: ProfilecompanyComponent },
  { path: 'company/edit', component: EditcompanyComponent },
  { path: 'edit-post/:id', component: EditPostComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
