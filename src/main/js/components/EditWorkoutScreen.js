import React, {
  useCallback, useEffect, useRef, useState
} from 'react';
import {
  Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import { noop } from '../common/fun';
import Edit from './Edit';
import { updateWorkout as fbUpdate } from '../data/firebase';

const TEMPLATE = {
  title: 'a name',
  execution: {
    amount: 0,
    unit: 'repeats'
  },
  load: {
    amount: 0,
    unit: '',
    increase: 0
  },
  series: 1,
  pause: 30
};

const EditWorkoutScreen = React.memo(({
  route: {
    params: {
      exercises: existingExercises,
      title: workoutTitle,
      userId
    }
  }
}) => {
  const theme = useTheme();
  const styles = createStyles(theme);
  const pressableStyle = pressable(theme);
  const [exercises, setExercises] = useState(existingExercises);
  const [selected, setSelected] = useState(exercises?.[0]);

  const addExercise = useCallback(
    () => {
      setExercises((prev) => [...prev, TEMPLATE]);
      setSelected(TEMPLATE);
    },
    []
  );

  const updateExercise = useCallback(
    (prevTitle, exercise) => setExercises(
      (prev) => prev
        .filter((ex) => !(ex.title === prevTitle && exercise === null))
        .map((ex) => (ex.title === prevTitle ? exercise : ex))
    ),
    []
  );

  useEffect(() => setExercises(existingExercises), [existingExercises]);

  useEffect(
    () => {
      fbUpdate(userId, workoutTitle, { exercises })
        .then(noop);
      const current = exercises.find((ex) => ex.title === selected.title);
      if (!current) {
        setSelected(exercises?.[0]);
      }
    },
    [exercises, selected.title, userId, workoutTitle]
  );

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.leftBar}>
        <Tabs
          styles={styles}
          exercises={exercises}
          selected={selected}
          onSelected={setSelected}
        />
        <Pressable
          style={[styles.newButton, pressableStyle]}
          onPress={addExercise}
        >
          <Text style={styles.newButtonText}>New exercise</Text>
        </Pressable>
      </View>
      <View style={styles.main}>
        {selected ? (
          <Edit
            exercise={selected}
            onUpdate={updateExercise}
          />
        ) : <View />}
      </View>
    </SafeAreaView>
  );
});

const Tabs = React.memo(({
  styles,
  exercises,
  selected,
  onSelected
}) => {
  const scrollRef = useRef();
  const [height, setHeight] = useState(0);
  const [selectedY, setSelectedY] = useState(0);

  const selectedHandler = useCallback((exercise, y) => {
    setSelectedY(y);
    onSelected(exercise);
  },
  [onSelected]);

  const layoutHandler = useCallback(
    ({ nativeEvent }) => setHeight(nativeEvent.layout.height),
    []
  );

  useEffect(
    () => {
      if (selectedY > height) {
        scrollRef.current?.scrollTo({ y: selectedY, animated: true });
      }
    },
    [height, selectedY]
  );

  return (
    <ScrollView
      ref={scrollRef}
      onLayout={layoutHandler}
      contentContainerStyle={styles.tabs}
      showsVerticalScrollIndicator={false}
    >
      {exercises.map((ex) => (
        <Tab
          key={ex.title}
          styles={styles}
          exercise={ex}
          isSelected={ex === selected}
          onSelected={selectedHandler}
        />
      ))}
    </ScrollView>
  );
});

const Tab = React.memo(({
  styles,
  exercise,
  isSelected,
  onSelected
}) => {
  const [y, setY] = useState(0);
  const renderText = useCallback(() => (
    <Text
      style={styles.tabText}
      ellipsizeMode="middle"
      numberOfLines={2}
    >
      {exercise.title}
    </Text>
  ), [exercise.title, styles.tabText]);

  return (
    <View onLayout={({ nativeEvent }) => setY(nativeEvent.layout.y)}>
      {(isSelected ? (
        <View style={[styles.tab, styles.selectedTab]}>
          {renderText()}
        </View>
      ) : (
        <Pressable
          key={exercise.title}
          onPress={() => onSelected(exercise, y)}
          style={styles.tab}
        >
          {renderText()}
        </Pressable>
      ))}
    </View>
  );
});

/*
 * STYLE
 */
const createStyles = ({ colors }) => {
  const styles = {
    wrapper: {
      flex: 1,
      flexDirection: 'row',
      margin: 6
    },
    leftBar: {
      flex: 2,
      flexDirection: 'column',
      justifyContent: 'space-between'
    },
    main: {
      flex: 5
    },
    tabs: {
      flexDirection: 'column'
    },
    tab: {
      borderBottomWidth: 1,
      borderColor: colors.border,
      paddingVertical: 12,
      paddingLeft: 12
    },
    tabText: {
      fontFamily: 'sans-serif',
      fontSize: 18,
      color: colors.text
    },
    selectedTab: {
      backgroundColor: colors.card
    },
    newButton: {
      margin: 16,
      padding: 6
    },
    newButtonText: {
      fontFamily: 'sans-serif',
      fontStyle: 'italic',
      fontSize: 18,
      textAlign: 'center',
      color: colors.text
    }
  };

  return StyleSheet.create(styles);
};

const pressable = ({ colors }) => ({ pressed }) => {
  if (pressed) {
    return {
      padding: 6,
      borderWidth: 1,
      borderRadius: 5,
      borderColor: colors.border,
      backgroundColor: colors.primary
    };
  }

  return {
    padding: 6
  };
};

export default EditWorkoutScreen;
