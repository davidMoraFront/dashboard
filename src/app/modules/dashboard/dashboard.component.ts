import { BreadcrumbService } from './../../shared/services/breadcrumb.service';
import { LoadingService } from './../../core/services/loading.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/core/services/user.service';
import { User } from 'src/app/core/models/user';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public path: Array<string>;
  users: User[];

  constructor(private router: Router, 
    private breadcrumbService:BreadcrumbService, 
    private userService: UserService,
    private loadingService: LoadingService) {
  }

  ngOnInit(): void {
    // this.loadingService.isLoading.next(true);
      this.path = this.router.url.split('/').slice(1);
      this.breadcrumbService.set(this.path);
      this.userService.getAll().pipe(first()).subscribe(users => {
        // this.loadingService.isLoading.next(false);
        this.users = users;
    });
  }

}
