import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import NewsApp from '../../components/NewsApp';
import NewsDetail from '../../components/NewsDetail';
import CameraScreen from '../../components/CameraAcess';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={NewsApp} options={{ title: 'News Headlines' }} />
      <Stack.Screen name="NewsDetail" component={NewsDetail} options={{ title: 'News Details' }} />
      <Stack.Screen name="CameraScreen" component={CameraScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
