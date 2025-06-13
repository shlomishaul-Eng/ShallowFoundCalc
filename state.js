// state.js
export const state = {
  inputs: {
    cPrime: null,
    phiDeg: null,
    gammaVal: null,
    B: null,
    q: null,
  },
  results: {
    qu: null,
    Nc: null,
    Nq: null,
    Nγ: null,
  },
  settings: {
    unitSystem: 'kpa',
    theme: 'light',
  }
};

export function updateInput(name, value) {
  state.inputs[name] = value;
}

export function updateResult(name, value) {
  state.results[name] = value;
}
