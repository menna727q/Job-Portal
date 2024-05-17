import { Component } from '@angular/core';
import { JobService } from '../../../services/company/job.service';
interface JobType {
  jobtype: string;
}
@Component({
  selector: 'app-newpost',
  templateUrl: './newpost.component.html',
  styleUrl: './newpost.component.css',
})

export class NewpostComponent {
  jobType: JobType[] = [{ jobtype: 'Full time' }, { jobtype: 'Part time' }];
  formData={
    jobName:'',
    salary: '',
    jobType: '',
    location: '',
    qualification: '',
    job_description:''
  }
  constructor(public jobService:JobService){}
  async submitJobPost() {
    console.log(this.formData)
    await this.jobService.postJob(this.formData);
  }
}
