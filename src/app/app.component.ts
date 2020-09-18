import { Component } from '@angular/core';
import { PayModeChangedEventArgs } from './favorite/favorite.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Hello-World';

  post = {
    title: 'Title',
    isApplePay: true
  };

  tweet = {
    body: '...',
    likesCount: 8,
    isLiked: true
  };

  onPayModeChanged(eventArgs: PayModeChangedEventArgs) {
      console.log('Pay Mode Changed: ', eventArgs);
  }
}
