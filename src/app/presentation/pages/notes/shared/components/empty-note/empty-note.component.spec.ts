import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NotesActions } from '@app/redux/actions';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { EmptyNoteComponent } from './empty-note.component';

describe('EmptyNoteComponent', () => {
  let component: EmptyNoteComponent;
  let fixture: ComponentFixture<EmptyNoteComponent>;
  let de: DebugElement;
  let mockStore: MockStore;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [EmptyNoteComponent],
        providers: [provideMockStore()],
        schemas: [NO_ERRORS_SCHEMA],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(EmptyNoteComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    mockStore = TestBed.inject(MockStore);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch NotesActions.addOneNote() when clicking + Create New Note button', () => {
    const dispatchSpy = spyOn(mockStore, 'dispatch');
    const expectedAction = NotesActions.addOneNote();

    const createNewNoteBtnDe = de.query(By.css('#CreateNewNoteBtn'));
    createNewNoteBtnDe.triggerEventHandler('click', null);

    expect(dispatchSpy).toHaveBeenCalledWith(expectedAction);
  });
});
