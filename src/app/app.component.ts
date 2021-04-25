import { Component } from '@angular/core'
import { LotteryService } from './services/lottery.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'goldenRace'

  error: any = null

  constructor (public _lottery: LotteryService) {

  }

  ngOnInit () {
    this._lottery.getError$().subscribe(
      error => {
        this.error = error
      }
    )
  }
}
