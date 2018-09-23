import { commutativity, associativity, isomorphic } from './properties';

class Specify {
  constructor(fn, { times, sig, n, commutative, associative, isomorphism }) {
    this.fn = fn;
    this.times = times;
    this.sig = sig;
    this.n = n;
    this.commutative = commutative;
    this.associative = associative;
    this.isomorphism = isomorphism;
  }

  test({
    times = this.times,
    commutative = this.commutative,
    associative = this.associative,
    isomorphism = this.isomorphism,
  } = {}) {
    if (commutative !== undefined) {
      return commutativity({ times, fn: this.fn, sig: this.sig }, commutative);
    }
    if (associative !== undefined) {
      return associativity({ times, fn: this.fn, sig: this.sig }, associative);
    }
    if (isomorphism !== undefined) {
      return isomorphic({ times, f: this.fn, g: isomorphism, sig: this.sig });
    }
    return false;
  }
}

export default Specify;
