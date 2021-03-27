import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule, Location } from '@angular/common';
import { Component, DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { MemoizedSelector } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { NotesComponent } from './notes.component';

import * as fromRoot from '@app/shared/store/reducers';
import {
  NoteDetailSelectors,
  NotesSelector,
} from '@app/shared/store/selectors';
import { INote } from '@app/shared/models/markdown-state.model';
import { ActivatedRouteStub } from '@app/shared/testing/activated-route.stub';
import { NavigationsActions, NotesActions } from '@app/shared/store/actions';

describe('NotesComponent', () => {
  let component: NotesComponent;
  let fixture: ComponentFixture<NotesComponent>;
  let de: DebugElement;
  let activatedRouteStub: ActivatedRouteStub;
  let location: Location;
  let mockActiveNote: INote;
  let mockStore: MockStore;
  let mockIsPreviewSelector: MemoizedSelector<
    fromRoot.ApplicationState,
    boolean
  >;
  let mockSelectOneLatestNoteSelector: MemoizedSelector<
    fromRoot.ApplicationState,
    INote
  >;
  let mockHasNotesInStorageSelector: MemoizedSelector<
    fromRoot.ApplicationState,
    boolean
  >;
  let mockSelectOneNoteDetailSelector: MemoizedSelector<
    fromRoot.ApplicationState,
    INote
  >;

  beforeEach(
    waitForAsync(() => {
      const locationSpy = jasmine.createSpyObj('Location', ['path']);

      TestBed.configureTestingModule({
        declarations: [
          NotesComponent,
          EmptyNoteStubComponent,
          NotFoundStubComponent,
        ],
        imports: [CommonModule],
        providers: [
          provideMockStore(),
          {
            provide: ActivatedRoute,
            useExisting: ActivatedRouteStub,
          },
          {
            provide: ActivatedRouteStub,
            useFactory: () => {
              return new ActivatedRouteStub();
            },
          },
          {
            provide: Location,
            useValue: locationSpy,
          },
        ],
        schemas: [NO_ERRORS_SCHEMA],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(NotesComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    activatedRouteStub = TestBed.inject(ActivatedRouteStub);
    location = TestBed.inject(Location);
    mockActiveNote = {
      id: '1',
      dateCreated: 1590045443713,
      htmlText: '<h1>Hello</h1>',
      markdownText: '## Test',
      title: 'Testing Note',
    };
    mockStore = TestBed.inject(MockStore);
    mockIsPreviewSelector = mockStore.overrideSelector(
      fromRoot.selectIsPreview,
      false,
    );
    mockSelectOneLatestNoteSelector = mockStore.overrideSelector(
      NotesSelector.selectOneLatestNote,
      mockActiveNote,
    );
    mockHasNotesInStorageSelector = mockStore.overrideSelector(
      fromRoot.hasNotesInStorage,
      true,
    );
    mockSelectOneNoteDetailSelector = mockStore.overrideSelector(
      NoteDetailSelectors.selectOne,
      mockActiveNote,
    );

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch NotesActions.fetchAllNotes on initialization', () => {
    const dispatchSpy = spyOn(mockStore, 'dispatch');
    const expectedAction = NotesActions.fetchAllNotes();

    component.ngOnInit();

    expect(dispatchSpy).toHaveBeenCalledWith(expectedAction);
  });

  it('should dispatch NavigationsActions.clickNote of the latestNote.id when current route is in "/notes"', () => {
    const mockCurrentPath = '/notes';
    const pathSpy = location.path as jasmine.Spy;
    pathSpy.and.returnValue(mockCurrentPath);
    const dispatchSpy = spyOn(mockStore, 'dispatch');
    const expectedAction = NavigationsActions.clickNote({
      payload: mockActiveNote.id,
    });
    mockSelectOneLatestNoteSelector.setResult(mockActiveNote);
    mockStore.refreshState();

    component.ngOnInit();

    expect(dispatchSpy).toHaveBeenCalledWith(expectedAction);
  });

  it('should show EmptyNoteComponent if there is NO note', () => {
    mockHasNotesInStorageSelector.setResult(false);
    mockStore.refreshState();

    fixture.detectChanges();

    const emptyNoteElement = de.query(By.css('#EmptyNote'));
    expect(emptyNoteElement).toBeTruthy();
  });

  it('should hide EmptyNoteComponent if there are some notes', () => {
    mockHasNotesInStorageSelector.setResult(true);
    mockStore.refreshState();

    fixture.detectChanges();

    const emptyNoteElement = de.query(By.css('#EmptyNote'));
    expect(emptyNoteElement).toBeFalsy();
  });

  it('should show NotFoundComponent if the note detail cannot be found', () => {
    mockSelectOneNoteDetailSelector.setResult(undefined);
    mockStore.refreshState();

    fixture.detectChanges();

    const notFoundElement = de.query(By.css('#NotFound'));
    expect(notFoundElement).toBeTruthy();
  });

  it('should hide NotFoundComponent if there is a note detail', () => {
    mockSelectOneNoteDetailSelector.setResult(mockActiveNote);
    mockStore.refreshState();

    fixture.detectChanges();

    const notFoundElement = de.query(By.css('#NotFound'));
    expect(notFoundElement).toBeFalsy();
  });
});

@Component({
  selector: 'app-empty-note',
  template: '<div id="EmptyNote"></div>',
})
class EmptyNoteStubComponent {}

@Component({
  selector: 'app-not-found',
  template: '<div id="NotFound"></div>',
})
class NotFoundStubComponent {}
