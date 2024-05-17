import { Component, OnInit } from '@angular/core';
import { JobService } from '../../../services/user/job.service';
import { UserService } from '../../../services/user/user.service';
@Component({
  selector: 'app-applied-jobs',
  templateUrl: './applied-jobs.component.html',
  styleUrl: './applied-jobs.component.css',
})
export class AppliedJobsComponent implements OnInit {
  logo: string = './../../assets/images/Rectangle 57.png';
  appliedJobsList:any=[];
  ngOnInit(): void {
    this.getAppliedJobs();
  }
  constructor(public userService: UserService) {}
  async getAppliedJobs() {
    await this.userService.getAppliedJobs();
    this.userService.appliedJobs$.subscribe((appliedJob)=>{
      this.appliedJobsList=appliedJob;
      console.log(appliedJob);
    })
  }
}
