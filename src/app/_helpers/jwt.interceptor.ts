import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataService } from '../_services/data.service';
import { first } from 'rxjs/operators';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor (private data: DataService) { }

    intercept (request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.data.authToken.pipe(first()).subscribe(authToken => {
            if (authToken != null) {
                request = request.clone({
                    setHeaders: {
                        Authorization: `Bearer ${authToken}`
                    }
                });
            }
        });

        return next.handle(request);
    }
}
