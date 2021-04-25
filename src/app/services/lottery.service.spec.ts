import { fakeAsync, TestBed, tick } from '@angular/core/testing'
import { Ball } from '../models/ball'
import { LotteryService } from './lottery.service'

describe('LotteryService', () => {
  let service: LotteryService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(LotteryService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  it('bet var should be 0', () => {
    expect(service.bet).toBe(0)
  })

  it('lotteryDrum var should have 10 balls', () => {
    expect(service.getLotteryDrum()).toHaveSize(10)
  })

  it('should be able to select a ball from lottery drum and get it at the subscription', done => {
    const ballTest: Ball = service.getLotteryDrum()[0]

    service.getSelectedBalls$().subscribe(
      (balls: Ball[]) => {
        expect(balls).toHaveSize(1)
        expect(balls[0]).toEqual(ballTest)
        done()
      }
    )

    service.selectBall(ballTest)
  })

  it('should not be able to have more than 8 Selected Balls at the same time', done => {
    let selectedBalls: Ball[]

    const valid = () => {
      // only 8 selected balls
      expect(selectedBalls).toHaveSize(8)
      done()
    }

    service.getSelectedBalls$().subscribe(
      (balls: Ball[]) => {
        selectedBalls = balls
      }
    )

    /// try to select all balls
    for (let index = 0; index < service.getLotteryDrum().length; index++) {
      const element = service.getLotteryDrum()[index]
      service.selectBall(element)
      if ((service.getLotteryDrum().length - 1) == index) {
        valid()
        break
      }
    }
  })

  it('should be able to clear selected Balls', done => {
    let selectedBalls: Ball[]

    const valid = () => {
      // clear selected balls
      service.clearSelectedBalls()
      expect(selectedBalls).toHaveSize(0)
      done()
    }

    service.getSelectedBalls$().subscribe(
      (balls: Ball[]) => {
        selectedBalls = balls
      }
    )
    /// select 6 balls
    for (let index = 0; index <= 5; index++) {
      const element = service.getLotteryDrum()[index]
      service.selectBall(element)
      if (index == 5) {
        valid()
        break
      }
    }
  })

  it('should not be able to do a bet < 5 € and send a message', done => {
    const result$: any = service.getError$()
    result$.subscribe(
      result => {
        expect(result).toEqual('Minimum bet is 5 €')
        done()
      }
    )
    service.amount = 4
    service.setBet(1)
  })

  it('should be able to place bet >= 5 € and get a winning ball', <any>fakeAsync((): void => {
    const ballTest: Ball = service.getLotteryDrum()[0]
    service.selectBall(ballTest)
    service.amount = 5
    service.setBet(1)
    service.placeBet()
    tick(500)
    expect(service.getWinningBall()).toBeDefined()
  }))

  it('should be able to place new bet  afther one and get a new winning ball', <any>fakeAsync((): void => {
    const ballTest: Ball = service.getLotteryDrum()[0]
    service.selectBall(ballTest)
    service.amount = 5
    service.setBet(1)
    service.placeBet()
    tick(500)
    expect(service.getWinningBall()).toBeDefined()
    service.newBet()
    tick(50)
    expect(service.getWinningBall()).toBeNull()
  }))

  it('should be able to get winning ball history', <any>fakeAsync((): void => {
    const ballTest: Ball = service.getLotteryDrum()[0]
    service.selectBall(ballTest)
    service.amount = 5
    service.setBet(1)
    service.placeBet()
    tick(1000)
    expect(service.getWinningBall()).toBeDefined()
    service.newBet()
    tick(50)
    expect(service.history.length).toBeGreaterThanOrEqual(1)
  }))

  it('should throw a message', done => {
    const msg_test = 'error msg'
    const result$: any = service.getError$()
    result$.subscribe(
      result => {
        expect(result).toEqual(msg_test)
        done()
      }
    )
    service.showError$(msg_test)
  })
})
