import React, {
  useEffect, useState, useCallback, useMemo
} from 'react';
import { StyleSheet, View } from 'react-native';
import { useKeepAwake } from 'expo-keep-awake';
import Steps, { mkSteps } from './Steps';
import ExerciseDetails from './ExerciseDetails';
import PopupDialog from './reusable/PopupDialog';
import ProgressList from './reusable/ProgressList';
import Instruction from './Instruction';

const WORKOUT_STATE = {
  INITIAL: 1,
  STARTED: 2,
  ENDED: 3
};

const WorkoutScreen = ({ navigation, route: { params: { exercises } } }) => {
  const [workoutState, setWorkoutState] = useState(WORKOUT_STATE.INITIAL);
  const [activeIndex, setActiveIndex] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);
  const [instruction, setInstruction] = useState({});
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
      <View style={styles.infoContainer}>
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
  infoContainer: {
    flex: 10,
    flexDirection: 'row',
    padding: 5
  },
  instructionContainer: {
    flex: 2
  },
  detailsContainer: {
    flex: 1,
    flexDirection: 'column'
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
