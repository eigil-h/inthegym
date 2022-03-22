import React, { useCallback, useEffect, useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useInterval } from '../common/fun';
import PopupDialog from './reusable/PopupDialog';

export const EXERCISE_STATE = {
  WARM_UP: 1,
  EXERCISE: 2,
  PAUSE: 3,
  CLEAN_UP: 4
};

const Interaction = ({
  exercise,
  step,
  onDone,
  onStarted,
  nextStep
}) => {
  const theme = useTheme();
  const { colors } = theme;
  const styles = createStyles(theme);

  const forState = useCallback(() => {
    switch (step.state) {
      case EXERCISE_STATE.WARM_UP:
        return (
          <ForwardButton
            onPress={() => {
              onStarted();
              nextStep();
            }}
            styles={styles}
          />
        );
      case EXERCISE_STATE.EXERCISE:
        return (
          <InProgress
            execution={exercise.execution}
            endFun={nextStep}
            styles={styles}
          />
        );
      case EXERCISE_STATE.PAUSE:
        return (
          <CoolDown
            from={exercise.pause}
            endCoolDown={nextStep}
            styles={styles}
          />
        );
      case EXERCISE_STATE.CLEAN_UP:
        return (
          <ForwardButton
            onPress={onDone}
            styles={styles}
          />
        );
      default:
        return null;
    }
  }, [exercise, nextStep, onDone, onStarted, step.state, styles]);

  return (
    <LinearGradient
      colors={[colors.background, colors.card, colors.card, colors.background]}
      locations={[0.0, 0.1, 0.9, 1.0]}
      style={styles.fill}
    >
      {forState()}
    </LinearGradient>
  );
};

const ForwardButton = ({ onPress, styles }) => (
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
);

const CoolDown = ({ from, endCoolDown, styles }) => {
  const [count, setCount] = useState(from);
  const [isEndDialog, showEndDialog] = useState(false);
  const triggerEndDialog = useCallback(() => showEndDialog(true), []);
  const cancelHandler = useCallback(() => showEndDialog(false), []);

  useInterval(() => {
    setCount((prev) => prev - 1);
  }, 1000);

  useEffect(() => {
    if (count === 0) {
      endCoolDown();
    }
  }, [count, endCoolDown]);

  //           {new Date(count * 1000).toISOString().substr(15, 4)}

  return (
    <>
      <PopupDialog
        isVisible={isEndDialog}
        title="Continue already?"
        message="The pause is important for maximum workout effect"
        onConfirm={endCoolDown}
        onCancel={cancelHandler}
      />
      <ForwardButton
        onPress={triggerEndDialog}
        styles={styles}
      />
    </>
  );
};

const InProgress = ({
  execution: { unit, amount },
  endFun,
  styles
}) => {
  const isCountDown = unit === 'seconds';
  const crement = isCountDown ? -1 : 1;
  const [count, setCount] = useState(isCountDown ? amount : 0);
  const [isEndDialog, showEndDialog] = useState(false);
  const triggerEndDialog = useCallback(() => showEndDialog(true), []);
  const cancelHandler = useCallback(() => showEndDialog(false), []);

  useInterval(() => {
    setCount((prev) => prev + crement);
  }, 1000);

  useEffect(() => {
    if (isCountDown && count === 0) {
      endFun();
    }
  }, [count, endFun, isCountDown]);

  return (
    <>
      <PopupDialog
        isVisible={isEndDialog}
        title="Abort?"
        message={`Still ${count} seconds to go!`}
        onConfirm={endFun}
        onCancel={cancelHandler}
      />
      <ForwardButton
        onPress={isCountDown ? triggerEndDialog : endFun}
        styles={styles}
      />
    </>
  );

  /*
        <Text style={isCountDown ? styles.pressTxt : styles.countUp}>
          {new Date(count * 1000).toISOString().substr(15, 4)}
        </Text>
        <Text style={isCountDown ? styles.countUp : styles.pressTxt}>NEXT</Text>
 */
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

export default Interaction;
