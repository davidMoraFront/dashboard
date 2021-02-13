import { BreadcrumbService } from './../../services/breadcrumb.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {

  constructor(public breadcrumbService:BreadcrumbService) { }

  ngOnInit(): void {
  }

}
