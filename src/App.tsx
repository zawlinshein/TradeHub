import 'react-native-gesture-handler';

import AppBottomNavigation from './navigations/AppNavigator';
import {NavigationContainer} from '@react-navigation/native';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  createDrawerNavigator,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {RegisterScreen} from '@/screens/RegisterScreen/RegisterScreen';
import {
  Image,
  View,
  SafeAreaView,
  StyleSheet,
  Text,
  Linking,
} from 'react-native';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {FC} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Camera, useCameraDevice, CameraDevice} from 'react-native-vision-camera';
import MyProfileScreen from './screens/myprofilescreen/MyProfileScreen';

const Drawer = createDrawerNavigator();

const queryClient = new QueryClient();

const Stack = createNativeStackNavigator();

// responsible for showing image in the side bar at the top
const CustomSidebarMenu: FC<DrawerContentComponentProps> = props => {
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

const FirstScreenStack = () => {
  return (
    <Stack.Navigator initialRouteName="FirstPage">
      <Stack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{
          //Set Header Title
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

const App = () => {
  // const device: CameraDevice = useCameraDevice('back');

  // console.log(device[0])

  //  return (
  //    <Camera style={StyleSheet.absoluteFill} device={device[0]} isActive={true} />
  //  );

  return (
    <NavigationContainer>
      <QueryClientProvider client={queryClient}>
        <Drawer.Navigator
          screenOptions={{
            headerShown: false,
            drawerStyle: {
              width: '80%',
              height: '95%',
              borderTopEndRadius: 40,
              marginTop: 34,
            },
          }}
          drawerContent={props => <CustomSidebarMenu {...props} />}>
          <Drawer.Screen
            name="Home"
            component={AppBottomNavigation}
            options={{
              drawerIcon: () => <Icon name="home" size={20} color={'black'} />,
            }}
          />
          <Drawer.Screen
            name="Register"
            component={FirstScreenStack}
            options={{
              drawerIcon: () => (
                <Icon name="wpforms" size={20} color={'black'} />
              ),
            }}
          />
          {/* <Drawer.Screen
            name="Profile"
            component={MyProfileScreen}
            options={{
              drawerIcon: () => (
                <Icon name="wpforms" size={20} color={'black'} />
              ),
            }}
          /> */}
          <Drawer.Screen
            name="MyProfileScreen"
            component={MyProfileScreen}
            options={{
              drawerIcon: () => (
                <Icon name="wpforms" size={20} color={'black'} />
              ),
            }}
          />
        </Drawer.Navigator>
      </QueryClientProvider>
    </NavigationContainer>
  );
};

export default App;
