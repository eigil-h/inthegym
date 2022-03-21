import React, { useCallback, useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { useTheme } from '@react-navigation/native';
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
    const startup = () => {
      onStarted();
      nextStep();
    };

    switch (step.state) {
      case EXERCISE_STATE.WARM_UP:
        return (
          <WarmUp
            onPress={startup}
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
          <CleanUp
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

const WarmUp = ({ onPress, styles }) => (
  <Pressable
    onPress={onPress}
    style={pressable(useTheme())}
  >
    <Text style={styles.pressTxt}>START</Text>
  </Pressable>
);

const CleanUp = ({ onPress, styles }) => (
  <Pressable
    onPress={onPress}
    style={pressable(useTheme())}
  >
    <Text style={styles.pressTxt}>EXIT</Text>
  </Pressable>
);

const CoolDown = ({ from, endCoolDown, styles }) => {
  const [count, setCount] = useState(from);
  const [isEndDialog, showEndDialog] = useState(false);

  useInterval(() => {
    setCount((prev) => prev - 1);
  }, 1000);

  useEffect(() => {
    if (count === 0) {
      endCoolDown();
    }
  }, [count, endCoolDown]);

  return (
    <>
      <PopupDialog
        isVisible={isEndDialog}
        title="Continue already?"
        message="The pause is important for maximum workout effect"
        onConfirm={endCoolDown}
        onCancel={() => {
          showEndDialog(false);
        }}
      />
      <Pressable
        onPress={() => {
          showEndDialog(true);
        }}
        style={pressable(useTheme())}
      >
        <Text style={styles.pressTxt}>
          {new Date(count * 1000).toISOString().substr(15, 4)}
        </Text>
      </Pressable>
    </>
  );
};

const InProgress = ({
  execution: { unit, amount },
  endFun,
  isLast,
  styles
}) => {
  const isCountDown = unit === 'seconds';
  const crement = isCountDown ? -1 : 1;
  const [count, setCount] = useState(isCountDown ? amount : 0);
  const [isEndDialog, showEndDialog] = useState(false);
  const triggerEndDialog = useCallback(() => showEndDialog(true), []);

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
        onCancel={() => {
          showEndDialog(false);
        }}
      />
      <Pressable
        onPress={isCountDown ? triggerEndDialog : endFun}
        style={pressable(useTheme())}
      >
        <Text style={isCountDown ? styles.pressTxt : styles.countUp}>
          {new Date(count * 1000).toISOString().substr(15, 4)}
        </Text>
        <Text style={isCountDown ? styles.countUp : styles.pressTxt}>{isLast ? 'DONE' : 'PAUSE'}</Text>
      </Pressable>
    </>
  );
};

/*
 * STYLE
 */
const createStyles = ({ colors }) => {
  const styles = {
    pressTxt: {
      color: colors.text,
      textAlign: 'center',
      fontSize: 56
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

const pressable = ({ colors }) => ({ pressed }) => [{
  flex: 1,
  marginVertical: '10%',
  backgroundColor: pressed
    ? colors.primary
    : colors.card
}];

export default Interaction;
