import React, {
  useEffect, useState, useCallback, useMemo
} from 'react';
import { StyleSheet, View } from 'react-native';
import { useKeepAwake } from 'expo-keep-awake';
import Steps, { mkSteps } from './Steps';
import PopupDialog from './common/PopupDialog';
import Instruction from './Instruction';
import Overview from './Overview';

const WORKOUT_STATE = {
  INITIAL: 1,
  STARTED: 2,
  ENDED: 3
};

const WorkoutScreen = ({ navigation, route: { params: { exercises } } }) => {
  const [workoutState, setWorkoutState] = useState(WORKOUT_STATE.INITIAL);
  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);
  const [instruction, setInstruction] = useState({});
  const [exitDialogEvent, triggerExitDialog] = useState(null);
  const exercise = exercises.length > 0 ? exercises[exerciseIndex] : null;

  const onStarted = useCallback(() => setWorkoutState(WORKOUT_STATE.STARTED), []);

  const onExerciseDone = useCallback(() => {
    if (exerciseIndex >= exercises.length - 1) {
      setWorkoutState(WORKOUT_STATE.ENDED);
      // noinspection JSUnresolvedVariable
      setTimeout(navigation.goBack, 0);
    } else {
      setExerciseIndex((prevState) => prevState + 1);
      setStepIndex(0);
    }
  }, [exerciseIndex, exercises, navigation]);

  const beforeRemove = useCallback((ev) => {
    if (workoutState === WORKOUT_STATE.STARTED) {
      ev.preventDefault();
      triggerExitDialog(ev);
    }
  }, [workoutState]);

  useEffect(() => {
    return navigation.addListener('beforeRemove', beforeRemove);
  }, [navigation, beforeRemove]);

  const steps = useMemo(() => mkSteps(exercise), [exercise]);
  const nextStep = useCallback(() => setStepIndex((prev) => prev + 1), [setStepIndex]);

  useKeepAwake();

  if (!exercise) {
    return <View />;
  }

  return (
    <View style={styles.screen}>
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
      <View style={styles.overview}>
        <Overview
          exercises={exercises}
          exerciseIndex={exerciseIndex}
          steps={steps}
          stepIndex={stepIndex}
        />
      </View>
      <View style={styles.instructionContainer}>
        <Instruction instruction={instruction} />
      </View>
      <View style={styles.inputContainer}>
        <Steps
          exercise={exercise}
          step={steps[stepIndex]}
          onDone={onExerciseDone}
          onStarted={onStarted}
          nextStep={nextStep}
          setInstruction={setInstruction}
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
  overview: {
    flex: 6,
  },
  instructionContainer: {
    flex: 3
  },
  inputContainer: {
    flex: 8,
    padding: 5
  },
  statsContainer: {
    flex: 1
  }
});

export default WorkoutScreen;
