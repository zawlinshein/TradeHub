import {Item} from '@/@types/type';
import {FC, memo} from 'react';
import {
  FlatList,
  ImageBackground,
  ListRenderItem,
  Text,
  View,
} from 'react-native';
import {SkeletonPlaceHolder} from './Skeleton';
import {TouchableOpacity} from 'react-native-gesture-handler';

export const AllItemList: FC<{
  items: Item[];
  hasNextPage: boolean;
  fetchNextPage: () => void;
  isFetchingNextPage: boolean;
}> = ({items, hasNextPage, fetchNextPage, isFetchingNextPage}) => {
  console.log('screen ');
  return (
    <View style={{minHeight: 150}}>
      <Text
        style={{
          backgroundColor: 'red',
          padding: 10,
          marginTop: 12,
          color: 'white',
        }}>
        Cats
      </Text>
      {items.length !== 0 ? (
        <ItemListView
          items={items}
          hasNextPage={hasNextPage}
          fetchNextPage={fetchNextPage}
          isFetchingNextPage={isFetchingNextPage}
        />
      ) : (
        <SkeletonPlaceHolder />
      )}
    </View>
  );
};

const renderItemFnc: ListRenderItem<Item> = ({item}): React.JSX.Element => {
  console.log(item._id);

  return (
    <TouchableOpacity>
      <View
        style={{
          width: 100,
          height: 120,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ImageBackground
          resizeMode="cover"
          style={{width: '100%', height: 100}}
          source={{uri: `data:image/jpeg;base64,${item.picture}`}}>
          {/* <Text
          style={{
            color: 'red',
            padding: item.sold ? 3 : 0,
            alignSelf: 'flex-end',
            borderRadius: 20,
            marginTop: 12,
            backgroundColor: 'white',
            marginEnd: 5,
          }}>
          {item.sold ? 'sold out' : ''}
        </Text> */}
        </ImageBackground>
        {/* <Text>{item.price}</Text>
      <Text>{item.discount}</Text> */}
      </View>
    </TouchableOpacity>
  );
};

const ItemListView: FC<{
  items: Item[];
  hasNextPage: boolean;
  fetchNextPage: () => void;
  isFetchingNextPage: boolean;
}> = memo(({items, hasNextPage, fetchNextPage, isFetchingNextPage}) => (
  <FlatList
    contentContainerStyle={{
      flexDirection: 'row',
      gap: 10,
      paddingHorizontal: 12,
    }}
    showsHorizontalScrollIndicator={false}
    horizontal={true}
    style={{
      paddingVertical: 12,
      height: 150,
    }}
    data={items}
    ListFooterComponent={() => isFetchingNextPage && <SkeletonPlaceHolder />}
    keyExtractor={item => item._id}
    renderItem={renderItemFnc}
    onEndReached={() => hasNextPage && fetchNextPage()}
  />
));
