import axios, { AxiosResponse } from 'axios';
import {useEffect, useState} from 'react';
import {Item} from './type';
import { useInfiniteQuery } from '@tanstack/react-query';

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
