import React, {useState} from 'react';
import {Text, TouchableHighlight, View} from "react-native";
import STYLES from "../../constants/styles";

const ExerciseScreen = (props) => {
  const [currentSeries, setCurrentSeries] = useState(0);
  const [countDown, setCountDown] = useState(props.route.params.exercise['pause']);
  const [active, setActive] = useState(false);

  return (
    <View style={STYLES.page}>
      <View style={STYLES.main}>
        <Text style={STYLES.description}>"{props.route.params.exercise['description']}"</Text>
        <Text style={STYLES.detail}>{props.route.params.exercise['repeats']} repeats of {props.route.params.exercise['amount']} {props.route.params.exercise['unit']} in {props.route.params.exercise['series']} series</Text>
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
