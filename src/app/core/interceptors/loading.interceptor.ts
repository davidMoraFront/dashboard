import { delay } from 'rxjs/operators';
import { LoadingService } from './../services/loading.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  private requests: HttpRequest<unknown>[] = [];

  constructor(private loadingService: LoadingService) {}

  public removeRequest(req: HttpRequest<unknown>) {
    const index = this.requests.indexOf(req);

    // comment to show spinner
    if (index >= 0) {
      this.requests.splice(index, 1);
    }
    this.loadingService.isLoading.next(this.requests.length > 0);
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // console.log(this.requests);
    
    // console.log('detect request', request.url);

    this.requests.push(request);
    this.loadingService.isLoading.next(true);
    
    // return next.handle(request);
    return new Observable(observer => {
      const subscription = next.handle(request).subscribe(event => {
        if (event instanceof HttpResponse) {
          this.removeRequest(request);
          observer.next(event);
          // console.log('remove requests', request.url);
        }
      }, error => {
        this.removeRequest(request);
      });
    });
  }
}
