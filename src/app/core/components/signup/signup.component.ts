import { ToastService } from './../../../shared/services/toast.service';
import { UserService } from 'src/app/core/services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Config } from '../../config/config';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  logo: string;
  save: string;
  error: string = '';

  constructor(private router: Router,
    private fb: FormBuilder,
    private userService: UserService,
    private authenticationService:AuthenticationService,
    private toastService:ToastService) { }

  ngOnInit(): void {
    this.save = "Usuario registrado corretamente";
    this.logo = Config.logo;
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      repeatPassword: ['', Validators.required]
    });
  }

  onSubmit() {
    this.authenticationService.register(this.signupForm.value).subscribe(res => {
      this.userService.addUser(res).subscribe(() => {
        this.router.navigate(['/employees']);
        this.toastService.showSuccess(this.save);
      });
    });
  }

  login(): void{
    this.router.navigate(['/login']);
  } 
}
