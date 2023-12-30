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
import Icon from 'react-native-vector-icons/FontAwesome';

export const AllItemList: FC<{
  items: Item[];
  hasNextPage: boolean;
  fetchNextPage: () => void;
  isFetchingNextPage: boolean;
}> = ({items, hasNextPage, fetchNextPage, isFetchingNextPage}) => {
  console.log('screen ');
  return (
    <View style={{minHeight: 200}}>
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
          resizeMode="contain"
          style={{width: '100%', height: '100%', backgroundColor:'rgba(0,0,0,.1)'}}
          source={{uri: `data:image/jpeg;base64,${item.picture}`}}>
          <Text
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
          </Text>
        </ImageBackground>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Icon name="tags" size={16} color={'red'} />
          <View style={{ display: 'flex' }}>
            <View style={{
              display: 'flex', flexDirection: 'row', gap: 1, justifyContent: 'center', alignItems: 'center'}}>

            <Text
              style={{
                fontSize: 18,
                color: 'green',
                textAlign: 'center',
              }}>
              
              {numberWithCommas(item.price)}
              </Text>
              <Text style={{color: 'black', fontWeight: 'bold'}}>
                MMK
              </Text>
            </View>
            <Text style={{fontSize: 16, color: 'red',}}>
              
              {item.discount}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

function numberWithCommas(x: number) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

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
      height: 170,
    }}
    data={items}
    ListFooterComponent={() => isFetchingNextPage && <SkeletonPlaceHolder />}
    keyExtractor={item => item._id}
    renderItem={renderItemFnc}
    onEndReached={() => hasNextPage && fetchNextPage()}
  />
));
