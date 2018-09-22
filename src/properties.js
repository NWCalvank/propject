import { shuffle, flowRight, partial } from 'lodash';
import jasmineCheck from 'jasmine-check';

jasmineCheck.install();

const commutativity = ({ fn, sig }, bool) => {
  const inputs = sig.input.map(a => gen[a]);
  if (bool) {
    return describe(fn.name, () => {
      check.it('is commutative', inputs, (...params) => {
        expect(fn(...params)).toEqual(fn(...params));
      });
    });
  }
  return describe(fn.name, () => {
    check.it('is not commutative', inputs, (...params) => {
      expect(fn(...params)).not.toEqual(fn(...params));
    });
  });
};

const associativity = ({ fn, sig, n }, funcs) => {
  const notShuffled = [fn, ...funcs];
  const shuffledFunc = flowRight(shuffle(notShuffled));
  const notShuffledFunc = flowRight(shuffle(notShuffled));
  const funcNames = funcs.map(({ name }) => name).join(', ');
  return describe(fn.name, () => {
    const inputs = n > 1 ? sig.input.map(a => gen[a]) : [gen[sig.input]];
    const withMessage = partial(check.it, `is associative with ${funcNames}`);
    const withInputs = partial(withMessage, ...inputs);
    withInputs((...params) => {
      expect(notShuffledFunc(...params)).toEqual(shuffledFunc(...params));
    });
  });
};

const isomorphic = ({ f, g, sig, n }) =>
  describe(f.name, () => {
    const inputs = n > 1 ? sig.input.map(a => gen[a]) : [gen[sig.input]];
    const withMessage = partial(check.it, `is isomorphic with ${g.name}`);
    const withInputs = partial(withMessage, ...inputs);
    withInputs((...params) => {
      expect(g(f(...params))).toEqual(...params);
    });
  });

export { commutativity, associativity, isomorphic };
