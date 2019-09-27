import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { User } from 'src/app/_models';

@Component({
  selector: 'app-gov',
  templateUrl: './gov.component.html',
  styleUrls: ['./gov.component.scss']
})
export class GovComponent implements OnInit {
  @Output() follow: EventEmitter<any> = new EventEmitter();
  @Output() unfollow: EventEmitter<any> = new EventEmitter();
  @Input() gov: User;
  @Input() userId: number;
  @Input() followed: boolean;

  constructor() { }

  ngOnInit() {
  }

}
