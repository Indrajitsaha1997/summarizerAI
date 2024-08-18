import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummarizerBotComponent } from './summarizer-bot.component';

describe('SummarizerBotComponent', () => {
  let component: SummarizerBotComponent;
  let fixture: ComponentFixture<SummarizerBotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SummarizerBotComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SummarizerBotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
