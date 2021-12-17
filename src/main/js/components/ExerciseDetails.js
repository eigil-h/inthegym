import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const ExerciseDetails = ({ exercise }) => (
  <View style={styles.wrapper}>
    <Amounts exercise={exercise} />
    <Units exercise={exercise} />
  </View>
);

const Amounts = ({ exercise }) => (
  <View style={styles.amounts}>
    <AmountsText text={exercise.load.amount} />
    <AmountsText text={exercise.execution.amount} />
    <AmountsText text={exercise.series} />
    <AmountsText text={exercise.pause} />
  </View>
);

const Units = ({ exercise }) => (
  <View style={styles.units}>
    <UnitsText text={exercise.load.unit} />
    <UnitsText text={exercise.execution.unit} />
    <UnitsText text="series" />
    <UnitsText text="pause" />
  </View>
);

const AmountsText = ({ text }) => (
  <Text style={styles.amountsText}>{text}</Text>
);

const UnitsText = ({ text }) => (
  <Text style={styles.unitsText}>{text}</Text>
);

/*
 * STYLE
 */
const blackTransparent = '#00000050';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'row'
  },
  amounts: {
    flex: 1,
    flexDirection: 'column',
    padding: 5,
    justifyContent: 'space-evenly'
  },
  units: {
    flex: 1,
    flexDirection: 'column',
    padding: 5,
    justifyContent: 'space-evenly',
    borderLeftWidth: StyleSheet.hairlineWidth,
    borderColor: blackTransparent
  },
  amountsText: {
    fontFamily: 'sans-serif',
    fontSize: 16,
    textAlign: 'right'
  },
  unitsText: {
    fontFamily: 'sans-serif',
    fontSize: 16
  }
});

export default ExerciseDetails;
