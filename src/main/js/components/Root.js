import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, View, useColorScheme } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import WorkoutScreen from './WorkoutScreen';
import SwitchButton from './gadgets/SwitchButton';
import LogoutButton from './gadgets/LogoutButton';
import EditWorkoutScreen from './EditWorkoutScreen';
import createTheme from '../theme';

const { Navigator, Screen } = createStackNavigator();

const Root = () => {
  const colorScheme = useColorScheme();
  const [isEditMode, setIsEditMode] = useState(false);
  const toggleSwitch = () => setIsEditMode((previousState) => !previousState);
  
  // Create theme based on system color scheme
  const theme = createTheme(colorScheme === 'dark');
  const styles = createStyles(theme);

  return (
    <NavigationContainer theme={theme}>
      <Navigator
        screenOptions={{
          headerStyle: { elevation: 0 },
          cardStyle: { backgroundColor: theme.colors.background }
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
            ...getScreenHeaderStyles(theme)
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
            ...getScreenHeaderStyles(theme)
          })}
        />
        <Screen
          name="EditWorkout"
          component={EditWorkoutScreen}
          options={({ route }) => ({
            title: `${route.params.title}`,
            ...getScreenHeaderStyles(theme)
          })}
        />
      </Navigator>
    </NavigationContainer>
  );
};

const createStyles = (theme) => StyleSheet.create({
  headerRightWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: theme.spacing.md
  }
});

const getScreenHeaderStyles = (theme) => ({
  headerStyle: {
    backgroundColor: theme.colors.background,
    elevation: 0,
    shadowOpacity: 0
  },
  headerTintColor: theme.colors.text.primary,
  headerTitleStyle: {
    fontFamily: theme.typography.families.heading,
    fontSize: theme.typography.sizes.lg,
    fontWeight: theme.typography.weights.semibold
  }
});

export default Root;
