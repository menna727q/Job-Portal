import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user/user.service';

@Component({
  selector: 'app-saved-jobs',
  templateUrl: './saved-jobs.component.html',
  styleUrl: './saved-jobs.component.css'
})
export class SavedJobsComponent implements OnInit{
  logo: string = './../../assets/images/Rectangle 57.png';
  savedJobsList:any=[];
ngOnInit(): void {
    this.getSavedJobs();
}
constructor(public userService: UserService) {}

async getSavedJobs() {
  await this.userService.getSavedJobs();
  this.userService.savedJobs$.subscribe((savedjob)=>{
    this.savedJobsList=savedjob;
    // console.log(savedjob);
  })
}
async unSaveJob(jobID:any){
  await this.userService.unSaveJob(jobID);
}
}
