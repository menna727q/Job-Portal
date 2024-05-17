import { Component,Output,EventEmitter, OnInit } from '@angular/core';
import { JobService } from '../../../services/company/job.service';
import { Router , ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-delete-confirmation-modal',
  templateUrl: './delete-confirmation-modal.component.html',
  styleUrl: './delete-confirmation-modal.component.css'
})
export class DeleteConfirmationModalComponent implements OnInit{
  // @Output() confirmDelete: EventEmitter<void> = new EventEmitter<void>();

  // // No need for isDeleteModalOpen or toggleDeleteModal in this component

  // onConfirmDelete() {
  //   this.confirmDelete.emit();
  // }
  // modalState!: boolean;
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();
  constructor(public jobService:JobService , public router:Router , public route:ActivatedRoute){}
  onCloseModal() {
    this.closeModal.emit();
  }
  jobId:any;
  jobDetail: any;
  async ngOnInit() {
    this.jobId = this.route.snapshot.paramMap.get('id');
    this.jobDetail = await this.jobService.getJobDetail(this.jobId);
    console.log(this.jobDetail);
  }
  async deleteJobPost(event:any){
    await this.jobService.deletePostedJobs(this.jobId)
    this.router.navigate(['/posts']);
  }
}
