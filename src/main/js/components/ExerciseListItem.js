import React from 'react';
import { Text, View } from 'react-native';
import createStyles from '../styles/ExerciseListItem';

const ExerciseListItem = ({ index, activeIndex, exercise }) => {
  const styles = createStyles();

  // eslint-disable-next-line no-nested-ternary
  const statusStyle = index === activeIndex
    ? styles.present : index < activeIndex
      ? styles.past : styles.future;

  return (
    <View style={[styles.wrapper, statusStyle]}>
      <Text>
        {exercise.title}
      </Text>
    </View>
  );
};

export default ExerciseListItem;
