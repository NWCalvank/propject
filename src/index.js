import { commutativity, associativity, isomorphic } from './properties';

class Specify {
  constructor(fn, { sig, n, commutative, associative, isomorphism }) {
    this.fn = fn;
    this.sig = sig;
    this.n = n;
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
      return commutativity({ fn: this.fn, sig: this.sig }, commutative);
    }
    if (associative !== undefined) {
      return associativity({ fn: this.fn, sig: this.sig }, associative);
    }
    if (isomorphism !== undefined) {
      return isomorphic({ f: this.fn, g: isomorphism, sig: this.sig });
    }
    return false;
  }
}

export default Specify;
