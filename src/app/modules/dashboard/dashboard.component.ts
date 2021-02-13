import { BreadcrumbService } from './../../shared/services/breadcrumb.service';
import { LoadingService } from './../../core/services/loading.service';
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

  constructor(private router: Router, private breadcrumbService:BreadcrumbService) {
  }

  ngOnInit(): void {
      this.path = this.router.url.split('/').slice(1);
      this.breadcrumbService.set(this.path);
  }

}
