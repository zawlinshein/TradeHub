import MarketScreen from '@/screens/marketscreen/MarketScreen';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import React from 'react';
import {MD3Colors} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import PlusSvgIcon from '../assets/svgicons/plus-svgrepo-com.svg';
import {AddItemScreen} from '@/screens/additemscreen/AddItemScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RegisterScreen} from '@/screens/RegisterScreen/RegisterScreen';
import {createDrawerNavigator} from '@react-navigation/drawer';
import MyProfileScreen from '@/screens/myprofilescreen/MyProfileScreen';
import {CustomSidebarMenu} from '@/components/CustomeSideBarMenu';
import LoginScreen from '@/screens/loginscreen/LoginScreen';
import { NavigationContainer } from '@react-navigation/native';

const Drawer = createDrawerNavigator();

const Stack = createNativeStackNavigator();

const Tab = createMaterialBottomTabNavigator();

function AppBottomNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{tabBarColor: 'black'}}
      initialRouteName="Cats"
      labeled={false}>
      <Tab.Screen
        name="MarkerScreen"
        component={MarketScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color}) => (
            <Icon name="shopping-cart" color={MD3Colors.primary50} size={20} />
          ),
        }}
      />
      <Tab.Screen
        name="CreateItemScreen"
        component={AddItemScreen}
        options={{
          tabBarLabel: 'Add item',
          tabBarIcon: ({color}) => (
            <PlusSvgIcon
              width={30}
              height={30}
              color={MD3Colors.primary50}
              fill={MD3Colors.primary50}
            />
          ),
        }}
      />
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
