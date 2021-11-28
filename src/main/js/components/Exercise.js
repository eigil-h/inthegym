import React, { useCallback, useEffect, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import styles, { pressable } from '../styles/Exercise';
import { useInterval } from '../common/fun';
import PopupDialog from './reusable/PopupDialog';

const Exercise = ({ exercise, onDone, onStarted }) => {
  const [currentSeries, setCurrentSeries] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const isStarting = currentSeries === 0;
  const isLast = currentSeries === exercise.series;

  const begin = useCallback(() => {
    setCurrentSeries(1);
    onStarted();
  }, [onStarted]);
  const triggerCoolDown = useCallback(() => {
    setCurrentSeries((prev) => prev + 1);
    setIsPaused(true);
  }, []);
  const endCoolDown = useCallback(() => setIsPaused(false), []);

  if (isStarting) {
    return (
      <View style={styles.exercise}>
        <Text style={styles.description}>{exercise.description}</Text>
        <Pressable
          onPress={begin}
          style={pressable}
        >
          <Text style={styles.pressTxt}>START</Text>
        </Pressable>
      </View>
    );
  }

  if (isPaused) {
    return (
      <View style={styles.exercise}>
        <View style={styles.instruction}>
          <Text style={styles.countDown}>
            Series #
            {currentSeries}
            {' '}
            coming up...
          </Text>
        </View>

        <CoolDown
          from={exercise.pause}
          endCoolDown={endCoolDown}
        />
      </View>
    );
  }

  return (
    <View style={styles.exercise}>
      <View style={styles.instruction}>
        <Text style={styles.series}>
          Serie #
          {currentSeries}
          {' '}
          in progress...
        </Text>
      </View>

      <InProgress
        execution={exercise.execution}
        endFun={isLast ? onDone : triggerCoolDown}
        isLast={isLast}
      />
    </View>
  );
};

const CoolDown = ({ from, endCoolDown }) => {
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
        style={pressable}
      >
        <Text style={styles.pressTxt}>
          {new Date(count * 1000).toISOString().substr(15, 4)}
        </Text>
      </Pressable>
    </>
  );
};

const InProgress = ({ execution: { unit, amount }, endFun, isLast }) => {
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
        style={pressable}
      >
        <Text style={isCountDown ? styles.pressTxt : styles.countUp}>
          {new Date(count * 1000).toISOString().substr(15, 4)}
        </Text>
        <Text style={isCountDown ? styles.countUp : styles.pressTxt}>{isLast ? 'DONE' : 'PAUSE'}</Text>
      </Pressable>
    </>
  );
};

export default Exercise;
