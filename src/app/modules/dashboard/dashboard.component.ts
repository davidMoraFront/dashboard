import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public path: Array<string>;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
      this.path = this.router.url.split('/').slice(1);
  }

}
