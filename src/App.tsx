import 'react-native-gesture-handler';

import {CreateDrawer} from './navigations/AppNavigator';
import {NavigationContainer} from '@react-navigation/native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import React from 'react';

const queryClient = new QueryClient();

// responsible for showing image in the side bar at the top

const App = () => {
  return (
    <NavigationContainer>
      <QueryClientProvider client={queryClient}>
        <CreateDrawer />
      </QueryClientProvider>
    </NavigationContainer>
  );
};

export default App;
