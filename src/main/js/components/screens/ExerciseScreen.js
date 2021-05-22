import React, {useEffect, useState} from 'react';
import {Pressable, StyleSheet, Text, View} from "react-native";
import STYLES, {pressableStyle} from "../../constants/styles";
import {useInterval, noop} from "../common/fun";

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

  const begin = () => setCurrentSeries(1);
  const triggerCountDown = () => {
    setCurrentSeries((prev) => prev + 1);
    setIsPaused(true);
  };
  const endCountDown = () => setIsPaused(false);

  if (isStarting) {
    return (
      <Pressable
        onPress={begin}
        onLongPress={begin}
        style={pressableStyle}
      >
        <View style={STYLES.butt}>
          <Text style={STYLES.buttTxt}>START</Text>
        </View>
      </Pressable>
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
      <Pressable
        onPress={isLast ? navigation.goBack : noop}
        onLongPress={isLast ? noop : triggerCountDown}
        style={pressableStyle}
      >
        <View style={STYLES.butt}>
          <Text style={STYLES.buttTxt}>{isLast ? 'DONE' : 'PAUSE'}</Text>
        </View>
      </Pressable></View>
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
    <Pressable
      onLongPress={endCountDown}
      style={pressableStyle}
    >
      <View style={STYLES.butt}>
        <Text style={STYLES.buttTxtLarge}>{count}</Text>
      </View>
    </Pressable>
  );
};

export default ExerciseScreen
