import { Component,OnInit,ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JobService } from '../../../services/company/job.service';

@Component({
  selector: 'app-posts-details',
  templateUrl: './posts-details.component.html',
  styleUrl: './posts-details.component.css'
})
export class PostsDetailsComponent implements OnInit{
  isDropdownOpen: boolean = false;
  jobId: any;
  jobDetail: any;

  constructor(public router:ActivatedRoute , public jobService:JobService){}

  toggleDropdown(event: Event) {
    // Prevent default behavior of the event to avoid navigation
    event.preventDefault();

    // Toggle the dropdown state
    this.isDropdownOpen = !this.isDropdownOpen;
  }
  

  isDeleteModalOpen: boolean = false;
  openModal() {
    this.isDeleteModalOpen = true;
  }

  closeModal() {
    this.isDeleteModalOpen = false;
  }

  async ngOnInit() {
    this.jobId = this.router.snapshot.paramMap.get('id');
    this.jobDetail = await this.jobService.getJobDetail(this.jobId);
    // console.log(this.jobDetail);
  }
  
}
