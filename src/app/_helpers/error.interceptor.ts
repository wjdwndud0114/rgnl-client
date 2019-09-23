import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { DataService } from '../_services/data.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private data: DataService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if ([401, 403].indexOf(err.status) !== -1) {
                // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
                this.data.removeAuthToken();
                location.reload(true);
            }

            let error = err.error || err.statusText;
            if ([0, 404, 500].some(status => err.status === status)) {
                error = {message: err.message};
            }

            return throwError(error);
        }));
    }
}