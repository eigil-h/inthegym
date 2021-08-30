import 'react-native-gesture-handler';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import getScreenHeaderStyles from '../styles/Root';
import WorkoutScreen from './WorkoutScreen';

const { Navigator, Screen } = createStackNavigator();

const appTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#4fa'
  }
};

const Root = () => (
  <NavigationContainer theme={appTheme}>
    <Navigator
      screenOptions={{
        headerStyle: { elevation: 0 },
        cardStyle: { backgroundColor: appTheme.colors.background }
      }}
    >
      <Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'InTheGym',
          ...getScreenHeaderStyles(appTheme)
        }}
      />
      <Screen
        name="Workout"
        component={WorkoutScreen}
        options={({ route }) => ({
          title: `${route.params.title}`,
          ...getScreenHeaderStyles(appTheme)
        })}
      />
    </Navigator>
  </NavigationContainer>
);

export default Root;
