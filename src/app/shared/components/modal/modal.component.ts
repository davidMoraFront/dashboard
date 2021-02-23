import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Employee } from '../../interfaces/employee';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @Input() data: unknown;
  @Input() modalTitle: string;
  @Input() modalBody: string;
  @Input() employeeName: Employee;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {console.log(this.employeeName);
  }  

}
