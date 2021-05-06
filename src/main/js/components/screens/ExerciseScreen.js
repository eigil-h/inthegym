import React, {useState} from 'react';
import {Text, TouchableHighlight, View} from "react-native";
import STYLES from "../../constants/styles";

const ExerciseScreen = ({route: {params: {exercise}}}) => {
  const [currentSeries, setCurrentSeries] = useState(0);
  const [countDown, setCountDown] = useState(exercise['pause']);
  const [active, setActive] = useState(false);

  return (
    <View style={STYLES.page}>
      <View style={STYLES.main}>
        <Text style={STYLES.description}>"{exercise['description']}"</Text>
        <Text style={STYLES.detail}>{exercise['repeats']} repeats of
          {exercise['amount']} {exercise['unit']} in {exercise['series']} series</Text>
        <TouchableHighlight key="startButton" onPress={() => setActive(true)}>
          <View style={STYLES.butt}>
            <Text style={STYLES.buttTxt}>START</Text>
          </View>
        </TouchableHighlight>
      </View>
    </View>
  );
}

export default ExerciseScreen
