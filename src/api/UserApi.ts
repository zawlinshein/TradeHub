import axiosInstance from '@/lib/Axios';
import {AxiosError, AxiosResponse} from 'axios';
import 'react-native-get-random-values'; // necessary ?
import {v4 as uuidv4} from 'uuid';
import {User} from '../@types/type';

export const SaveUser = async (user: User) => {
  try {
    console.log('user that going to be registered ', user);
    const a: AxiosResponse<User> = await axiosInstance.post('/users', {
      ...user,
      id: uuidv4(),
    });
  } catch (error) {
    console.log('error occur');
    const e = error as AxiosError;
    console.log(JSON.stringify(e, null, 2));
  }
};
