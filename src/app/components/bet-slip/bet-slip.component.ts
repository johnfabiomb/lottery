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

  private _amount: number = 0

  set amount (value: number) {
    this._amount = value
    this._lottery.bet = 0
  }

  get amount (): number {
    return this._amount
  }

  constructor (public _lottery: LotteryService) { }

  ngOnInit (): void {
    this._lottery.getSelectedBalls$().subscribe(
      selectedBalls => {
        this.selectedBalls = selectedBalls
        console.log(selectedBalls)
      }
    )
  }

  setBet () {
    if (this.validateBet(this.amount)) {
      this._lottery.bet = this.selectedBalls.length * this.amount
    } else {
      this._lottery.showError$('Minimum bet is 5 €')
    }
  }

  validateBet (value) {
    if (value >= 5) {
      return true
    } else {
      return false
    }
  }

  placeBet (bet = this._lottery.bet) {
    this._lottery.placeBet()
  }
}
