// calculations.js
export function terzaghiBearingCapacity(params) {
  const { cPrime, phiDeg, gammaVal, B, q } = params;
  const φ = phiDeg * Math.PI / 180;
  const Nq = Math.exp(Math.PI * Math.tan(φ)) * Math.pow(Math.tan(Math.PI / 4 + φ / 2), 2);
  const Nc = (Nq - 1) / Math.tan(φ);
  const Nγ = 2 * (Nq + 1) * Math.tan(φ);
  const qu = cPrime * Nc + q * Nq + 0.5 * gammaVal * B * Nγ;
  return { qu, Nc, Nq, Nγ };
}

export function linearInterpolate(x, x0, y0, x1, y1) {
  return y0 + (y1 - y0) * ((x - x0) / (x1 - x0));
}
