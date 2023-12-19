import 'react-native-gesture-handler';

import AppBottomNavigation from './navigations/AppNavigator';
import {NavigationContainer} from '@react-navigation/native';
import MarketScreen from './screens/MarketScreen';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RegisterScreen } from 'screens/RegisterScreen';

const Drawer = createDrawerNavigator()

const queryClient = new QueryClient()

const App = () => {
  return (
    <NavigationContainer>
      <QueryClientProvider client={queryClient}>
        <Drawer.Navigator screenOptions={{headerShown: false}} >
          <Drawer.Screen name="Home" component={AppBottomNavigation} options={{swipeEnabled: false}} />
          <Drawer.Screen name="Register" component={RegisterScreen} />
        </Drawer.Navigator>
        {/* <AppBottomNavigation /> */}
      </QueryClientProvider>
    </NavigationContainer>
  );
};

export default App;
