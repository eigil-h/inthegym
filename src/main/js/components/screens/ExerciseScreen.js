import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableHighlight, View} from "react-native";
import STYLES from "../../constants/styles";
import {useInterval} from "../common/fun";

const Styles = StyleSheet.create({
  page: {
    flexDirection: 'column'
  }
});

const ExerciseScreen = ({route: {params: {exercise}}, navigation}) => {
  const details = `${exercise['repeats']} repeats of ` +
    `${exercise['amount']} ${exercise['unit']} in ` +
    `${exercise['series']} series`;

  return (
    <View style={STYLES.screen}>
      <View style={Styles.page}>
        <Text style={STYLES.description}>"{exercise['description']}"</Text>
        <Text style={STYLES.detail}>{details}</Text>
        <Content
          exercise={exercise}
          navigation={navigation}
        />
      </View>
    </View>
  );
}

const Content = ({exercise, navigation}) => {
  const [currentSeries, setCurrentSeries] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const isStarting = currentSeries === 0;
  const isLast = currentSeries === exercise['series'];
  const isEnded = currentSeries > exercise['series'];

  const start = () => setCurrentSeries(1);
  const triggerCountDown = () => {
    setCurrentSeries((prev) => prev + 1);
    setIsPaused(true);
  };
  const endCountDown = () => setIsPaused(false);

  useEffect(() => {
    if(isEnded) {
      navigation.goBack();
    }
  }, [isEnded]);

  if (isStarting) {
    return (
      <TouchableHighlight
        key="startButton"
        onPress={start}
        onLongPress={start}>
        <View style={STYLES.butt}>
          <Text style={STYLES.buttTxt}>START</Text>
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
  }

  return (
    <View style={STYLES.exercise}>
      <Text style={STYLES.series}>
        Serie #{currentSeries} in progress...
      </Text>
      <TouchableHighlight
        key="pauseButton"
        onLongPress={triggerCountDown}>
        <View style={STYLES.butt}>
          <Text style={STYLES.buttTxt}>{isLast ? 'DONE' : 'PAUSE'}</Text>
        </View>
      </TouchableHighlight></View>
  );
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
      onLongPress={endCountDown}>
      <View style={STYLES.butt}>
        <Text style={STYLES.buttTxtLarge}>{count}</Text>
      </View>
    </TouchableHighlight>
  );
};

export default ExerciseScreen
