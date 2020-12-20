import { ReverseArrayPipe } from './reverse.pipe';

describe('ReversePipe', () => {
  it('create an instance', () => {
    const pipe = new ReverseArrayPipe();
    expect(pipe).toBeTruthy();
  });

  it('should take array [1,2,3,4,5,6,7,8,9]  and reverse it to array[9,8,7,6,5,4,3,2,1]', () => {
    const pipe = new ReverseArrayPipe();
    expect(pipe.transform([1,2,3,4,5,6,7,8,9])).toEqual([9,8,7,6,5,4,3,2,1]);
  });

  it('should take non sequential array [9,5,4,6,3,7,2,8,1]  and reverse it to array[9,8,7,6,5,4,3,2,1]', () => {
    const pipe = new ReverseArrayPipe();
    expect(pipe.transform([9,5,4,6,3,7,2,8,1])).toEqual([9,8,7,6,5,4,3,2,1]);
  });

  it('should take string array ["a","ab","ac","ba","e","f","g","h","i"]  and reverse it to array["i","h","g","f","e","ba","ac","ab","a"]', () => {
    const pipe = new ReverseArrayPipe();
    expect(pipe.transform(["a","ab","ac","ba","e","f","g","h","i"])).toEqual(["i","h","g","f","e","ba","ac","ab","a"]);
  });
});
