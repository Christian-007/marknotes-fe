import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Store, MemoizedSelector } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { NoteDetailsComponent } from './note-details.component';
import * as fromRoot from '@app/shared/store/reducers';
import { INote } from '@app/shared/models/markdown-state.model';
import { NotesActions } from '@app/shared/store/actions';

describe('NoteDetailsComponent', () => {
  let component: NoteDetailsComponent;
  let fixture: ComponentFixture<NoteDetailsComponent>;
  let de: DebugElement;
  let mockActiveNote: INote;
  let mockStore: MockStore<fromRoot.ApplicationState>;
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

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NoteDetailsComponent],
      imports: [CommonModule, FormsModule],
      providers: [provideMockStore()],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteDetailsComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    mockActiveNote = {
      id: '1',
      dateCreated: 1590045443713,
      htmlText: '<h1>Hello</h1>',
      markdownText: '## Test',
      title: 'Testing Note',
    };
    mockStore = TestBed.get(Store);
    mockActiveNoteSelector = mockStore.overrideSelector(
      fromRoot.selectActiveNote,
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

    it('should show Note Title and Body editor elements', () => {
      const queryNoteTitleInput = de.query(By.css('#NoteTitleTxt'));
      const queryMarkdownContentTxtArea = de.query(
        By.css('#MarkdownContentTxtArea'),
      );

      expect(queryNoteTitleInput).toBeTruthy('Note title should show');
      expect(queryMarkdownContentTxtArea).toBeTruthy('Note body should show');
    });

    it('should display "Testing Note" in the title editor when title is "Testing Note"', async(() => {
      fixture.whenStable().then(() => {
        const expected = 'Testing Note';
        const queryNoteTitleInput = de.query(By.css('#NoteTitleTxt'));
        const noteTitleElement = queryNoteTitleInput.nativeElement;

        expect(noteTitleElement.value).toBe(expected);
      });
    }));

    it('should display "## Test" in the markdown editor when markdown is "## Test"', async(() => {
      fixture.whenStable().then(() => {
        const expected = '## Test';
        const queryMarkdownContentTxtArea = de.query(
          By.css('#MarkdownContentTxtArea'),
        );
        const markdownTxtAreaElement =
          queryMarkdownContentTxtArea.nativeElement;

        expect(markdownTxtAreaElement.value).toBe(expected);
      });
    }));

    it('should dispatch NotesActions.updateNote when note title changes', async(() => {
      fixture.whenStable().then(() => {
        const queryNoteTitleInput = de.query(By.css('#NoteTitleTxt'));
        const noteTitleElement = queryNoteTitleInput.nativeElement;
        const dispatchSpy = spyOn(mockStore, 'dispatch');
        const newInputValue = 'Testing Notes';

        noteTitleElement.value = newInputValue;
        noteTitleElement.dispatchEvent(new Event('input'));

        const expectedAction = NotesActions.updateNote({
          payload: {
            title: newInputValue,
          },
        });

        expect(dispatchSpy).toHaveBeenCalledWith(expectedAction);
      });
    }));

    it('should dispatch NotesActions.updateNote when markdown changes', async(() => {
      fixture.whenStable().then(() => {
        const queryMarkdownContentTxtArea = de.query(
          By.css('#MarkdownContentTxtArea'),
        );
        const markdownTxtAreaElement =
          queryMarkdownContentTxtArea.nativeElement;
        const dispatchSpy = spyOn(mockStore, 'dispatch');
        const newInputValue = '## Tests';

        markdownTxtAreaElement.value = newInputValue;
        markdownTxtAreaElement.dispatchEvent(new Event('input'));

        const expectedAction = NotesActions.updateNote({
          payload: {
            markdownText: newInputValue,
          },
        });

        expect(dispatchSpy).toHaveBeenCalledWith(expectedAction);
      });
    }));
  });
});
