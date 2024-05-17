import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent implements OnInit {
  imageSource : string = './../../assets/images/Frame 3.png'
  user :string='./../../assets/images/Group.png'
  company :string='./../../assets/images/company.png'
  frameOf :string='./../../assets/images/Ribbon-3.png'
  ngOnInit(): void {
      
  }
}
