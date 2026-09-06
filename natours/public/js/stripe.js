import axios from 'axios';
import { showAlert } from './alert';

export const bookTour = async tourId => {
  try {
    // 1) Get checkout session from API
    const session = await axios(`http://localhost:3000/api/v1/bookings/checkout-session/${tourId}`);

    // 2) Redirect to Stripe Checkout page
    location.replace(session.data.session.url);
  } catch (error) {
    console.log(error);
    showAlert('error', error);
  }
};
