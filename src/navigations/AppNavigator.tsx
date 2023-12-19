import MarketScreen from '@/screens/MarketScreen';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import React from 'react';
import {Icon, MD3Colors} from 'react-native-paper';

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
            <Icon source="tag" color={MD3Colors.primary50} size={20} />
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
    </Tab.Navigator>
  );
}

export default AppBottomNavigation;
