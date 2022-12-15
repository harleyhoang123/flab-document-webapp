import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AccountService } from '../_services';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private accountService: AccountService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if ([401, 403].includes(err.status) && this.accountService.userValue) {
                // auto logout if 401 or 403 response returned from api
                this.accountService.logout();
            }else if([404].includes(err.status)){
                this.accountService.errorPage();
            }else if( [500, 503].includes(err.status)){
              this.accountService.internalServerErrorPage();
            }

            try{
              const error = err.error?.status.message || "Some error occur please try again!";
              console.error(err);
              return throwError(() => error);
            }catch ({ex}){
              return throwError(() => "Some error occur please try again!");
            }

        }))
    }
}
