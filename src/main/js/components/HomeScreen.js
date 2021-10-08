import React, { useEffect, useState } from 'react';
import { Text, Pressable, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import createStyles, { pressable } from '../styles/HomeScreen';
import loadHome from '../data/firebase';

const HomeScreen = ({ navigation }) => {
  const styles = createStyles(useTheme());
  const pressableStyle = pressable(useTheme());
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    loadHome('eigil', setWorkouts);
  }, []);

  return (
    <View style={styles.screen}>
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

export default HomeScreen;
