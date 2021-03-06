import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './src/main/js/components/screens/HomeScreen'
import WorkoutScreen from './src/main/js/components/screens/WorkoutScreen'
import ExerciseScreen from './src/main/js/components/screens/ExerciseScreen'
import STYLES from "./src/main/js/constants/styles";

const Stack = createStackNavigator();

// noinspection JSUnusedGlobalSymbols
export default function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home"
                        component={HomeScreen}
                        options={{
                          title: "InTheGym",
                          headerStyle: STYLES.navbar,
                          headerTintColor: '#f00',
                          headerTitleStyle: {
                            fontFamily: 'serif',
                          }
                        }}/>
          <Stack.Screen name="Workout"
                        component={WorkoutScreen}
                        options={({route}) => ({
                          title: `${route.params.title} workout`,
                          headerStyle: STYLES.navbar,
                          headerTintColor: '#f00',
                          headerTitleStyle: {
                            fontFamily: 'serif',
                          }
                        })}/>
          <Stack.Screen name="Exercise"
                        component={ExerciseScreen}
                        options={({route}) => ({
                          title: `${route.params.title} exercise`,
                          headerStyle: STYLES.navbar,
                          headerTintColor: '#f00',
                          headerTitleStyle: {
                            fontFamily: 'serif',
                          }
                        })}/>
        </Stack.Navigator>
      </NavigationContainer>
  );
}
