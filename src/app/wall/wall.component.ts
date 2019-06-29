import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { UserService, AuthenticationService } from '@/_services';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { Post, User } from '@/_models';

@Component({
    selector: 'app-wall',
    templateUrl: './wall.component.html',
    styleUrls: ['./wall.component.scss']
})
export class WallComponent implements OnInit, OnDestroy {
    mobileQuery: MediaQueryList;

    private _mobileQueryListener: () => void;

    constructor (
        private authenticationService: AuthenticationService,
        private router: Router,
        private changeDectorRef: ChangeDetectorRef,
        private media: MediaMatcher
    ) {
        this.mobileQuery = media.matchMedia('(max-width: 1023px');
        this._mobileQueryListener = () => changeDectorRef.detectChanges();
        this.mobileQuery.addListener(this._mobileQueryListener);
    }

    ngOnInit () {
        if (!this.authenticationService.currentUserValue) {
            this.router.navigate(["/login"]);
            return;
        }
    }

    ngOnDestroy (): void {
        //Called once, before the instance is destroyed.
        //Add 'implements OnDestroy' to the class.
        this.mobileQuery.removeListener(this._mobileQueryListener);
    }

    signout (): void {
        this.authenticationService.logout().pipe(first()).subscribe(
            data => {
                this.router.navigate(["/"]);
            }
        );
    }
}
