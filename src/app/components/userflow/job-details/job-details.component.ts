import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { JobService } from '../../../services/user/job.service';
import { ApplicationService } from '../../../services/user/application.service';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.css'],
})
export class JobDetailsComponent implements OnInit {
  logo: string = './../../assets/images/Rectangle 57.png';
  // job: any;
  visible;
  sendCV;
  jobId: any;
  jobDetail: any;
  formData = {
    email: '',
    phoneNumber: '',
    cv: '',
  };

  constructor(
    public route: ActivatedRoute,
    public jobService: JobService,
    public applicationService: ApplicationService
  ) {
    this.visible = false;
    this.sendCV = false;
  }

  async ngOnInit() {
    this.jobId = this.route.snapshot.paramMap.get('id');
    this.jobDetail = await this.jobService.getJobDetail(this.jobId);
    // console.log(this.jobDetail);
  }
  showDialog() {
    this.visible = true;
    console.log('open');
  }
  onUpload(event: any) {
    const selectedFile = event.target.files[0];
    console.log(selectedFile);
  }
  async SendCV(event: any) {
    //hena mafrood nb3tha ll back law galle 200 yb2a 2wrelo anha done
    console.log(this.formData);
    this.visible = false;
    this.sendCV = true;
    await this.applicationService.sendApplication(this.jobId , this.formData.email, this.formData.phoneNumber,this.formData.cv);
  }
  // async submitApplication(){
  //   console.log(this.formData);
  // }
}
