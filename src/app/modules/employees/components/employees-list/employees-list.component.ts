import { BreadcrumbService } from '../../../../shared/services/breadcrumb.service';
import { Observable } from 'rxjs';
import { EmployeesService } from '../../services/employees.service';
import { Router } from '@angular/router';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { NgbdSortableHeader, SortEvent } from 'src/app/shared/directives/sortable.directive';
import { Employee } from 'src/app/shared/interfaces/employee';
import { EmployeesListService } from '../../services/employees-list.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.scss'],
  providers: [EmployeesService]
})
export class EmployeesListComponent implements OnInit {
  public path: Array<string>;
  employees$: Observable<Employee[]>;
  total$: Observable<number>;
  title: string = 'Employees list';
  
  employeeDeleteText: string = '';
  modalTitle: string = 'Employee delete';
  modalBody: string = 'Are you sure you want to delete the employee';
  employeeName: Employee;

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  constructor(private router: Router, 
    public EmployeesListService: EmployeesListService, 
    public EmployeesService: EmployeesService,
    private modalService: NgbModal,
    private breadcrumbService:BreadcrumbService) {
    this.employees$ = EmployeesListService.employees$;
    this.total$ = EmployeesListService.total$;
   }

  ngOnInit(): void {
    this.path = this.router.url.split('/').slice(1);
    this.breadcrumbService.set(this.path);
    setTimeout(() => {
      this.EmployeesService.getEmployees().subscribe((res: Employee[]) => this.EmployeesListService.load(res));
    });
  }

  onSort({column, direction}: SortEvent) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });
    this.EmployeesListService.sortColumn = column;
    this.EmployeesListService.sortDirection = direction;
  }

  openModal(employee: Employee) {
    const modalRef = this.modalService.open(ModalComponent, { centered: true });
    modalRef.componentInstance.modalTitle = this.modalTitle;
    modalRef.componentInstance.modalBody = this.modalBody;
    modalRef.componentInstance.employeeName = employee.name;
    modalRef.result.then(res => {
      if (res) {
        this.EmployeesService.deleteEmployee(employee.id).subscribe();
        this.EmployeesService.getEmployees().subscribe((res: Employee[]) => this.EmployeesListService.load(res));
      }
    })
  }

}
