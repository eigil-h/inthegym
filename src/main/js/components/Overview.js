import React from 'react';
import { StyleSheet, View } from 'react-native';
import ProgressList, { PROGRESS_TYPE } from './ProgressList';
import ExerciseDetails from './ExerciseDetails';

const Overview = ({
  exercises,
  exerciseIndex,
  steps,
  stepIndex
}) => {
  const styles = createStyles();

  return (
    <View style={styles.container}>
      <ProgressList
        progressType={PROGRESS_TYPE.EXERCISE}
        elements={exercises}
        activeIndex={exerciseIndex}
      />
      <ExerciseDetails exercise={exercises[exerciseIndex]} />
      <ProgressList
        progressType={PROGRESS_TYPE.STEP}
        elements={steps}
        activeIndex={stepIndex}
      />
    </View>
  );
};

/*
 * STYLE
 */
const createStyles = () => {
  const styles = {
    container: {
      flex: 1,
      flexDirection: 'row',
      padding: 5
    }
  };

  return StyleSheet.create(styles);
};

export default Overview;
