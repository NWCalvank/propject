import Specify from '../src/index';

const add = (x, y) => x + y;
const add1 = x => x + 1;
const subtract1 = x => x - 1;
// add test coverage for...
// const curried = x => y => x + y
// const nary = (...params) => params.reduce(add)
// const polymorphic = x => typeof x === 'string' ? x.toUppercase() : x + 1

/*
 * TODO
 * - handle NODE_ENV=dev/test to run tests once with randoom value or 1000
 *   times -- or some other node environment variable/flag
 * - handle example inputs as well as types
 * - accept typed schemas to validate against
 *   ex. specify(fetchPerson, sig: { output: Person })
 * - create README about being an abstraction over tests for declarative tests
 */

describe('Specify', () => {
  it('accepts sig object for function input/output', () => {
    const sig = { input: 'int', output: 'int' };
    const specify = new Specify(add, { sig });
    expect(specify.fn).toEqual(add);
    expect(specify.sig.input).toEqual('int');
    expect(specify.sig.output).toEqual('int');
  });

  it('accepts n property for function argument length', () => {
    const specify = new Specify(add, { n: 2 });
    expect(specify.n).toEqual(2);
  });
});

describe('commutative property --', () => {
  const sig = { input: ['int', 'int'], output: 'int' };
  const tests = [
    { name: 'true', subject: new Specify(add, { sig, commutative: true }) },
    // TODO: figure out a non-commutative example
    /* {
      name: 'false',
      subject: new Specify(subtract, { sig, commutative: false }),
    }, */
  ];

  tests.forEach(({ subject }) => {
    it('should be present', () => {
      expect(subject.commutative).toBeDefined();
    });
    subject.test();
    // NOTE: this stopped working after refactoring Specify into a class
    /* tests.forEach(({ name, subject }) => {
    it(`${name} should have an implemented test`, () => {
      expect(subject.test()).toBeTruthy();
    }); */
  });
});

describe('associative property --', () => {
  const assocs = [add1, subtract1, add1, subtract1];
  const sig = { input: 'int', output: 'int' };
  const tests = [
    { name: '', subject: new Specify(add1, { sig, associative: assocs }) },
  ];

  tests.forEach(({ subject }) => {
    it('should be present', () => {
      expect(subject.associative).toBeDefined();
    });
    subject.test();
  });
});

describe('isomorphism property --', () => {
  const sig = { input: 'int', output: 'int' };
  const tests = [
    {
      name: 'f.g',
      subject: new Specify(add1, { sig, isomorphism: subtract1 }),
    },
    {
      name: 'g.f',
      subject: new Specify(subtract1, { sig, isomorphism: add1 }),
    },
  ];

  tests.forEach(({ subject }) => {
    it('should be present', () => {
      expect(subject.isomorphism).toBeDefined();
    });
    subject.test();
  });
});
