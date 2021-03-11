import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MemoizedSelector } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { NoteDetailsComponent } from './note-details.component';

import * as fromRoot from '@app/shared/store/reducers';
import { NoteDetailSelectors } from '@app/shared/store/selectors';
import { INote } from '@app/shared/models/markdown-state.model';
import { NoteDetailActions } from '@app/shared/store/actions';
import { ActivatedRouteStub } from '@app/shared/testing/activated-route.stub';
import { TextEditorStubComponent } from '@app/shared/testing/text-editor.stub';

describe('NoteDetailsComponent', () => {
  let component: NoteDetailsComponent;
  let fixture: ComponentFixture<NoteDetailsComponent>;
  let de: DebugElement;
  let activatedRouteStub: ActivatedRouteStub;
  let mockActiveNote: INote;
  let mockStore: MockStore;
  let mockActiveNoteSelector: MemoizedSelector<
    fromRoot.ApplicationState,
    INote
  >;
  let mockIsPreviewSelector: MemoizedSelector<
    fromRoot.ApplicationState,
    boolean
  >;
  let mockHasNotesInStorageSelector: MemoizedSelector<
    fromRoot.ApplicationState,
    boolean
  >;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [NoteDetailsComponent, TextEditorStubComponent],
        imports: [CommonModule, FormsModule],
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
        ],
        schemas: [NO_ERRORS_SCHEMA],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteDetailsComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    activatedRouteStub = TestBed.inject(ActivatedRouteStub);
    activatedRouteStub.setParamMap({ id: 'someMockId' });
    mockActiveNote = {
      id: '1',
      dateCreated: 1590045443713,
      htmlText: '<h1>Hello</h1>',
      markdownText: '## Test',
      title: 'Testing Note',
    };
    mockStore = TestBed.inject(MockStore);
    mockActiveNoteSelector = mockStore.overrideSelector(
      NoteDetailSelectors.selectOne,
      mockActiveNote,
    );
    mockIsPreviewSelector = mockStore.overrideSelector(
      fromRoot.selectIsPreview,
      false,
    );
    mockHasNotesInStorageSelector = mockStore.overrideSelector(
      fromRoot.hasNotesInStorage,
      true,
    );
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch NotesActions.fetchOneNote when the router parameter changes', () => {
    const dispatchSpy = spyOn(mockStore, 'dispatch');
    const mockRouteParameter = 'noteId1';
    const expectedAction = NoteDetailActions.fetchOneNote({
      noteId: mockRouteParameter,
    });

    activatedRouteStub.setParamMap({ id: mockRouteParameter });

    expect(dispatchSpy).toHaveBeenCalledWith(expectedAction);
  });

  it('should show Empty Note div if there is NO note', () => {
    mockHasNotesInStorageSelector.setResult(false);
    mockStore.refreshState();
    fixture.detectChanges();

    const queryEmptyNoteDiv = de.query(By.css('#EmptyNote'));

    expect(queryEmptyNoteDiv).toBeTruthy();
  });

  it('should show Note Container div if there is a note', () => {
    mockHasNotesInStorageSelector.setResult(true);
    mockStore.refreshState();
    fixture.detectChanges();

    const queryNoteContainerDiv = de.query(By.css('#NoteContainer'));

    expect(queryNoteContainerDiv).toBeTruthy();
  });

  it('should show Preview Container when Preview Mode is ON', () => {
    mockHasNotesInStorageSelector.setResult(true);
    mockIsPreviewSelector.setResult(true);
    mockStore.refreshState();
    fixture.detectChanges();

    const queryNotePreviewDiv = de.query(By.css('#NotePreview'));

    expect(queryNotePreviewDiv).toBeTruthy();
  });

  describe('when Preview Mode is OFF and there is a note', () => {
    beforeEach(() => {
      mockHasNotesInStorageSelector.setResult(true);
      mockIsPreviewSelector.setResult(false);
      mockStore.refreshState();
      fixture.detectChanges();
    });

    it('should show Note Title editor elements', () => {
      const queryNoteTitleInput = de.query(By.css('#NoteTitleTxt'));

      expect(queryNoteTitleInput).toBeTruthy('Note title should show');
    });

    it(
      'should display "Testing Note" in the title editor when title is "Testing Note"',
      waitForAsync(() => {
        fixture.whenStable().then(() => {
          const expected = 'Testing Note';
          const queryNoteTitleInput = de.query(By.css('#NoteTitleTxt'));
          const noteTitleElement = queryNoteTitleInput.nativeElement;

          expect(noteTitleElement.value).toBe(expected);
        });
      }),
    );

    it(
      'should dispatch NoteDetailActions.updateOneNote when note title changes',
      waitForAsync(() => {
        fixture.whenStable().then(() => {
          const queryNoteTitleInput = de.query(By.css('#NoteTitleTxt'));
          const noteTitleElement = queryNoteTitleInput.nativeElement;
          const dispatchSpy = spyOn(mockStore, 'dispatch');
          const mockNoteId = '1';
          const newInputValue = 'Testing Notes';

          noteTitleElement.value = newInputValue;
          noteTitleElement.dispatchEvent(new Event('input'));

          const expectedAction = NoteDetailActions.updateOneNote({
            payload: {
              id: mockNoteId,
              title: newInputValue,
            },
          });

          expect(dispatchSpy).toHaveBeenCalledWith(expectedAction);
        });
      }),
    );

    it(
      'should dispatch NoteDetailActions.updateOneNote when markdown changes',
      waitForAsync(() => {
        fixture.whenStable().then(() => {
          const dispatchSpy = spyOn(mockStore, 'dispatch');
          const mockNoteId = '1';
          const newInputValue = '## Tests';

          component.note.markdownText = newInputValue;
          component.onMarkdownChange();

          const expectedAction = NoteDetailActions.updateOneNote({
            payload: {
              id: mockNoteId,
              markdownText: newInputValue,
            },
          });

          expect(dispatchSpy).toHaveBeenCalledWith(expectedAction);
        });
      }),
    );
  });
});
