import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
    selector: 'app-wall',
    templateUrl: './wall.component.html',
    styleUrls: ['./wall.component.scss']
})
export class WallComponent implements OnInit, OnDestroy {
    mobileQuery: MediaQueryList;

    private _mobileQueryListener: () => void;

    constructor (
        changeDectorRef: ChangeDetectorRef,
        media: MediaMatcher
    ) {
        this.mobileQuery = media.matchMedia('(max-width: 1023px');
        this._mobileQueryListener = () => changeDectorRef.detectChanges();
        this.mobileQuery.addListener(this._mobileQueryListener);
    }

    ngOnInit () {
    }

    ngOnDestroy (): void {
        //Called once, before the instance is destroyed.
        //Add 'implements OnDestroy' to the class.
        this.mobileQuery.removeListener(this._mobileQueryListener);
    }

}
