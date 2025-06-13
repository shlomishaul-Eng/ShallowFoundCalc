// ui.js
import { state, updateResult } from './state.js';
import { terzaghiBearingCapacity } from './calculations.js';

export function initUI() {
  document.getElementById('calculateButton')
    .addEventListener('click', onCalculate);
}

function onCalculate() {
  state.inputs.cPrime   = parseFloat(document.getElementById('c_prime').value);
  state.inputs.phiDeg   = parseFloat(document.getElementById('phi_deg').value);
  state.inputs.gammaVal = parseFloat(document.getElementById('gamma_val').value);
  state.inputs.B        = parseFloat(document.getElementById('B_val').value);
  state.inputs.q        = parseFloat(document.getElementById('q_val').value);

  const results = terzaghiBearingCapacity(state.inputs);
  Object.entries(results).forEach(([key, val]) => updateResult(key, val));
  renderResults();
}

export function renderResults() {
  document.getElementById('qu_output').textContent        = state.results.qu.toFixed(2);
  document.getElementById('strip_qall_output').textContent = state.results.Nq.toFixed(2);
  drawFoundationSection(state.inputs, state.results);
}

export function drawFoundationSection(inputs, results) {
  const canvas = document.getElementById('sectionCanvas');
  const ctx = canvas.getContext('2d');
  // drawing logic here
}
