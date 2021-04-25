import { ComponentFixture, TestBed } from '@angular/core/testing'
import { Ball } from 'src/app/models/ball'
import { LotteryService } from 'src/app/services/lottery.service'

import { BallSelectorComponent } from './ball-selector.component'

describe('BallSelectorComponent', () => {
  let component: BallSelectorComponent
  let fixture: ComponentFixture<BallSelectorComponent>
  let service: LotteryService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BallSelectorComponent]
    })
      .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(BallSelectorComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
    service = TestBed.inject(LotteryService)
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should be able to get true when there are selected balls to show the label to clear selected balls', done => {
    component.showClear = false

    service.getShowClear$().subscribe(
      showClear => {
        component.showClear = showClear
        expect(component.showClear).toEqual(true)
        done()
      }
    )

    const ballTest: Ball = service.getLotteryDrum()[0]
    service.selectBall(ballTest)
  })
})
