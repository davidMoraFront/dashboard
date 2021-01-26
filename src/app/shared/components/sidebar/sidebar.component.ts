import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  isMenuCollapsed: boolean;
  menuCollapsedIcons: boolean;
  active = 'top';

  @Output() collapsedEvent = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
    this.isMenuCollapsed = false;
    this.menuCollapsedIcons = false;
  }

  toggleCollapsed() {
    this.menuCollapsedIcons = !this.menuCollapsedIcons;
    this.collapsedEvent.emit(this.menuCollapsedIcons);
  }

}

/* 
NgbCollapseModule,
    NgbNavModule,
    TranslateModule */


    /* import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// import { SidebarRoutingModule } from './sidebar-routing.module';
import { SidebarComponent } from './sidebar.component';
import { NgbCollapseModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  // declarations: [SidebarComponent],
  imports: [
    CommonModule,
    // SidebarRoutingModule,
    NgbCollapseModule,
    NgbNavModule,
    TranslateModule
  ],
  // exports: [SidebarComponent]
})
export class SidebarModule { }
 */