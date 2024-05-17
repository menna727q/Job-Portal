import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../../modal.service';
import { ApplicationService } from '../../../services/company/application.service';

@Component({
  selector: 'app-applicantsnav',
  templateUrl: './applicantsnav.component.html',
  styleUrl: './applicantsnav.component.css'
})
export class ApplicantsnavComponent implements OnInit{
  picture:string='./../../assets/images/Rectangle.png'
  applicants: any;
  constructor(public applicationService:ApplicationService){}
  selectedApplicant: any;

  openModal(applicant: any) {
    this.selectedApplicant = applicant;
  }
  closeModal() {
    this.selectedApplicant = null;
  }
  ngOnInit(): void {
    this.applicationService.getAllApplicants();
    this.applicationService.allApplicantList$.subscribe(updatedList=>{
      this.applicants=updatedList;
    })
    console.log(this.applicants)
  }
  inputData= {
   name:''
  }
  async searchApplicants(){
    // console.log(this.inputData.name)
    await this.applicationService.searchApplicants(this.inputData.name);
  }

}
