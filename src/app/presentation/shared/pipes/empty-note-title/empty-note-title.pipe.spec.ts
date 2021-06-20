import { EmptyNoteTitlePipe } from './empty-note-title.pipe';

describe('EmptyNoteTitlePipe', () => {
  const pipe = new EmptyNoteTitlePipe();

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform empty title "" to "Untitled Document"', () => {
    const result = pipe.transform('');
    const expected = 'Untitled Document';

    expect(result).toBe(expected);
  });

  it('should not transform if title is NOT empty', () => {
    const mockTitle = 'Some Title';
    const result = pipe.transform(mockTitle);

    expect(result).toBe(mockTitle);
  });
});
