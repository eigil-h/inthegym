import React, { useEffect, useState } from 'react';
import {
  Text, Pressable, View, StyleSheet
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import loadHome from '../data/firebase';
import { noop } from '../common/fun';

const HomeScreen = ({ navigation, isEditMode }) => {
  const styles = createStyles(useTheme());
  const pressableStyle = pressable(useTheme());
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    loadHome('eigil', setWorkouts).then(noop);
  }, []);

  return (
    <View style={styles.screen}>
      {isEditMode && (
      <NewWorkout
        navigation={navigation}
        styles={styles}
        pressableStyle={pressableStyle}
      />
      )}
      {Object.keys(workouts).map((title) => (
        <Pressable
          key={title}
          onPress={() => navigation.navigate('Workout', {
            title,
            exercises: workouts[title]
          })}
          style={pressableStyle}
        >
          <View style={styles.butt}>
            <Text style={styles.buttTxt}>{title}</Text>
          </View>
        </Pressable>
      ))}
    </View>
  );
};

const NewWorkout = ({ navigation, styles, pressableStyle }) => (
  <Pressable
    key="newWO"
    onPress={() => navigation.navigate('NewWorkout')}
    style={pressableStyle}
  >
    <View style={[styles.butt, styles.newButt]}>
      <Text style={[styles.buttTxt, styles.newButtTxt]}>New Workout</Text>
    </View>
  </Pressable>
);

/*
 * STYLE
 */
const createStyles = ({ colors }) => {
  const styles = {
    screen: {
      flexDirection: 'row',
      flexWrap: 'wrap'
    },
    butt: {
      width: 100,
      height: 100,
      margin: 30,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.card
    },
    buttTxt: {
      color: colors.text,
      textAlign: 'center',
      fontSize: 18,
      fontFamily: 'serif'
    },
    newButt: {
      borderWidth: 1,
      borderStyle: 'dashed'
    },
    newButtTxt: {
      fontStyle: 'italic'
    }
  };

  return StyleSheet.create(styles);
};

const pressable = ({ colors }) => ({ pressed }) => {
  if (pressed) {
    return {
      backgroundColor: colors.background,
      shadowColor: colors.background,
      shadowOffset: {
        width: 0,
        height: 6,
      },
      shadowOpacity: 0.29,
      shadowRadius: 6.27,
      elevation: 10
    };
  }

  return {
    backgroundColor: 'transparent'
  };
};

export default HomeScreen;
