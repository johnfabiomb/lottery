import { Injectable } from '@angular/core'
import { Observable, Subject } from 'rxjs'

import { Ball } from '../models/ball'

@Injectable({
  providedIn: 'root'
})
export class LotteryService {
  private lotteryDrum: Ball[]

  private readonly selectedBalls$: Subject<Ball[]> = new Subject<Ball[]>()

  private readonly showClear$: Subject<Boolean> = new Subject<Boolean>()

  private readonly error$: Subject<string> = new Subject<string>()

  public bet: number = 0

  private winningBall: Ball = null

  private _amount: number = 0

  set amount (value: number) {
    this._amount = value
    this.bet = 0
  }

  get amount (): number {
    return this._amount
  }

  // added a history
  private _history: any = []

  get history (): any {
    if (!this._history.length && sessionStorage.getItem('game_history')) {
      this._history = JSON.parse(sessionStorage.getItem('game_history'))
    }
    return this._history
  }

  set history (value: any) {
    this._history.push(value)
    sessionStorage.setItem('game_history', JSON.stringify(this._history))
  }

  constructor () {
    this.lotteryDrum = [
      {
        number: 1,
        color: '#007bff',
        selected: false
      },
      {
        number: 2,
        color: '#e83e8c',
        selected: false
      },
      {
        number: 3,
        color: '#6610f2',
        selected: false
      },
      {
        number: 4,
        color: '#dc3545',
        selected: false
      },
      {
        number: 5,
        color: '#6f42c1',
        selected: false
      },
      {
        number: 6,
        color: '#fd7e14',
        selected: false
      },
      {
        number: 7,
        color: '#ffc107',
        selected: false
      },
      {
        number: 8,
        color: '#28a745',
        selected: false
      },
      {
        number: 9,
        color: '#007bff',
        selected: false
      },
      {
        number: 10,
        color: '#dc3545',
        selected: false
      }
    ]

    // Set random positions
    this.shuffle(this.lotteryDrum).then(
      (newlotteryDrum: Ball[]) => {
        this.lotteryDrum = newlotteryDrum
      }
    )
  }

  getLotteryDrum () {
    return this.lotteryDrum
  }

  showError$ (msg: string) {
    this.error$.next(msg)
    setTimeout(() => {
      this.error$.next(null)
    }, 3000)
  }

  getError$ (): Observable<string> {
    return this.error$.asObservable()
  }

  getShowClear$ (): Observable<Boolean> {
    return this.showClear$.asObservable()
  }

  getSelectedBalls$ (): Observable<Ball[]> {
    return this.selectedBalls$.asObservable()
  }

  selectBall (ball: Ball) {
    const previus_selectedBalls = this.lotteryDrum.filter(ball => ball.selected)

    if (this.validateMaxSelectedBalls(previus_selectedBalls.length)) {
      ball.selected = !ball.selected
    } else if (ball.selected) {
      ball.selected = false
    }

    const next_selectedBalls = this.lotteryDrum.filter(ball => ball.selected)

    this.showClear$.next((next_selectedBalls.length > 0))

    this.bet = 0

    this.selectedBalls$.next(next_selectedBalls)
  }

  validateMaxSelectedBalls (selectedBalls: number) {
    if (selectedBalls < 8) {
      return true
    }
    return false
  }

  clearSelectedBalls () {
    this.lotteryDrum = this.lotteryDrum.map(ball => {
      ball.selected = false
      return ball
    })
    this.showClear$.next(false)
    this.selectedBalls$.next([])
    this.bet = 0
  }

  getWinningBall (): Ball {
    return this.winningBall
  }

  setBet (countSelectedballs: number) {
    if (this.validateBet(this.amount)) {
      this.bet = countSelectedballs * this.amount
    } else {
      this.showError$('Minimum bet is 5 €')
    }
  }

  validateBet (value) {
    if (value >= 5) {
      return true
    } else {
      return false
    }
  }

  placeBet () {
    const randon_index = Math.floor(Math.random() * 9) + 1
    this.shuffle(this.lotteryDrum).then(
      (newlotteryDrum: Ball[]) => {
        this.winningBall = newlotteryDrum[randon_index]
        const result = (this.winningBall.selected) ? this.bet * 1.5 : this.bet
        this.history = { winningBall: { ...this.winningBall }, bet: this.bet, result: result }
      }
    )
  }

  newBet () {
    this.clearSelectedBalls()
    this.winningBall = null
  }

  async shuffle (array) {
    return await new Promise((resolve, reject) => {
      var currentIndex = array.length; var temporaryValue; var randomIndex

      // While there remain elements to shuffle...
      while (currentIndex !== 0) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex -= 1

        // And swap it with the current element.
        temporaryValue = array[currentIndex]
        array[currentIndex] = array[randomIndex]
        array[randomIndex] = temporaryValue
      }
      resolve(array)
    })
  }
}
