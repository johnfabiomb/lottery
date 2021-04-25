import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing'
import { Ball } from 'src/app/models/ball'
import { LotteryService } from 'src/app/services/lottery.service'
import { GameHistoryComponent } from './game-history.component'

describe('GameHistoryComponent', () => {
  let component: GameHistoryComponent
  let fixture: ComponentFixture<GameHistoryComponent>
  let service: LotteryService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GameHistoryComponent]
    })
      .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(GameHistoryComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
    service = TestBed.inject(LotteryService)
  })

  it('should be able to get winning ball history', <any>fakeAsync((): void => {
    const ballTest: Ball = service.getLotteryDrum()[0]
    service.selectBall(ballTest)
    service.amount = 5
    service.setBet(1)
    service.placeBet()
    tick(500)
    expect(service.getWinningBall()).toBeDefined()
    service.newBet()
    tick(50)
    expect(service.history.length).toBeGreaterThanOrEqual(1)
  }))
})
