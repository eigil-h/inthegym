import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableHighlight, View} from "react-native";
import STYLES from "../../constants/styles";
import {useInterval} from "../common/fun";

const Styles = StyleSheet.create({
  page: {
    flexDirection: 'column'
  }
});

const ExerciseScreen = ({route: {params: {exercise}}}) => {
  const details = `${exercise['repeats']} repeats of ` +
    `${exercise['amount']} ${exercise['unit']} in ` +
    `${exercise['series']} series`;

  return (
    <View style={STYLES.screen}>
      <View style={Styles.page}>
        <Text style={STYLES.description}>"{exercise['description']}"</Text>
        <Text style={STYLES.detail}>{details}</Text>
        <Content exercise={exercise}/>
      </View>
    </View>
  );
}

const Content = ({exercise}) => {
  const [currentSeries, setCurrentSeries] = useState(0);
  const [isPaused, setIsPaused] = useState(true);

  const isStarting = currentSeries === 0;
  const isEnded = currentSeries > exercise['series'];

  const triggerCountDown = () => {
    setCurrentSeries((prev) => prev + 1);
    setIsPaused(true);
  };
  const endCountDown = () => setIsPaused(false);

  if (isStarting) {
    return (
      <TouchableHighlight
        key="startButton"
        onPress={triggerCountDown}>
        <View style={STYLES.butt}>
          <Text style={STYLES.buttTxt}>START</Text>
        </View>
      </TouchableHighlight>
    );
  }

  if (isEnded) {
    return (
      <TouchableHighlight
        key="nextButton"
        onPress={() => {
        }}>
        <View style={STYLES.butt}>
          <Text style={STYLES.buttTxt}>NEXT</Text>
        </View>
      </TouchableHighlight>
    );
  }

  if (isPaused) {
    return (
      <View style={STYLES.exercise}>
        <Text style={STYLES.countDown}>
          Serie #{currentSeries} coming up...
        </Text>
        <CountDown
          from={exercise['pause']}
          endCountDown={endCountDown}
        />
      </View>
    );
  } else {
    return (
      <View style={STYLES.exercise}>
        <Text style={STYLES.series}>
          Serie #{currentSeries} in progress...
        </Text>
        <TouchableHighlight
          key="pauseButton"
          onPress={triggerCountDown}>
          <View style={STYLES.butt}>
            <Text style={STYLES.buttTxt}>PAUSE</Text>
          </View>
        </TouchableHighlight></View>
    );
  }
};

const CountDown = ({from, endCountDown}) => {
  const [count, setCount] = useState(from);

  useInterval(() => {
    setCount((prev) => prev - 1);
  }, 1000);

  useEffect(() => {
    if (count === 0) {
      endCountDown();
    }
  }, [count]);

  return (
    <TouchableHighlight
      key="countDownButton"
      onPress={endCountDown}>
      <View style={STYLES.butt}>
        <Text style={STYLES.buttTxtLarge}>{count}</Text>
      </View>
    </TouchableHighlight>
  );
};

export default ExerciseScreen
