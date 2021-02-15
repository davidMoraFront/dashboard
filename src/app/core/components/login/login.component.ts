import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Config } from '../../config/config';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  logo: string;

  constructor(private router: Router,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.logo = Config.logo;
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
  });
  }

  onSubmit() {
    this.router.navigate(['']);
  }

  signup(): void{
    this.router.navigate(['/signup']);
  } 

}
