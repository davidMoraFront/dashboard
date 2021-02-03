import { UsersService } from './../../services/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/shared/interfaces/user';

@Component({
  selector: 'app-users-details',
  templateUrl: './users-details.component.html',
  styleUrls: ['./users-details.component.scss']
})
export class UsersDetailsComponent implements OnInit {
  public path: Array<string>;
  title = 'User details';
  userForm: FormGroup;
  userId: string;

  

  constructor(private router: Router, 
    private fb: FormBuilder, 
    private route: ActivatedRoute,
    private userService: UsersService) {
      this.userForm = this.fb.group({}) 
    }

  ngOnInit(): void {
    this.path = this.router.url.split('/').slice(1);
    this.route.params.subscribe(params => {
      console.log(params);
      this.userId = params.userId;
      if (params.userId !== undefined) {
        this.getUserData(params.userId);
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

  getUserData(id: number) {
    this.userService.getUser(id).subscribe(user => {
      this.fillForm(user);
    });
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

  }

}
