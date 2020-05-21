import { EmptyNoteTitlePipe } from './empty-note-title.pipe';

describe('TransformPipe', () => {
  it('create an instance', () => {
    const pipe = new EmptyNoteTitlePipe();
    expect(pipe).toBeTruthy();
  });
});
