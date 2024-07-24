import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardSelectionFormComponent } from './board-selection-form.component';

describe('BoardSelectionFormComponent', () => {
  let component: BoardSelectionFormComponent;
  let fixture: ComponentFixture<BoardSelectionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoardSelectionFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoardSelectionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
