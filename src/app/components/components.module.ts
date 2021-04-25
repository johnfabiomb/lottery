import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { BallSelectorComponent } from './ball-selector/ball-selector.component'
import { BetSlipComponent } from './bet-slip/bet-slip.component'
import { FormsModule } from '@angular/forms'
import { GameHistoryComponent } from './game-history/game-history.component'

@NgModule({
  declarations: [
    BallSelectorComponent,
    BetSlipComponent,
    GameHistoryComponent
  ],
  exports: [
    BallSelectorComponent,
    BetSlipComponent,
    GameHistoryComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})

export class ComponentsModule { }
