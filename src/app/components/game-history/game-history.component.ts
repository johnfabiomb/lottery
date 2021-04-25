import { Component, OnInit } from '@angular/core'
import { LotteryService } from 'src/app/services/lottery.service'

@Component({
  selector: 'app-game-history',
  templateUrl: './game-history.component.html',
  styleUrls: ['./game-history.component.scss']
})
export class GameHistoryComponent implements OnInit {
  constructor (public _lottery: LotteryService) { }

  ngOnInit (): void {
  }
}
