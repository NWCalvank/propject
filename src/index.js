import { shuffle, flowRight } from 'lodash';

const commutativity = (fn, bool) => {
  if (bool) {
    return describe(fn.name, () => {
      it('is commutative', () => {
        expect(fn(3, 5)).toEqual(fn(5, 3));
      });
    });
  }
  return describe(fn.name, () => {
    it('is not commutative', () => {
      expect(fn(3, 5)).not.toEqual(fn(5, 3));
    });
  });
};

const associativity = (fn, funcs) => {
  const notShuffled = [fn, ...funcs];
  const shuffledFunc = flowRight(shuffle(notShuffled));
  const notShuffledFunc = flowRight(shuffle(notShuffled));
  const funcNames = funcs.map(({ name }) => name).join(', ');
  return describe(fn.name, () => {
    it(`is associative with ${funcNames}`, () => {
      expect(notShuffledFunc(5)).toEqual(shuffledFunc(5));
    });
  });
};

const isomorphic = (f, g) =>
  describe(f.name, () => {
    it(`is isomorphic with ${g.name}`, () => {
      expect(f(g(5))).toEqual(g(f(5)));
    });
  });

class Specify {
  constructor(fn, { sig, commutative, associative, isomorphism }) {
    this.fn = fn;
    this.sig = sig;
    this.commutative = commutative;
    this.associative = associative;
    this.isomorphism = isomorphism;
  }

  test({
    commutative = this.commutative,
    associative = this.associative,
    isomorphism = this.isomorphism,
  } = {}) {
    if (commutative !== undefined) {
      return commutativity(this.fn, commutative);
    }
    if (associative !== undefined) {
      return associativity(this.fn, associative);
    }
    if (isomorphism !== undefined) {
      return isomorphic(this.fn, isomorphism);
    }
    return false;
  }
}

export default Specify;
