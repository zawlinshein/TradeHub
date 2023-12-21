import MarketScreen from '@/screens/marketscreen/MarketScreen';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import React from 'react';
import { MD3Colors} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import PlusSvgIcon from '../assets/svgicons/plus-svgrepo-com.svg';
import { AddItemScreen } from '@/screens/additemscreen/AddItemScreen';

const Tab = createMaterialBottomTabNavigator();


function AppBottomNavigation() {
  return (
    <Tab.Navigator initialRouteName="Cats" labeled={false}>
      <Tab.Screen
        name="MarkerScreen"
        component={MarketScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color}) => (
            <Icon name="tag" color={MD3Colors.primary50} size={20} />
          ),
        }}
      />
      {/* <Tab.Screen
        name="Feed"
        component={MarketScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color}) => (
            <Icon source="cart" color={MD3Colors.error50} size={20} />
          ),
        }}
      /> */}
      <Tab.Screen
        name="CreateItemScreen"
        component={AddItemScreen}
        options={{
          tabBarLabel: 'Home',
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
