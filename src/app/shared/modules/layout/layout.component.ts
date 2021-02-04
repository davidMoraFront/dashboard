import { Component, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/core/services/loading.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  collapedSideBar: boolean;
  
  constructor(public loadingService: LoadingService) { }

  ngOnInit(): void {
  }

  receiveCollapsed($event) {
    this.collapedSideBar = $event;
}

}
