import { Component, OnInit } from '@angular/core';
import { JobService } from '../../../services/company/job.service';
import { ActivatedRoute, Route } from '@angular/router';
interface JobType {
  jobtype: string;
}
@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrl: './edit-post.component.css',
})
export class EditPostComponent implements OnInit {
  jobId: any;
  jobDetail:any;
  formData={
    jobName:'',
    jobType:'',
    location:'',
    salary:'',
    description:'',
    qualification:''
  }
  jobType: JobType[] = [{ jobtype: 'Full time' }, { jobtype: 'Part time' }];
  constructor(public jobService: JobService, public router: ActivatedRoute) {}
  async ngOnInit() {
    this.jobId = this.router.snapshot.paramMap.get('id');
    this.jobDetail = await this.jobService.getJobDetail(this.jobId);
    // console.log(this.jobDetail);
      // this.userData = this.userService.getUserInfo();
    // // Initialize formData with userData
    console.log(this.jobDetail)
    this.formData = { ...this.jobDetail };
  }
  async updatePost() {
    console.log(this.formData)
    console.log(this.jobType)
    await this.jobService.updatePost(this.jobId , this.formData);
  }
}
