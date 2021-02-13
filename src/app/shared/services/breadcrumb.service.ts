import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {
  path: Array<string>;

  constructor() { }

  set(items: Array<string>) {
    this.path = items;
  }
}
