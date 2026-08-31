import '@babel/polyfill';
import { displayMap } from './mapbox';
import { login, logout } from './login';
import { updateSettings } from './updateSettings';

// DOM elements
const mapEl = document.getElementById('map');
const loginForm = document.querySelector('.login-form .form');
const userDataForm = document.querySelector('.form-user-data');
const userPaswordForm = document.querySelector('.form-user-password');
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
    const formData = new FormData();
    formData.append('name', document.getElementById('name').value);
    formData.append('email', document.getElementById('email').value);
    formData.append('photo', document.getElementById('photo').files[0]);

    updateSettings(formData, 'data');
  });
}

if (userPaswordForm) {
  userPaswordForm.addEventListener('submit', async e => {
    e.preventDefault();
    const passwordCurrent = document.getElementById('password-current').value;
    const passwordNew = document.getElementById('password').value;
    const passwordNewConfirm = document.getElementById('password-confirm').value;
    await updateSettings({ passwordCurrent, passwordNew, passwordNewConfirm }, 'password');

    document.getElementById('password-current').value = '';
    document.getElementById('password').value = '';
    document.getElementById('password-confirm').value = '';
  });
}

if (logoutBtn) {
  logoutBtn.addEventListener('click', logout);
}
