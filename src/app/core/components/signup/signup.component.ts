import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Config } from '../../config/config';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  logo: string;

  constructor(private router: Router,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.logo = Config.logo;
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      repeatPassword: ['', Validators.required]
    });
  }

  onSubmit() {
    this.router.navigate(['']);
  }

  login(): void{
    this.router.navigate(['/signup']);
  } 
}
