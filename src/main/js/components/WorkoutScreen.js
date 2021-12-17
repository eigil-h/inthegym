import React, { useEffect, useState, useCallback } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useKeepAwake } from 'expo-keep-awake';
import ExerciseListItem from './ExerciseListItem';
import ExerciseDetails from './ExerciseDetails';
import Exercise from './Exercise';
import PopupDialog from './reusable/PopupDialog';

const WORKOUT_STATE = {
  INITIAL: 1,
  STARTED: 2,
  ENDED: 3
};

const WorkoutScreen = ({ navigation, route: { params: { exercises } } }) => {
  const [workoutState, setWorkoutState] = useState(WORKOUT_STATE.INITIAL);
  const [activeIndex, setActiveIndex] = useState(0);
  const [exitDialogEvent, triggerExitDialog] = useState(null);
  const exercise = exercises.length > 0 ? exercises[activeIndex] : null;

  const onStarted = useCallback(() => setWorkoutState(WORKOUT_STATE.STARTED), []);

  const onExerciseDone = useCallback(() => {
    if (activeIndex >= exercises.length - 1) {
      setWorkoutState(WORKOUT_STATE.ENDED);
      // noinspection JSUnresolvedVariable
      setTimeout(navigation.goBack, 0);
    } else {
      setActiveIndex((prevState) => prevState + 1);
    }
  }, [activeIndex, exercises, navigation]);

  const beforeRemove = useCallback((ev) => {
    if (workoutState === WORKOUT_STATE.STARTED) {
      ev.preventDefault();
      triggerExitDialog(ev);
    }
  }, [workoutState]);

  useEffect(() => {
    return navigation.addListener('beforeRemove', beforeRemove);
  }, [navigation, beforeRemove]);

  useKeepAwake();

  if (!exercise) {
    return <View />;
  }

  return (
    <View style={styles.screen}>
      <View style={styles.mainContainer}>
        <PopupDialog
          isVisible={exitDialogEvent !== null}
          title="Exit workout?"
          message="You have not completed the workout. Progress will be lost!"
          onConfirm={() => {
            navigation.dispatch(exitDialogEvent.data.action);
          }}
          onCancel={() => {
            triggerExitDialog(null);
          }}
        />
        <Exercise
          key={activeIndex}
          exercise={exercise}
          onDone={onExerciseDone}
          onStarted={onStarted}
        />
      </View>
      <View style={styles.sideContainer}>
        <View style={styles.listContainer}>
          <FlatList
            data={exercises}
            extraData={activeIndex}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.title}
            renderItem={({ item, index }) => (
              <ExerciseListItem
                index={index}
                activeIndex={activeIndex}
                exercise={item}
              />
            )}
          />
        </View>
        <View style={styles.detailsContainer}>
          <ExerciseDetails exercise={exercise} />
        </View>
      </View>
    </View>
  );
};

/*
 * STYLE
 */
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    flexDirection: 'column'
  },
  mainContainer: {
    flex: 27
  },
  sideContainer: {
    flex: 23,
    flexDirection: 'row'
  },
  listContainer: {
    flex: 27,
    flexDirection: 'column',
    paddingLeft: 10
  },
  detailsContainer: {
    flex: 23,
    flexDirection: 'column'
  }
});

export default WorkoutScreen;
