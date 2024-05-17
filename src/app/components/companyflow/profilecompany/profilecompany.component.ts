import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../../services/company/company.service';

@Component({
  selector: 'app-profilecompany',
  templateUrl: './profilecompany.component.html',
  styleUrl: './profilecompany.component.css'
})
export class ProfilecompanyComponent implements OnInit{
  userFrame:string='./../../assets/images/user2.png'
  companyData:any;
  constructor(public companyService:CompanyService){}
  async ngOnInit(): Promise<void> {
    this.companyData=await this.companyService.getCompanyInfo()
    console.log(this.companyData)
  }
}
