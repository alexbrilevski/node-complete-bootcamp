import axios from 'axios';
import { showAlert } from './alert';

export const updateUserData = async (name, email) => {
  try {
    const response = await axios({
      method: 'PATCH',
      url: 'http://localhost:3000/api/v1/users/update-me',
      data: {
        name,
        email,
      }
    });

    if (response.data.status === 'success') {
      showAlert('success', 'User data updated successfully.');
      setTimeout(() => {
        location.reload(true);
      }, 500);
    }
  } catch (error) {
    showAlert('error', error.response.data.message);
  }
};
