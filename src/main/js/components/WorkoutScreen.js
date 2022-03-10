import React, {useEffect, useState, useCallback, useMemo} from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useKeepAwake } from 'expo-keep-awake';
import ExerciseDetails from './ExerciseDetails';
import ProgressItem, { PROGRESS_STATE } from './reusable/ProgressItem';
import PopupDialog from './reusable/PopupDialog';

const WORKOUT_STATE = {
  INITIAL: 1,
  STARTED: 2,
  ENDED: 3
};

const WorkoutScreen = ({ navigation, route: { params: { exercises } } }) => {
  const [workoutState, setWorkoutState] = useState(WORKOUT_STATE.INITIAL);
  const [activeIndex, setActiveIndex] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);
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

  const steps = useMemo(() => {
    const s = [];
    let id = 0;

    if (exercise) {
      s.push({ id: `${id++}`, title: 'Warm up' });
      for (let i = 0; i < exercise.series; i++) {
        s.push({ id: `${id++}`, title: `Serie #${i + 1}` });
        s.push({ id: `${id++}`, title: i + 1 < exercise.series ? 'Chill' : 'Clean up' });
      }
    }
    return s;
  }, [exercise]);

  const progressStateForIndex = useCallback((index, currentIndex) =>
  // eslint-disable-next-line no-nested-ternary,implicit-arrow-linebreak
    (index === currentIndex
      ? PROGRESS_STATE.PRESENT : index < currentIndex
        ? PROGRESS_STATE.PAST : PROGRESS_STATE.FUTURE),
  []);

  useKeepAwake();

  if (!exercise) {
    return <View />;
  }

  return (
    <View style={styles.screen}>
      <View style={styles.infoContainer}>
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
        <View style={styles.listContainer}>
          <FlatList
            data={exercises}
            extraData={activeIndex}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.title}
            renderItem={({ item, index }) => (
              <ProgressItem
                title={item.title}
                progressState={progressStateForIndex(index, activeIndex)}
              />
            )}
          />
        </View>
        <View style={styles.detailsContainer}>
          <ExerciseDetails exercise={exercise} />
        </View>
        <View style={styles.listContainer}>
          <FlatList
            data={steps}
            extraData={stepIndex}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            renderItem={({ item, index }) => (
              <ProgressItem
                title={item.title}
                progressState={progressStateForIndex(index, stepIndex)}
              />
            )}
          />
        </View>
      </View>
      <View style={styles.inputContainer} />
      <View style={styles.statsContainer} />
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
  infoContainer: {
    flex: 10,
    flexDirection: 'row',
    padding: 5
  },
  listContainer: {
    flex: 1,
    flexDirection: 'column'
  },
  detailsContainer: {
    flex: 1,
    flexDirection: 'column'
  },
  inputContainer: {
    flex: 10,
    padding: 5
  },
  statsContainer: {
    flex: 1,
    borderTopWidth: 1
  }
});

export default WorkoutScreen;
