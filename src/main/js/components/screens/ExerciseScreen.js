import React, {useState} from 'react';
import {StyleSheet, Text, TouchableHighlight, View} from "react-native";
import STYLES from "../../constants/styles";

const Styles = StyleSheet.create({
  page: {
    flexDirection: 'column'
  }
});

const ExerciseScreen = ({route: {params: {exercise}}}) => {
  const [currentSeries, setCurrentSeries] = useState(0);
  const [countDown, setCountDown] = useState(exercise['pause']);
  const [active, setActive] = useState(false);

  const details = `${exercise['repeats']} repeats of ` +
    `${exercise['amount']} ${exercise['unit']} in ` +
    `${exercise['series']} series`;

  return (
    <View style={STYLES.screen}>
      <View style={Styles.page}>
        <Text style={STYLES.description}>"{exercise['description']}"</Text>
        <Text style={STYLES.detail}>{details}</Text>
        <TouchableHighlight
          key="startButton"
          onPress={() => setActive(true)}>
          <View style={STYLES.butt}>
            <Text style={STYLES.buttTxt}>START</Text>
          </View>
        </TouchableHighlight>
      </View>
    </View>
  );
}

export default ExerciseScreen
