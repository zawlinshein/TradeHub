import MarketScreen from '@/screens/marketscreen/MarketScreen';
import {BottomTabBarButtonProps, createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import React, { useEffect, useRef } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {AddItemScreen} from '@/screens/additemscreen/AddItemScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RegisterScreen} from '@/screens/RegisterScreen/RegisterScreen';
import {createDrawerNavigator} from '@react-navigation/drawer';
import MyProfileScreen from '@/screens/myprofilescreen/MyProfileScreen';
import {CustomSidebarMenu} from '@/components/CustomeSideBarMenu';
import LoginScreen from '@/screens/loginscreen/LoginScreen';
import CustomIcon, { Icons } from '@/assets/icons/Icon';
import { StyleSheet, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { reduxStorage, storage } from '@/app/storage';
import {useMMKVString} from 'react-native-mmkv'

console.log(reduxStorage.getItem('this suck'));

console.log(reduxStorage.getItem('root'));

console.log('data from MMKV ? ',reduxStorage.getItem('persist:root'))

console.log('all keys in MMKV : ',storage.getAllKeys())

console.log(reduxStorage.getItem('persist:root') ? true : false)

console.log('==============================')

const Drawer = createDrawerNavigator();

const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

const tabArr = [
  {
    route: 'MarkerScreen',
    label: 'Home',
    type: Icons.Ionicons,
    activeIcon: 'cart',
    inActiveIcon: 'cart-outline',
    component: MarketScreen,
  },
  {
    route: 'AddItemScreen',
    label: 'Add',
    type: Icons.AntDesign,
    activeIcon: 'pluscircle',
    inActiveIcon: 'pluscircleo',
    component: AddItemScreen
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const TabButton = (props: BottomTabBarButtonProps & {
  item: {}}) => {

   const {item, onPress, accessibilityState,} = props;
   const focused = accessibilityState?.selected;
   const viewRef = useRef(null);

   useEffect(() => {
     if (focused) {
       viewRef.current?.animate({
         0: {scale: 0.5, rotate: '0deg'},
         1: {scale: 1.5, rotate: '360deg'},
       });
     } else {
       viewRef.current?.animate({
         0: {scale: 1.5, rotate: '360deg'},
         1: {scale: 1, rotate: '0deg'},
       });
     }
   }, [focused]);


  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={1}
      style={styles.container}>
      <Animatable.View ref={viewRef} duration={1000} style={styles.container}>
        <CustomIcon
          type={item.type}
          name={focused ? item.activeIcon : item.inActiveIcon}
          color={focused ? Colors.primary : Colors.primaryLite}
          style={undefined}
        />
      </Animatable.View>
    </TouchableOpacity>
  );
}

function AppBottomNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 60,
          position: 'absolute',
          bottom: 16,
          right: 16,
          left: 16,
          borderRadius: 16,
          backgroundColor: '#00f0ff',
        },
      }}
      initialRouteName="Cats">
      {tabArr.map((item, index) => {
        return (
          <Tab.Screen
            key={index}
            name={item.route}
            component={item.component}
            options={{
              tabBarShowLabel: false,
              tabBarButton: props => <TabButton {...props} item={item} />,
            }}
          />
        );
      })}
    </Tab.Navigator>
  );
}

export default AppBottomNavigation;

export const FirstScreenStack = () => {
  return (
    <Stack.Navigator initialRouteName="LoginScreen">
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{
          //Set Header Title
          headerShown: false,
        }}
      />
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

export const CreateDrawer = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          width: '80%',
          borderTopEndRadius: 40,
          marginTop: 64,
        },
      }}
      drawerContent={props => <CustomSidebarMenu {...props} />}>
        
      <Drawer.Screen
        name="Home"
        component={AppBottomNavigation}
        options={{
          drawerIcon: () => <Icon name="home" size={16} color={'black'} />,
          swipeEnabled: false,
        }}
      />
      <Drawer.Screen
        name="MyProfileScreen"
        component={MyProfileScreen}
        options={{
          drawerIcon: () => <Icon name="wpforms" size={16} color={'black'} />,
          swipeEnabled: false
        }}
      />
      <Drawer.Screen
        name="Login"
        component={FirstScreenStack}
        options={{
          drawerIcon: () => <Icon name="sign-in" size={16} color={'black'} />,
          swipeEnabled: false
        }}
      />
      <Drawer.Screen
        name="Logout"
        component={LoginScreen}
        options={{
          drawerIcon: () => <Icon name="sign-out" size={16} color={'black'} />,
          title: 'Sign out',
        }}
      />
    </Drawer.Navigator>
  );
};

export const Colors = {
  primary: '#637aff',
  primaryDark: '#2759ff',
  primaryLite: '#637aff99',
  black: '#000',
  white: 'white',
  accent: '#112233',
  green: '#60c5a8',
  green2: '#039a83',
  light: '#EEEEEE',
  dark: '#333',
  gray: '#CCCCCC',
  red: '#ff2f68',
  lightRed: '#ff4f7e',
  darkRed: '#d9365e',
  purple: '#8f06e4',
  skyBlue: 'skyblue',
  yellow: '#f8c907',
  pink: '#ff4c98',
  gold: 'gold',
  line: '#282C35',
  gray: '#CCCCCC',
  darkGray: '#999999',

  darkOverlayColor: 'rgba(0, 0, 0, 0.4)',
  darkOverlayColor2: 'rgba(0, 0, 0, 0.8)',
  lightOverlayColor: 'rgba(255, 255, 255, 0.6)',
  primaryAlpha: 'rgba(99, 122, 255, 0.15)',
  redAlpha: 'rgba(255, 84, 84, 0.15)',
  greenAlpha: 'rgba(96, 197, 168, 0.15)',
  purpleAlpha: 'rgba(146, 6, 228, 0.15)',

  // bags background colors
  bag1Bg: '#ea7a72',
  bag2Bg: '#c2c5d1',
  bag3Bg: '#82a7c9',
  bag4Bg: '#d49d8f',
  bag5Bg: '#ccd9c6',
  bag6Bg: '#767676',
  bag7Bg: '#d1c8c3',
  bag8Bg: '#dca47f',
  bag9Bg: '#eb849c',
  bag10Bg: '#979dc1',
  bag11Bg: '#c7d3c0',
};
