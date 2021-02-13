import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  isMenuCollapsed: boolean;
  menuCollapsedIcons: boolean;
  // active = 3;
  active;
  menuHide: boolean;
  showMenu: string;

  @Output() collapsedEvent = new EventEmitter<boolean>();
  @Output() toggleEvent = new EventEmitter<boolean>();

  constructor() {}

  ngOnInit(): void {
    setTimeout(() => {
      if (window.innerWidth < 992) {
        this.isMenuCollapsed = true;
        this.menuHide = !this.menuHide;
        console.log(this.menuHide);
      } else {
        this.isMenuCollapsed = false;
      }
    }, 0);
    this.showMenu = '';
  }

  toggleCollapsed() {
    this.menuCollapsedIcons = !this.menuCollapsedIcons;
    this.collapsedEvent.emit(this.menuCollapsedIcons);
  }

  toggleShow() {
    this.menuHide = !this.menuHide;
    this.toggleEvent.emit(this.menuHide);
  }

  addExpandClass(element: any) {
    if (element === this.showMenu) {
        this.showMenu = '0';
    } else {
        this.showMenu = element;
    }
}

}