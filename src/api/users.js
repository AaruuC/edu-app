import axios from 'axios';
// import { userURL } from '../utils/utils';

export const createUser = async (userObject) => {
  // console.log('atapi');
  try {
    if (userObject.username === '' || userObject.password === '') {
      throw new Error('invalid username or password');
    }
    const response = await axios.post('/account/signup', {
      username: userObject.username,
      password: userObject.password,
    });
    return response;
  } catch (err) {
    return err;
  }
};

export const getCurrentUser = async () => {
  try {
    const response = await axios.get('/account/isLogged');
    // console.log(response.data);
    return response.data;
  } catch (err) {
    return err;
  }
};

// export default createUser;
