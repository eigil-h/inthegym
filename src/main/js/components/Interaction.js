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
    const startup = () => {
      onStarted();
      nextStep();
    };

    switch (step.state) {
      case EXERCISE_STATE.WARM_UP:
        return (
          <Simple
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
          <Simple
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

const Simple = ({ onPress, styles }) => (
  <Pressable
    onPress={onPress}
    style={pressableStyle}
  >
    {({ pressed }) => (
      <Ionicons
        name="arrow-forward"
        style={[styles.pressTxt, pressed ? styles.pressedTxt : null]}
      />
    )}
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

  //           {new Date(count * 1000).toISOString().substr(15, 4)}

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
        style={pressableStyle}
      >
        {({ pressed }) => (
          <Ionicons
            name="arrow-forward"
            style={[styles.pressTxt, pressed ? styles.pressedTxt : null]}
          />
        )}
      </Pressable>
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
        style={pressableStyle}
      >
        {({ pressed }) => (
          <Ionicons
            name="arrow-forward"
            style={[styles.pressTxt, pressed ? styles.pressedTxt : null]}
          />
        )}
      </Pressable>
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
    pressTxt: {
      color: colors.background,
      fontSize: 156,
      textAlign: 'center'
    },
    pressedTxt: {
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
