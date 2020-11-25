import { ReverseArrayPipe } from './reverse.pipe';

describe('ReversePipe', () => {
  it('create an instance', () => {
    const pipe = new ReverseArrayPipe();
    expect(pipe).toBeTruthy();
  });
});
