import { Component } from '@angular/core';
import { AppBroadcastService } from './services/app-broadcast.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'water-flow';

  constructor(public appBroadcastService: AppBroadcastService) {
  }

}
