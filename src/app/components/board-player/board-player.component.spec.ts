import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardPlayerComponent } from './board-player.component';

describe('BoardPlayerComponent', () => {
  let component: BoardPlayerComponent;
  let fixture: ComponentFixture<BoardPlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoardPlayerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoardPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
