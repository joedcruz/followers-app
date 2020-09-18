import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
// import { faStar as fasStar } from '@fortawesome/free-solid-svg-icons';
// import { faStar as farStar } from '@fortawesome/free-regular-svg-icons'

@Component({
  selector: 'favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent implements OnInit {

  // faCoffee = faCoffee;
  // farStar = farStar;
  // fasStar = fasStar;

  @Input('is-applepay') isApplePay: boolean;
  @Output('change') change = new EventEmitter;

  constructor() { }

  ngOnInit(): void {
  }

  onClick() {
    this.isApplePay = !this.isApplePay;
    this.change.emit({newValue: this.isApplePay});
  }
}

export interface PayModeChangedEventArgs {
  newValue: boolean;
}

