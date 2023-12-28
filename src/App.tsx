import 'react-native-gesture-handler';
import {store} from './app/store';
import {Provider} from 'react-redux';
import {CreateDrawer, FirstScreenStack} from './navigations/AppNavigator';
import {NavigationContainer} from '@react-navigation/native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import React from 'react';
import { StatusBar } from 'react-native';

const queryClient = new QueryClient();

// responsible for showing image in the side bar at the top

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar
        barStyle={'dark-content'}
        translucent={true}
        backgroundColor={'rgba(0,0,0,0)'}
      />
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <CreateDrawer />
        </QueryClientProvider>
      </Provider>
    </NavigationContainer>
  );
};

export default App;
