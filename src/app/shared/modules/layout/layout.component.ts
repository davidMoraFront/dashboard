import { BreadcrumbService } from './../../services/breadcrumb.service';
import { Component, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/core/services/loading.service';
import { ToastService } from '../../services/toast.service';
import { User } from 'src/app/core/models/user';
import { AuthenticationService } from 'src/app/core/services/authentication.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  collapedSideBar: boolean;
  hideSideBar: boolean;
  user: User;
  
  constructor(public loadingService: LoadingService, 
    public toastService: ToastService, 
    public breadcrumbService: BreadcrumbService,
    private authenticationService: AuthenticationService) {
      this.authenticationService.user.subscribe(x => this.user = x);
    }

  ngOnInit(): void {
    // this.loadingService.isLoading.next(false);
    setTimeout(() => {
      if (window.innerWidth < 992) {
        this.hideSideBar = true;
      } else {
        this.hideSideBar = false;
      }
    }, 0);
  }

  receiveCollapsed($event) {
    this.collapedSideBar = $event;
  }

  receiveToggle($event) {
    this.hideSideBar = $event;
  }

}
