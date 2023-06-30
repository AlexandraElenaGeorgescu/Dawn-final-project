import { NameUppercasePipe } from './name-uppercase.pipe';

describe('NameUppercasePipe', () => {
  it('create an instance', () => {
    const pipe = new NameUppercasePipe();
    expect(pipe).toBeTruthy();
  });
});
