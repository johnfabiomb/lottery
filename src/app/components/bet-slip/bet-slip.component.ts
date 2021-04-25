import { Component, OnInit } from '@angular/core'
import { LotteryService } from 'src/app/services/lottery.service'
import { Ball } from 'src/app/models/ball'

@Component({
  selector: 'app-bet-slip',
  templateUrl: './bet-slip.component.html',
  styleUrls: ['./bet-slip.component.scss']
})
export class BetSlipComponent implements OnInit {
  public selectedBalls: Ball[] = []

  constructor (public _lottery: LotteryService) { }

  ngOnInit (): void {
    this._lottery.getSelectedBalls$().subscribe(
      selectedBalls => {
        this.selectedBalls = selectedBalls
      }
    )
  }
}
