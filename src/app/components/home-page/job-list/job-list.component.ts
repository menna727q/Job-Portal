import { Component, OnInit } from '@angular/core';
import { Ijob } from '../../../Models/ijob';
import { JobService } from '../../../services/user/job.service';
import { DocumentData, QuerySnapshot } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import { ToastrService } from 'ngx-toastr';
import { HotToastService } from '@ngneat/hot-toast';


@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css'],
})
export class JobListComponent implements OnInit {
  //on init we will fetch all jobs
  joblist: any = [];
  // jobService: any;
  logo: string = './../../assets/images/Rectangle 57.png';
  constructor(public jobService: JobService,
    private toast: HotToastService
    
  ) {}

  ngOnInit(): void {
    this.getAllJobs();
    // this.jobService.obsr_UpdatedSnapshot.subscribe((snapshot) => {
    //   this.updateJobsCollection(snapshot);
    // });
    
  }
  async getAllJobs() {
    await this.jobService.getAllJobs();
    this.jobService.homeList$.subscribe(updatedList => {
      this.joblist = updatedList;
      // console.log(updatedList)
      // Optionally perform any additional processing here
    });
    // this.updateJobsCollection(snapshot);
  }
  // bookmarkIcon = 'pi pi-bookmark';
  // bookmarkfilledIcon = 'pi pi-bookmark-filled';
  
  showSaved: boolean = true;

  toggleIconVisibility() {
    this.showSaved = !this.showSaved;
    // console.log(this.showSaved)
  }
  
  async saveJob(jobId:any){
    console.log(jobId);
   const jobSaved= await this.jobService.saveJobs(jobId);
    // this.toast.error('Job saved successfully');
    if(jobSaved){
      
      alert("Job saved successfully");
      // this.toggleIconVisibility();
    }
  }
  
  
}