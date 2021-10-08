import React, { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import styles from '../styles/WorkoutScreen';
import ExerciseListItem from './ExerciseListItem';
import ExerciseDetails from './ExerciseDetails';
import Exercise from './Exercise';
import PopupDialog from './reusable/PopupDialog';

const WorkoutScreen = ({ navigation, route: { params: { exercises } } }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const exercise = exercises[activeIndex];
  const [exitDialogEvent, triggerExitDialog] = useState(null);

  useEffect(() => {
    navigation.addListener('beforeRemove', (ev) => {
      ev.preventDefault();
      triggerExitDialog(ev);
    });
  }, [navigation]);

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
          onDone={() => setActiveIndex((prevState) => (
            prevState + 1 < exercises.length ? prevState + 1 : prevState))}
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
          <ExerciseDetails exercise={exercises[activeIndex]} />
        </View>
      </View>
    </View>
  );
};

export default WorkoutScreen;
