import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import ProgressList, { PROGRESS_TYPE } from './ProgressList';

const Overview = ({
  exercises,
  exerciseIndex,
  steps,
  stepIndex
}) => {
  const styles = createStyles();
  const ex = exercises[exerciseIndex];

  return (
    <View style={styles.container}>
      <View style={styles.progress}>
        <ProgressList
          progressType={PROGRESS_TYPE.EXERCISE}
          elements={exercises}
          activeIndex={exerciseIndex}
        />
        <ProgressList
          progressType={PROGRESS_TYPE.STEP}
          elements={steps}
          activeIndex={stepIndex}
        />
      </View>
      <View style={styles.description}>
        <View style={styles.details}>
          <Text style={styles.detailsText}>
            {/* eslint-disable-next-line max-len */}
            { `${ex.load.amount} ${ex.load.unit} | ${ex.execution.amount} ${ex.execution.unit} | ${ex.series} set | ${ex.pause}s chill`}
          </Text>
        </View>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Show description</Text>
        </View>
      </View>
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
      flexDirection: 'column'
    },
    progress: {
      flex: 2,
      flexDirection: 'row'
    },
    description: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      marginHorizontal: 7
    },
    details: {
      flex: 4
    },
    detailsText: {
      fontFamily: 'serif',
      fontSize: 14
    },
    button: {
      flex: 1
    },
    buttonText: {
      fontFamily: 'sans-serif',
      fontSize: 16,
      textAlign: 'center',
      borderWidth: 1
    }
  };

  return StyleSheet.create(styles);
};

export default Overview;
