import { TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { AppComponent } from './app.component'
import { ComponentsModule } from './components/components.module'
import { LotteryService } from './services/lottery.service'

describe('AppComponent', () => {
  let service: LotteryService
  let fixture
  let app

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ComponentsModule
      ],
      declarations: [
        AppComponent
      ]
    }).compileComponents()
    fixture = TestBed.createComponent(AppComponent)
    app = fixture.componentInstance
  })

  it('should create the app', () => {
    expect(app).toBeTruthy()
  })

  it('error var should be a null value', () => {
    expect(app.error).toBe(null)
  })

  it('should show a error message', done => {
    service = TestBed.inject(LotteryService)
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
