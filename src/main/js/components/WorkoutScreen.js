import React, {
  useEffect, useState, useCallback, useMemo
} from 'react';
import { StyleSheet, View } from 'react-native';
import { useKeepAwake } from 'expo-keep-awake';
import { EXERCISE_STATE, Interaction } from './Exercise';
import ExerciseDetails from './ExerciseDetails';
import PopupDialog from './reusable/PopupDialog';
import ProgressList from './reusable/ProgressList';

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
      setStepIndex(0);
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
    const mkStep = (t, es) => ({ title: t, state: es });

    if (exercise) {
      s.push(mkStep('Warm up', EXERCISE_STATE.WARM_UP));
      for (let i = 0; i < exercise.series; i++) {
        s.push(mkStep(`Serie #${i + 1}`, EXERCISE_STATE.EXERCISE));
        if (i + 1 < exercise.series) {
          s.push(mkStep('Chill', EXERCISE_STATE.PAUSE));
        } else {
          s.push(mkStep('Clean up', EXERCISE_STATE.CLEAN_UP));
        }
      }
    }
    return s;
  }, [exercise]);

  const nextStep = useCallback(() => setStepIndex((prev) => prev + 1), [setStepIndex]);

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
        <ProgressList
          elements={exercises}
          activeIndex={activeIndex}
        />
        <View style={styles.detailsContainer}>
          <ExerciseDetails exercise={exercise} />
        </View>
        <ProgressList
          elements={steps}
          activeIndex={stepIndex}
        />
      </View>
      <View style={styles.inputContainer}>
        <Interaction
          exercise={exercise}
          step={steps[stepIndex]}
          onDone={onExerciseDone}
          onStarted={onStarted}
          nextStep={nextStep}
        />
      </View>
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
