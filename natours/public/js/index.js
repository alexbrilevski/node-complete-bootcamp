import '@babel/polyfill';
import { displayMap } from './mapbox';
import { login } from './login';

// DOM elements
const mapEl = document.getElementById('map');
const loginForm = document.querySelector('.form');

// Delegation
if (mapEl) {
  const locations = JSON.parse(mapEl.dataset.locations);
  const accessToken = mapEl.dataset.token;
  displayMap(locations, accessToken);
}

if (loginForm) {
  loginForm.addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });
}
