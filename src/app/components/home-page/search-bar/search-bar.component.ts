import { Component, OnInit } from '@angular/core';
import { FormControl , FormGroup, Validators } from '@angular/forms';
import { JobService } from '../../../services/user/job.service';
import { BehaviorSubject, Observable, combineLatest, map } from 'rxjs';
interface Country{
  name:string
}
interface JobType{
  jobtype:string
}
@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css',
})

export class SearchBarComponent {
  countries:Country[] = [
    {name:"Egy"}
   ,{name: "italy"}
    ,{name: "oman"}
  ]; 
  jobType:JobType[]=[{jobtype:"Full time"} , {jobtype:"Part time"} ]; 
  // jobService: any;
  data$ = new Observable<string[]>();
  searchQuery$ = new BehaviorSubject<string>('');

  searchForm = new FormGroup({
    jobType : new FormControl(),
    minSalary: new FormControl('',[Validators.pattern('^[0-9]*$')]),
    jobName: new FormControl(''),
    location: new FormControl(),
  })
  list: any[] | undefined;
  constructor(public jobService:JobService){}
 
  ngOnInit(): void {
   
  }
  // onSearchUpdated(searchQuery: string) {
  //   this.searchQuery$.next(searchQuery);
  // }
  onclick(){
    const JobName = this.searchForm.controls.jobName.value;
    const jobType = this.searchForm.controls.jobType.value.jobtype;
    const minSalary = parseInt(this.searchForm.controls.minSalary.value!);
    const location = this.searchForm.controls.location.value.name;
    // console.log(jobName , jobType, minSalary , location)
    let jobName = JobName || ''
    this.jobService.searchJobs(jobName , jobType , minSalary , location);
    // console.log(this.searchForm.controls.jobName.value)
    // console.log(filter.value);
  }
}
