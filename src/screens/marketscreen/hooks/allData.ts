import {Item} from '@/@types/type';
import {useInfiniteQuery} from '@tanstack/react-query';
import {AxiosResponse} from 'axios';
import {useEffect, useState} from 'react';
import axiosInstance from 'lib/Axios';

export const allData = () => {
  const [items, setItems] = useState<Item[]>([]);

  const {
    data,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    refetch,
    isFetching,
  } = useInfiniteQuery({
    queryKey: ['questions'],
    queryFn: async ({pageParam}) => {
      const res: AxiosResponse<Item[]> = await axiosInstance.get(
        `/items?_page=${pageParam}&_limit=10`,
      );
      let currentPage = pageParam;
      let nextPage =
        currentPage < (await axiosInstance.get('/items')).data.length
          ? currentPage + 1
          : null;
      return {
        resData: res.data,
        nextPage,
      };
    },
    initialPageParam: 1,
    getNextPageParam: lastPage => lastPage.nextPage,
  });

  useEffect(() => {
    if (data) {
      console.log('why data are showing here ? ', data);
      data.pages.map(res => setItems(prev => [...prev, ...res.resData]));
    }
  }, [data]);

  return {
    items,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  };
};
