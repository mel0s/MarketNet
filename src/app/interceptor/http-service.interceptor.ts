import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpServiceInterceptor implements HttpInterceptor {

  constructor() { }

  //   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

  //     const modifiedReq = req.clone({ 
  //       headers: req.headers.set("Content-Type", "application/json"),
  //     });
  //     return next.handle(modifiedReq);
  //   }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Clone the request and set the new header in one step.
    const authReq = req.clone();

    // send the newly created request
    return next.handle(authReq);
  }



}
