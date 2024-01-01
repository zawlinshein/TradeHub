import React, {FC} from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import TopSection from '@/components/TopSection';
import {AllItemList} from '@/components/AllItemList';
import {QueryClient} from '@tanstack/react-query';
import {allData} from './hooks/allData';

const MarketScreen: FC = ({navigation}) => {
  const {items, hasNextPage, fetchNextPage, isFetchingNextPage} = allData();

  return (
    <>
      <ScrollView contentContainerStyle={Styles.itemListContainer}>
        <TopSection sideBar={navigation} />
        <AllItemList
          items={items}
          hasNextPage={hasNextPage}
          fetchNextPage={fetchNextPage}
          isFetchingNextPage={isFetchingNextPage}
        />
      </ScrollView>
    </>
  );
};

export default MarketScreen;

const Styles = StyleSheet.create({
  itemListContainer: {
    flexDirection: 'column',
    paddingBottom: 16,
    flex: 1,
    backgroundColor: '#fefefe',
  },
});
