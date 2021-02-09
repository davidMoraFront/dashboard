import { User } from 'src/app/shared/interfaces/user';
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @Input() bodyText: string;
  @Input() user: User;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

  save() {
    this.activeModal.close([this.bodyText, this.user]);
  }
  

}
