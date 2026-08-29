import '@babel/polyfill';
import { displayMap } from './mapbox';
import { login, logout } from './login';
import { updateUserData } from './updateSettings';

// DOM elements
const mapEl = document.getElementById('map');
const loginForm = document.querySelector('.login-form .form');
const userDataForm = document.querySelector('.form-user-data');
const logoutBtn = document.querySelector('.nav__el--logout');

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

if (userDataForm) {
  userDataForm.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    updateUserData(name, email);
  });
}

if (logoutBtn) {
  logoutBtn.addEventListener('click', logout);
}
