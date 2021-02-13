import { BreadcrumbService } from './../../services/breadcrumb.service';
import { Component, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/core/services/loading.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  collapedSideBar: boolean;
  hideSideBar: boolean;
  
  constructor(public loadingService: LoadingService, 
    public toastService: ToastService, 
    public breadcrumbService: BreadcrumbService) {}

  ngOnInit(): void {
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
