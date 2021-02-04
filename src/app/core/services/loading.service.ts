import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  public isLoading = new BehaviorSubject(false);
  public loadingStatus: boolean;

  constructor() { 
    this.isLoading.subscribe((status: boolean) => this.loadingStatus = status);
  }
}
