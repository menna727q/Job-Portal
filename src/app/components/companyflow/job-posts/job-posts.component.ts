import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../../services/company/company.service';

@Component({
  selector: 'app-job-posts',
  templateUrl: './job-posts.component.html',
  styleUrl: './job-posts.component.css',
})
export class JobPostsComponent implements OnInit {
  postedJobs: any;
  constructor(public companyService: CompanyService) {}
  ngOnInit(): void {
    this.getPostedJobs();
  }
  async getPostedJobs() {
    await this.companyService.getPostedJobs();
    this.companyService.jobPostedList$.subscribe(
      (updatedList) => (this.postedJobs = updatedList)
    );
    console.log(this.postedJobs);
  }
  
}
