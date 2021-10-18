import React, { useEffect, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import styles, { pressable } from '../styles/Exercise';
import { useInterval } from '../common/fun';
import PopupDialog from './reusable/PopupDialog';

const Exercise = ({ exercise, onDone }) => {
  const [currentSeries, setCurrentSeries] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const isStarting = currentSeries === 0;
  const isLast = currentSeries === exercise.series;

  const begin = () => setCurrentSeries(1);
  const triggerCountDown = () => {
    setCurrentSeries((prev) => prev + 1);
    setIsPaused(true);
  };
  const endCountDown = () => setIsPaused(false);

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

        <CountDown
          from={exercise.pause}
          endCountDown={endCountDown}
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
        endFun={isLast ? onDone : triggerCountDown}
        isLast={isLast}
      />
    </View>
  );
};

const CountDown = ({ from, endCountDown }) => {
  const [count, setCount] = useState(from);
  const [isEndDialog, showEndDialog] = useState(false);

  useInterval(() => {
    setCount((prev) => prev - 1);
  }, 1000);

  useEffect(() => {
    if (count === 0) {
      endCountDown();
    }
  }, [count, endCountDown]);

  return (
    <>
      <PopupDialog
        isVisible={isEndDialog}
        title="Continue already?"
        message="The pause is important for maximum workout effect"
        onConfirm={endCountDown}
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
        <Text style={styles.pressTxt}>{new Date(count * 1000).toISOString().substr(15, 4)}</Text>
      </Pressable>
    </>
  );
};

const InProgress = ({ endFun, isLast }) => {
  const [count, setCount] = useState(0);
  const [isEndDialog, showEndDialog] = useState(false);

  useInterval(() => {
    setCount((prev) => prev + 1);
  }, 1000);

  return (
    <>
      <PopupDialog
        isVisible={isEndDialog}
        title="Pause?"
        message="Just making sure HERO"
        onConfirm={endFun}
        onCancel={() => {
          showEndDialog(false);
        }}
      />
      <Pressable
        onPress={() => {
          if (isLast) {
            endFun();
          } else {
            showEndDialog(true);
          }
        }}
        style={pressable}
      >
        {!isLast && (
          <Text style={styles.countUp}>
            {new Date(count * 1000).toISOString().substr(15, 4)}
          </Text>
        )}
        <Text style={styles.pressTxt}>{isLast ? 'DONE' : 'PAUSE'}</Text>
      </Pressable>

    </>
  );
};

export default Exercise;
