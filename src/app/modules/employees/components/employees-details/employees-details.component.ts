import { BreadcrumbService } from '../../../../shared/services/breadcrumb.service';
import { ToastService } from '../../../../shared/services/toast.service';
import { EmployeesService } from '../../services/employees.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Employee } from 'src/app/shared/interfaces/employee';
import { LoadingService } from 'src/app/core/services/loading.service';

@Component({
  selector: 'app-employees-details',
  templateUrl: './employees-details.component.html',
  styleUrls: ['./employees-details.component.scss']
})
export class EmployeesDetailsComponent implements OnInit {
  public path: Array<string>;
  title: string = 'Employee details';
  employeeForm: FormGroup;
  employeeId: number;
  create: string;
  update: string;

  constructor(private router: Router, 
    private fb: FormBuilder, 
    private activatedRoute: ActivatedRoute,
    private employeeService: EmployeesService,
    public loadingService: LoadingService,
    private toastService: ToastService,
    private breadcrumbService: BreadcrumbService) {
      this.employeeForm = this.fb.group({})
    }

  ngOnInit(): void {
    this.create = 'Employee create successfully';
    this.update = 'Employee update successfully';
    this.activatedRoute.params.subscribe(params => {
      this.path = this.router.url.split('/').slice(1);
      if (params.employeeId !== undefined) {
        this.employeeId = params.employeeId;
        setTimeout(() => {
          this.employeeService.getEmployee(this.employeeId).subscribe(employee => {
            this.fillForm(employee);
            this.path.splice(1, 1 , employee.name);
            this.breadcrumbService.set(this.path);
          });
        });
      }
    });
    
    this.employeeForm = this.fb.group({
      name: ['', Validators.required],
      username: [''],
      email: [''],
      address: this.fb.group({
        street: [''],
        suite: [''],
        city: [''],
        zipcode: [''],
        geo: this.fb.group({
          lat: [''],
          lng: [''],
        })
      }),
      phone: [''],
      company: this.fb.group({
        companyName: [''],
        catchPhrase: [''],
        basicService: [''],
        website: ['']
      })
    });
    
  }

  fillBreadcrumb(name: string) {
    this.path = this.router.url.split('/').slice(1);
    this.path.splice(1, 1 , name);
  }

  fillForm(employee: Employee) {
    this.employeeForm.reset({
      name: employee.name, 
      username: employee.username,
      email: employee.email,
      phone: employee.phone,
      address: {
        street: employee.address.street,
        suite: employee.address.suite,
        city: employee.address.city,
        zipcode: employee.address.zipcode,
        geo: {
          lat: employee.address.geo.lat,
          lng: employee.address.geo.lng,
        }
      },
      company: {
        companyName: employee.company.companyName,
        catchPhrase: employee.company.catchPhrase,
        basicService: employee.company.basicService,
        website: employee.company.website
      }
    })
  }

  onSubmit() {
    let action: string;
    if (this.employeeId === undefined) {
      this.employeeService.addEmployee(this.employeeForm.value).subscribe();
      action = this.create;
    } else {
      this.employeeService.updateEmployee(this.employeeId, this.employeeForm.value).subscribe(res => res);
      action = this.update;
    }
    this.router.navigate(['/employees']);
    this.toastService.showSuccess(action);
  }

}
