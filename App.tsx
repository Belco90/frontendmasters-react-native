import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './src/screens/Home';
import ColorPalette from './src/screens/ColorPalette';
import ColorPaletteModal from './src/screens/ColorsPaletteModal';
import { MainStackParamList, RootStackParamList } from './src/models';

const RootStack = createStackNavigator<RootStackParamList>();
const MainStack = createStackNavigator<MainStackParamList>();

const MainStackScreen: React.FC = () => {
  return (
    <MainStack.Navigator initialRouteName="Home">
      <MainStack.Screen
        name="Home"
        component={Home}
        options={{ title: '🏡 Home' }}
      />
      <MainStack.Screen
        name="ColorsPaletteDetails"
        component={ColorPalette}
        options={({ route }) => ({ title: route.params.name })}
      />
    </MainStack.Navigator>
  );
};

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator mode="modal">
        <RootStack.Screen
          name="Main"
          component={MainStackScreen}
          options={{ headerShown: false }}
        />
        <RootStack.Screen
          name="NewColorPalette"
          component={ColorPaletteModal}
          options={{ title: 'New color scheme' }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default App;
