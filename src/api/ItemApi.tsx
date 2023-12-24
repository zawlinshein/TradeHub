import axios, {AxiosError, AxiosResponse} from 'axios';
import {Item} from '../@types/type';
import {useInfiniteQuery} from '@tanstack/react-query';
import axiosInstance from '@/lib/Axios';
import { v4 as uuidv4 } from 'uuid';

axios.defaults.baseURL = 'http://10.1.40.165:3000';

const fetchItems = async ({pageParam}: {pageParam: number}) => {
  const res: AxiosResponse<Item[]> = await axios.get(
    `/items?_page=${pageParam}&_limit=10`,
  );
  let currentPage = pageParam;
  let lastPage = 7;
  let nextPage = currentPage < lastPage ? currentPage + 1 : null;
  return {
    resData: res.data,
    nextPage,
  };
};

const ItemApi = () => {
  return useInfiniteQuery({
    queryKey: ['questions'],
    queryFn: fetchItems,
    initialPageParam: 1,
    getNextPageParam: lastPage => lastPage.nextPage,
  });
};

export {ItemApi};

export const addItem = async (item: Item) => {

  try {
    console.log('user that going to be registered ', item);
    const a: AxiosResponse<Item> = await axiosInstance.post('/items', {
      ...item,
      id: uuidv4(),
    });
  } catch (error) {
    console.log('error occur');
    const e = error as AxiosError;
    console.log(JSON.stringify(e, null, 2));
  }
}