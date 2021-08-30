import React, { useEffect, useState } from 'react';
import { Text, Pressable, View } from 'react-native';
import createStyles, { pressable } from '../styles/HomeScreen';
import loadHome from '../data/firebase';

const HomeScreen = ({ navigation }) => {
  const styles = createStyles();
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    loadHome(setWorkouts);
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
          style={pressable}
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
