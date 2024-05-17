import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JobService } from '../../../services/company/job.service';
import { ApplicationService } from '../../../services/company/application.service';
@Component({
  selector: 'app-applicants',
  templateUrl: './applicants.component.html',
  styleUrl: './applicants.component.css'
})
export class ApplicantsComponent {
  picture:string='./../../assets/images/Rectangle.png'
  // applicants = [
  //   {
  //     name: 'Emily Anderson',
  //     jobTitle: 'Product Designer',
  //     location: 'Cairo, Egypt',
  //     picture: 'path/to/picture1.jpg'
  //   },
  //   {
  //     name: 'John Smith',
  //     jobTitle: 'UI/UX Designer',
  //     location: 'New York, USA',
  //     picture: 'path/to/picture2.jpg'
  //   }
  // ];

  selectedApplicant: any;
  jobId: any;
  // jobDetail: any;

  constructor(public router:ActivatedRoute , public applicationService:ApplicationService,public jobService:JobService){}
  openModal(applicant: any) {
    this.selectedApplicant = applicant;
  }
  closeModal() {
    this.selectedApplicant = null;
  }
  applicants:any;
  jobDetail:any
  async ngOnInit() {
    this.jobId = this.router.snapshot.paramMap.get('id');
    this.jobDetail = await this.jobService.getJobDetail(this.jobId);
    // this.jobDetail = await this.jobService.getJobDetail(this.jobId);
    // console.log(this.jobId);
    await this.applicationService.getJobApplications(this.jobId);
    this.applicationService.applicantsList$.subscribe(updatedApplicants=>{
      this.applicants=updatedApplicants;
      console.log(this.applicants.location)
      console.log(this.applicants)
    })
  }
  
  
}
