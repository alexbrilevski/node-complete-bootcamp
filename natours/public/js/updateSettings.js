import axios from 'axios';
import { showAlert } from './alert';

// type is either password or data
export const updateSettings = async (data, type) => {
  const route = type === 'password' ? 'update-my-password' : 'update-me';
  try {
    const response = await axios({
      method: 'PATCH',
      url: `http://localhost:3000/api/v1/users/${route}`,
      data,
    });

    if (response.data.status === 'success') {
      showAlert('success', `Your ${type} updated successfully.`);
      setTimeout(() => {
        location.reload(true);
      }, 500);
    }
  } catch (error) {
    showAlert('error', error.response.data.message);
  }
};
