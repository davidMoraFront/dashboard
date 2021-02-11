import { ToastService } from './../../../../shared/services/toast.service';
import { UsersService } from './../../services/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/shared/interfaces/user';
import { LoadingService } from 'src/app/core/services/loading.service';
import { UsersListService } from '../../services/users-list.service';

@Component({
  selector: 'app-users-details',
  templateUrl: './users-details.component.html',
  styleUrls: ['./users-details.component.scss']
})
export class UsersDetailsComponent implements OnInit {
  public path: Array<string>;
  title = 'User details';
  userForm: FormGroup;
  userId: number;

  constructor(private router: Router, 
    private fb: FormBuilder, 
    private activatedRoute: ActivatedRoute,
    private userService: UsersService,
    public loadingService: LoadingService,
    public usersListService: UsersListService,
    private toastService: ToastService) {
      this.userForm = this.fb.group({})
    }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.path = this.router.url.split('/').slice(1);
      if (params.userId !== undefined) {
        this.userId = params.userId;
        setTimeout(() => {
          this.userService.getUser(this.userId).subscribe(user => {
            this.path.splice(1, 1 , user.name);
            this.fillForm(user);
          });
        });
      }
    });
    
    this.userForm = this.fb.group({
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

  fillForm(user: User) {
    this.userForm.reset({
      name: user.name, 
      username: user.username,
      email: user.email,
      phone: user.phone,
      address: {
        street: user.address.street,
        suite: user.address.suite,
        city: user.address.city,
        zipcode: user.address.zipcode,
        geo: {
          lat: user.address.geo.lat,
          lng: user.address.geo.lng,
        }
      },
      company: {
        companyName: user.company.companyName,
        catchPhrase: user.company.catchPhrase,
        basicService: user.company.basicService,
        website: user.company.website
      }
    })
  }

  onSubmit() {
    if (this.userId === undefined) {
      this.userService.addUser(this.userForm.value).subscribe();
    } else {
      this.userService.updateUser(this.userId, this.userForm.value).subscribe(res => res);
    }
    this.router.navigate(['/users']);
    this.toastService.showSuccess('I am a standard toast');
  }

}
