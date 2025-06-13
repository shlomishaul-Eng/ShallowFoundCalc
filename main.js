// main.js
import { initUI } from './ui.js';
import { state } from './state.js';

document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme') || state.settings.theme;
  document.body.setAttribute('data-theme', savedTheme);

  const savedUnit = localStorage.getItem('unitSystem') || state.settings.unitSystem;
  // apply unit system switch if needed

  initUI();
});
