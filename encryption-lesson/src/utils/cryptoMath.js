// Euclidean Algorithm to find GCD
export const gcd = (a, b) => {
  while (b !== 0) {
    let temp = b;
    b = a % b;
    a = temp;
  }
  return a;
};

// Extended Euclidean Algorithm to find modular inverse
// Returns d such that (d * e) % phi == 1
export const modInverse = (e, phi) => {
  let m0 = phi;
  let y = 0;
  let x = 1;

  if (phi === 1) return 0;

  while (e > 1) {
    // q is quotient
    let q = Math.floor(e / phi);
    let t = phi;

    // phi is remainder now, process same as Euclid's algo
    phi = e % phi;
    e = t;
    t = y;

    // Update y and x
    y = x - q * y;
    x = t;
  }

  // Make x positive
  if (x < 0) x += m0;

  return x;
};

// Modular Exponentiation: (base^exp) % mod
export const modPow = (base, exp, mod) => {
  let res = 1;
  base = base % mod;
  while (exp > 0) {
    if (exp % 2 === 1) res = (res * base) % mod;
    base = (base * base) % mod;
    exp = Math.floor(exp / 2);
  }
  return res;
};
