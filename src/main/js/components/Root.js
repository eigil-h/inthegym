import 'react-native-gesture-handler';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import WorkoutScreen from './WorkoutScreen';
import SwitchButton from './gadgets/SwitchButton';
import LogoutButton from './gadgets/LogoutButton';
import EditWorkoutScreen from './EditWorkoutScreen';

const { Navigator, Screen } = createStackNavigator();

const appTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#4fa'
  }
};

const Root = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const toggleSwitch = () => setIsEditMode((previousState) => !previousState);
  const styles = createStyles();

  return (
    <NavigationContainer theme={appTheme}>
      <Navigator
        screenOptions={{
          headerStyle: { elevation: 0 },
          cardStyle: { backgroundColor: appTheme.colors.background }
        }}
      >
        <Screen
          name="Home"
          options={{
            title: 'InTheGym',
            headerRight: () => (
              <View style={styles.headerRightWrapper}>
                <LogoutButton />
                <SwitchButton
                  labels={['Use', 'Edit']}
                  isEnabled={isEditMode}
                  onToggleSwitch={toggleSwitch}
                />
              </View>
            ),
            ...getScreenHeaderStyles(appTheme)
          }}
        >
          {(props) => (
            <HomeScreen
              navigation={props.navigation}
              isEditMode={isEditMode}
            />
          )}
        </Screen>
        <Screen
          name="Workout"
          component={WorkoutScreen}
          options={({ route }) => ({
            title: `${route.params.title}`,
            ...getScreenHeaderStyles(appTheme)
          })}
        />
        <Screen
          name="EditWorkout"
          component={EditWorkoutScreen}
          options={({ route }) => ({
            title: `${route.params.title}`,
            ...getScreenHeaderStyles(appTheme)
          })}
        />
      </Navigator>
    </NavigationContainer>
  );
};

/*
 * STYLE
 */
const createStyles = () => {
  return StyleSheet.create({
    // eslint-disable-next-line react-native/no-unused-styles
    headerRightWrapper: {
      flexDirection: 'row',
      alignItems: 'center'
    }
  });
};

const getScreenHeaderStyles = ({ colors }) => ({
  headerStyle: {
    backgroundColor: colors.background
  },
  headerTintColor: colors.text,
  headerTitleStyle: {
    fontFamily: 'serif',
    fontWeight: '400'
  }
});

export default Root;
