import React, {useEffect, useState} from 'react';
import {Text, Pressable, View} from "react-native";
import STYLES, {pressableStyle} from '../../constants/styles'
import {loadHome} from "../../data/firebase"

const HomeScreen = ({navigation}) => {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    loadHome(setWorkouts);
  }, []);

  return (
    <View style={STYLES.screen}>
      {Object.keys(workouts).map(title =>
        <Pressable
          key={title}
          onPress={() => navigation.navigate('Workout', {
            title,
            exercises: workouts[title]
          })}
          style={pressableStyle}
        >
          <View style={STYLES.butt}>
            <Text style={STYLES.buttTxt}>{title}</Text>
          </View>
        </Pressable>
      )}
    </View>
  )
};

export default HomeScreen
