import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing'
import { FormsModule } from '@angular/forms'
import { Ball } from 'src/app/models/ball'
import { LotteryService } from 'src/app/services/lottery.service'

import { BetSlipComponent } from './bet-slip.component'

describe('BetSlipComponent', () => {
  let component: BetSlipComponent
  let fixture: ComponentFixture<BetSlipComponent>
  let service: LotteryService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BetSlipComponent],
      imports: [FormsModule]
    })
      .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(BetSlipComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
    service = TestBed.inject(LotteryService)
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should be able to get selected balls', done => {
    const ball: Ball = service.getLotteryDrum()[0]

    component._lottery.getSelectedBalls$().subscribe(
      (balls: Ball[]) => {
        expect(balls[0]).toEqual(ball)
        done()
      }
    )
    service.selectBall(ball)
  })
})
