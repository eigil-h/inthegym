import React, { useEffect, useState } from 'react';
import { Alert, FlatList, View } from 'react-native';
import styles from '../styles/WorkoutScreen';
import ExerciseListItem from './ExerciseListItem';
import ExerciseDetails from './ExerciseDetails';
import Exercise from './Exercise';
import { noop } from '../common/fun';

const WorkoutScreen = ({ navigation, route: { params: { exercises } } }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const exercise = exercises[activeIndex];

  useEffect(() => {
    navigation.addListener('beforeRemove', (ev) => {
      ev.preventDefault();
      Alert.alert('Exit workout?',
        'You have not completed the workout. Progress will be lost!',
        [{
          text: 'Yes',
          style: 'destructive',
          onPress: () => navigation.dispatch(ev.data.action)
        },
        {
          text: 'No',
          style: 'cancel',
          onPress: noop
        }]);
    });
  }, [navigation]);

  return (
    <View style={styles.screen}>
      <View style={styles.mainContainer}>
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
