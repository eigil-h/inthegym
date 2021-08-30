import React from 'react';
import { Text, View } from 'react-native';
import styles from '../styles/ExerciseDetails';

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

export default ExerciseDetails;
