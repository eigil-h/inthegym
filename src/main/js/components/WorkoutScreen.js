import React, { useEffect, useState, useCallback } from 'react';
import { FlatList, View } from 'react-native';
import styles from '../styles/WorkoutScreen';
import ExerciseListItem from './ExerciseListItem';
import ExerciseDetails from './ExerciseDetails';
import Exercise from './Exercise';
import PopupDialog from './reusable/PopupDialog';

const WorkoutScreen = ({ navigation, route: { params: { exercises } } }) => {
  const [isStarted, setWorkoutStarted] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [exitDialogEvent, triggerExitDialog] = useState(null);
  const exercise = exercises.length > 0 ? exercises[activeIndex] : null;

  const onStarted = useCallback(() => setWorkoutStarted(true), []);

  const onExerciseDone = useCallback(() => {
    if (activeIndex >= exercises.length - 1) {
      // noinspection JSUnresolvedFunction
      navigation.goBack();
    } else {
      setActiveIndex((prevState) => prevState + 1);
    }
  }, [activeIndex, exercises, navigation]);

  const beforeRemove = useCallback((ev) => {
    if (isStarted && activeIndex < exercises.length - 1) {
      ev.preventDefault();
      triggerExitDialog(ev);
    }
  }, [activeIndex, exercises, isStarted]);

  useEffect(() => {
    return navigation.addListener('beforeRemove', beforeRemove);
  }, [navigation, beforeRemove]);

  if (!exercise) {
    return <View />;
  }

  return (
    <View style={styles.screen}>
      <View style={styles.mainContainer}>
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
        <Exercise
          key={activeIndex}
          exercise={exercise}
          onDone={onExerciseDone}
          onStarted={onStarted}
        />
      </View>
      <View style={styles.sideContainer}>
        <View style={styles.listContainer}>
          <FlatList
            data={exercises}
            extraData={activeIndex}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.title}
            renderItem={({ item, index }) => (
              <ExerciseListItem
                index={index}
                activeIndex={activeIndex}
                exercise={item}
              />
            )}
          />
        </View>
        <View style={styles.detailsContainer}>
          <ExerciseDetails exercise={exercise} />
        </View>
      </View>
    </View>
  );
};

export default WorkoutScreen;
