import React, { useCallback, useEffect, useState } from 'react';
import { Pressable, StyleSheet, View, Text } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import { Asset } from 'expo-asset';
import { noop, useInterval } from '../common/fun';
import PopupDialog from './gadgets/PopupDialog';
import Alert from '../../../../assets/alert.mp3';

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
    pause
  } = exercise;
  const { state: stepState } = step;

  const [count, setCount] = useState(null);
  const [isEndDialog, showEndDialog] = useState(false);
  const [soundObject, setSoundObject] = useState(null);
  const triggerEndDialog = useCallback(() => showEndDialog(true), []);
  const cancelHandler = useCallback(() => showEndDialog(false), []);

  const alert = useCallback(() => {
    const playAlert = async () => {
      const soundAsset = Asset.fromModule(Alert);
      await soundAsset.downloadAsync();

      const { sound } = await Audio.Sound.createAsync(soundAsset);
      setSoundObject(sound);

      await sound.playAsync();
    };

    playAlert().then(noop).catch();
  }, []);

  useEffect(() => {
    return soundObject ? () => {
      soundObject.unloadAsync();
    } : undefined;
  }, [soundObject]);

  useEffect(() => {
    setCount(stepState === EXERCISE_STATE.PAUSE ? pause
      : (stepState === EXERCISE_STATE.EXERCISE && execution.unit === 'seconds'
        ? execution.amount : null));
    showEndDialog(false);
  }, [step, stepState, pause, execution]);

  useEffect(() => {
    const instructionData = {};
    if (count !== null) {
      instructionData.count = `${Math.floor(count / 60)}:${`${count % 60}`.padStart(2, '0')}`;
      instructionData.countColor = count === 0 ? colors.notification : colors.text;
    }
    switch (stepState) {
      case EXERCISE_STATE.WARM_UP:
        instructionData.msg = 'Warmup! Press forward button when ready';
        break;
      case EXERCISE_STATE.EXERCISE:
        instructionData.msg = count === 0 ? 'Press forward button to continue'
          : `Do ${execution.amount} ${execution.unit} with ${load.amount} ${load.unit}`
          + `${count === null ? '. Press forward button after last repeat' : ''}`;
        break;
      case EXERCISE_STATE.PAUSE:
        instructionData.msg = count === 0 ? 'Press forward button to continue' : 'Chill until timer times out';
        break;
      case EXERCISE_STATE.CLEAN_UP:
        instructionData.msg = 'Now, please clean up! Press forward button when done';
        break;
      default:
    }
    setInstruction(instructionData);
  }, [colors, count, execution, exercise, load, setInstruction, stepState]);

  useInterval(() => {
    if (count) {
      setCount((prev) => {
        if (prev === 1) {
          alert();
        }
        return prev > 0 ? prev - 1 : 0;
      });
    }
  }, 1000);

  return (
    <>
      <PopupDialog
        isVisible={isEndDialog}
        title={stepState === EXERCISE_STATE.EXERCISE ? 'Abort?' : 'Continue already?'}
        message={stepState === EXERCISE_STATE.EXERCISE
          ? `Still ${count} seconds to go!` : `Still ${count} seconds to go!`}
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
    <Pressable 
      style={styles.fill}
      onPress={onPress}
    >
      <View style={styles.buttonWrapper}>
        <View style={styles.visualButton}>
          <View style={styles.iconWrapper}>
            <Ionicons
              name="play-skip-forward"
              style={styles.pressIcon}
            />
          </View>
        </View>
        <Text style={styles.label}>NEXT</Text>
      </View>
    </Pressable>
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
const createStyles = (theme) => {
  const styles = {
    fill: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: theme.colors.background
    },
    buttonWrapper: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    visualButton: {
      justifyContent: 'center',
      alignItems: 'center',
      width: 120,
      height: 120,
      borderRadius: 60,
      backgroundColor: theme.colors.primary
    },
    iconWrapper: {
      width: 120,
      height: 120,
      justifyContent: 'center',
      alignItems: 'center'
    },
    pressIcon: {
      color: '#FFFFFF',
      fontSize: 64,
      textAlign: 'center'
    },
    label: {
      marginTop: 16,
      color: theme.colors.text,
      fontSize: 16,
      fontWeight: '600',
      letterSpacing: 2
    }
  };

  return StyleSheet.create(styles);
};

export default Steps;
