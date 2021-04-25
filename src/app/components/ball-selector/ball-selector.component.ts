import { Component, OnInit } from '@angular/core'
import { LotteryService } from 'src/app/services/lottery.service'

@Component({
  selector: 'app-ball-selector',
  templateUrl: './ball-selector.component.html',
  styleUrls: ['./ball-selector.component.scss']
})
export class BallSelectorComponent implements OnInit {
  public showClear: Boolean = false

  constructor (public _lottery: LotteryService) { }

  ngOnInit (): void {
    this._lottery.getShowClear$().subscribe(
      showClear => {
        this.showClear = showClear
      }
    )
  }
}
