import Specify from '../src/index';

const add = (x, y) => x + y;
const subtract = (x, y) => x - y;
const add1 = x => x + 1;
const subtract1 = x => x - 1;

describe('Specify', () => {
  it('accepts sig object for function input/output', () => {
    const sig = { input: Number, output: Number };
    const specify = new Specify(add, { sig });
    expect(specify.fn).toEqual(add);
    expect(specify.sig.input).toEqual(Number);
    expect(specify.sig.output).toEqual(Number);
  });
});

describe('commutative property --', () => {
  const tests = [
    { name: 'true', subject: new Specify(add, { commutative: true }) },
    { name: 'false', subject: new Specify(subtract, { commutative: false }) },
  ];

  tests.forEach(({ subject }) => {
    it('should be present', () => {
      expect(subject.commutative).toBeDefined();
    });
    subject.test();
    /* tests.forEach(({ name, subject }) => {
    it(`${name} should have an implemented test`, () => {
      expect(subject.test()).toBeTruthy();
    }); */
  });
});

describe('associative property --', () => {
  const assocs = [add1, subtract1, add1, subtract1];
  const tests = [
    { name: '', subject: new Specify(add1, { associative: assocs }) },
  ];

  tests.forEach(({ subject }) => {
    it('should be present', () => {
      expect(subject.associative).toBeDefined();
    });
    subject.test();
  });
});

describe('isomorphism property --', () => {
  const tests = [
    { name: 'f.g', subject: new Specify(add1, { isomorphism: subtract1 }) },
    { name: 'g.f', subject: new Specify(subtract1, { isomorphism: add1 }) },
  ];

  tests.forEach(({ subject }) => {
    it('should be present', () => {
      expect(subject.isomorphism).toBeDefined();
    });
    subject.test();
  });
});
