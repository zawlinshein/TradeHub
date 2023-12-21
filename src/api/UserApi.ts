import axiosInstance from '@/lib/Axios';
import {AxiosError, AxiosResponse} from 'axios';
import 'react-native-get-random-values'; // necessary ?
import {v4 as uuidv4} from 'uuid';

type User = {
  name: string;
  age: number;
  email: string;
};

export const SaveUser = async (user: User) => {
  try {
    console.log('user that going to be registered ', user);
    const a: AxiosResponse<User> = await axiosInstance.post('/users', {
      ...user,
      id: uuidv4(),
    });

    return a.data;
    // console.log('user that going to be registered ', user);
    // const a = await fetch('http://10.1.40.227:3000/users', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(user),
    // });

    // console.log(a);

    // return a.json();
  } catch (error) {
    console.log('error occur');
    const e = error as AxiosError;
    console.log(JSON.stringify(e, null, 2));
  }
};
