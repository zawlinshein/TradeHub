import {ItemApi} from '@/api/ItemApi';
import React, { FC, useEffect, useState } from 'react';
import {View, ScrollView, StyleSheet, Button} from 'react-native';
import TopSection from '@/components/TopSection';
import {AllItemList} from '@/components/AllItemList';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {
  QueryFunctionContext,
  useInfiniteQuery,
  useQuery,
} from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';
import { Item } from '@/api/type';
import { useFocusEffect } from '@react-navigation/native';
import { AxiosInstance } from '@/lib/Axios';

const queryClient = new QueryClient();

const MarketScreen:FC = ({navigation}) => {
  const [items,setItems] = useState<Item[]>([])

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
      const res: AxiosResponse<Item[]> = await AxiosInstance.get(
        `/items?_page=${pageParam}&_limit=10`,
      );
      let currentPage = pageParam;
      let nextPage = currentPage < Infinity ? currentPage + 1 : null;
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
      console.log(data);
      data.pages.map(res => setItems(prev => [...prev, ...res.resData]));
    }
  }, [data]);

  console.log(items)

  return (
    <View>
      <TopSection sideBar={navigation} />
      <ScrollView contentContainerStyle={Styles.itemListContainer}>
        <AllItemList
          items={items}
          hasNextPage={hasNextPage}
          fetchNextPage={fetchNextPage}
          isFetchingNextPage={isFetchingNextPage}
        />
      </ScrollView>
    </View>
  );
};

export default MarketScreen;

const Styles = StyleSheet.create({
  itemListContainer: {
    flexDirection: 'column',
    paddingBottom: 150,
  },
});
