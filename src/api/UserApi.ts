import axiosInstance from '@/lib/Axios';
import {AxiosError, AxiosResponse} from 'axios';
import 'react-native-get-random-values'; // necessary ?
import {v4 as uuidv4} from 'uuid';
import {User} from '../@types/type';

export const SaveUser = async (user: User) => {
  try {
    console.log('user that going to be registered ', user);
    axiosInstance.post('/users', {
      ...user,
      id: uuidv4(),
    });
  } catch (err) {
    throw err;
  }
};

export const getUser = async ({email, password}: User) => {
  try {
    console.log(
      `login user email : ${email}, login user password : ${password}`,
    );
    const result: AxiosResponse<User> = await axiosInstance.get(
      `/users?email=${email}&password=${password}`,
    );

    console.log('this is the return result : ', result.data);
  } catch (err) {
    throw err;
  }
};
