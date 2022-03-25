import React, { useCallback, useEffect, useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useInterval } from '../common/fun';
import PopupDialog from './reusable/PopupDialog';

const EXERCISE_STATE = {
  WARM_UP: 1,
  EXERCISE: 2,
  PAUSE: 3,
  CLEAN_UP: 4
};

const Steps = ({
  exercise,
  step,
  onDone,
  onStarted,
  nextStep,
  setInstruction
}) => {
  const nextStepHandler = useCallback(() => {
    switch (step.state) {
      case EXERCISE_STATE.WARM_UP:
        onStarted();
        nextStep();
        break;
      case EXERCISE_STATE.EXERCISE:
      case EXERCISE_STATE.PAUSE:
        nextStep();
        break;
      case EXERCISE_STATE.CLEAN_UP:
        onDone();
        break;
      default:
    }
  }, [nextStep, onDone, onStarted, step]);

  return (
    <Step
      exercise={exercise}
      step={step}
      nextStep={nextStepHandler}
      setInstruction={setInstruction}
    />
  );
};

const Step = ({
  exercise,
  step,
  nextStep,
  setInstruction
}) => {
  const { colors } = useTheme();
  const {
    execution,
    load,
    pause,
    title
  } = exercise;
  const { state: stepState } = step;

  const [count, setCount] = useState(null);
  const [isEndDialog, showEndDialog] = useState(false);
  const triggerEndDialog = useCallback(() => showEndDialog(true), []);
  const cancelHandler = useCallback(() => showEndDialog(false), []);

  useEffect(() => {
    // eslint-disable-next-line no-nested-ternary
    const initialCount = () => {
      if (stepState === EXERCISE_STATE.PAUSE) return pause;
      if (stepState === EXERCISE_STATE.EXERCISE && execution.unit === 'seconds') return execution.amount;
      return null;
    };
    setCount(initialCount());
    showEndDialog(false);
  }, [step, stepState, pause, execution]);

  useEffect(() => {
    const instructionData = {
      countColor: stepState === EXERCISE_STATE.PAUSE ? colors.notification : colors.text
    };
    if (count !== null) {
      instructionData.count = `${new Date(count * 1000).toISOString().substr(15, 4)}`;
    }
    switch (stepState) {
      case EXERCISE_STATE.WARM_UP:
        instructionData.msg = `Please start with "${title}" warmup!`;
        break;
      case EXERCISE_STATE.EXERCISE:
        instructionData.msg = `Do ${execution.amount} ${execution.unit} with ${load.amount} ${load.unit}`;
        break;
      case EXERCISE_STATE.PAUSE:
        instructionData.msg = 'Chill until timer times out';
        break;
      case EXERCISE_STATE.CLEAN_UP:
        instructionData.msg = `Now, please clean up "${title}". Thanks!`;
        break;
      default:
    }
    setInstruction(instructionData);
  }, [colors, count, execution, exercise, load, setInstruction, stepState, title]);

  useInterval(() => {
    if (count) {
      setCount((prev) => (prev > 0 ? prev - 1 : 0));
    }
  }, 1000);

  return (
    <>
      <PopupDialog
        isVisible={isEndDialog}
        title={stepState === EXERCISE_STATE.EXERCISE ? 'Abort?' : 'Continue already?'}
        message={stepState === EXERCISE_STATE.EXERCISE ? `Still ${count} seconds to go!` : `Still ${count} seconds to go!`}
        onConfirm={nextStep}
        onCancel={cancelHandler}
      />
      <ForwardButton
        onPress={(count && count > 0) ? triggerEndDialog : nextStep}
      />
    </>
  );
};

const ForwardButton = ({ onPress }) => {
  const theme = useTheme();
  const { colors } = theme;
  const styles = createStyles(theme);

  return (
    <LinearGradient
      colors={[colors.background, colors.card, colors.card, colors.background]}
      locations={[0.0, 0.1, 0.9, 1.0]}
      style={styles.fill}
    >
      <Pressable
        onPress={onPress}
        style={pressableStyle}
      >
        {({ pressed }) => (
          <Ionicons
            name="arrow-forward"
            style={[styles.pressIcon, pressed ? styles.pressedIcon : null]}
          />
        )}
      </Pressable>
    </LinearGradient>
  );
};

export const mkSteps = (exercise) => {
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
};

/*
 * STYLE
 */
const createStyles = ({ colors }) => {
  const styles = {
    pressIcon: {
      color: colors.background,
      fontSize: 156,
      textAlign: 'center'
    },
    pressedIcon: {
      color: colors.text
    },
    fill: {
      ...StyleSheet.absoluteFillObject
    },
    description: {
      padding: 10,
      fontSize: 18,
      fontStyle: 'italic'
    },
    series: {
      fontSize: 24,
      color: colors.notification
    },
    countDown: {
      fontSize: 24,
      color: colors.primary
    },
    countUp: {
      position: 'absolute',
      fontSize: 24,
      color: colors.background,
      marginTop: 26,
      marginLeft: 45
    }
  };

  return StyleSheet.create(styles);
};

const pressableStyle = () => [{
  flex: 1,
  justifyContent: 'center'
}];

export default Steps;
