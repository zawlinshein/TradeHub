import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {FC} from 'react';
import {Image, SafeAreaView, View, Text, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  sideMenuProfileIcon: {
    resizeMode: 'center',
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    alignSelf: 'center',
  },
  iconStyle: {
    width: 15,
    height: 15,
    marginHorizontal: 5,
  },
  customItem: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export const CustomSidebarMenu: FC<DrawerContentComponentProps> = props => {
  const BASE_PATH =
    'https://raw.githubusercontent.com/AboutReact/sampleresource/master/';
  const proileImage = 'react_logo.png';

  return (
    <SafeAreaView style={{flex: 1}}>
      {/*Top Large Image */}

      <DrawerContentScrollView {...props}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            padding: 10,
            gap: 10,
          }}>
          <View
            style={{
              width: 50,
              height: 50,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 25,
              backgroundColor: 'red',
            }}>
            <Image
              source={{uri: BASE_PATH + proileImage}}
              style={[styles.sideMenuProfileIcon, {width: '100%'}]}
            />
          </View>
          <View style={{flex: 1}}>
            <Text style={{fontSize: 16}}>zawlinshein</Text>
            <Text>time</Text>
            <Text>v</Text>
          </View>
        </View>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
    </SafeAreaView>
  );
};
