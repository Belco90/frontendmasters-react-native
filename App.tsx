import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './src/screens/Home';
import ColorPalette from './src/screens/ColorPalette';
import { RootStackParamList } from './src/models';

const RootStack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName="home">
        <RootStack.Screen
          name="home"
          component={Home}
          options={{ title: '🏡 Home' }}
        />
        <RootStack.Screen
          name="color-palette"
          component={ColorPalette}
          options={({ route }) => ({ title: route.params.name })}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default App;
