import { CommonModule } from '@angular/common';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';

import { CardComponent } from './card.component';
import { CustomButtonModule } from '../buttons/custom-button.module';
import { PipeModule } from '@app/shared/pipes/pipe.module';
import { reducers } from '@app/shared/store/reducers';

describe('Card', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CardComponent],
      imports: [
        CommonModule,
        CustomButtonModule,
        PipeModule,
        StoreModule.forRoot(reducers),
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
