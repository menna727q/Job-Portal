import { Component,Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ModalService } from '../../../modal.service';

@Component({
  selector: 'app-applicant-modal',
  templateUrl: './applicant-modal.component.html',
  styleUrl: './applicant-modal.component.css'
})
export class ApplicantModalComponent implements OnInit {
  picture:string='./../../assets/images/Rectangle.png'
  @Input() applicant: any;
  modalState!: boolean;
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();

  ngOnInit(): void {
      
  }
  onCloseModal() {
    this.closeModal.emit();
  }
}
