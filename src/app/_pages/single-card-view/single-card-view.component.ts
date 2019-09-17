import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-single-card-view',
  templateUrl: './single-card-view.component.html',
  styleUrls: ['./single-card-view.component.scss']
})
export class SingleCardViewComponent implements OnInit {
  currentView: string;

  constructor(
    activatedRoute: ActivatedRoute
  ) {
    this.currentView = activatedRoute.snapshot.data.card;
  }

  ngOnInit() {
  }

}
