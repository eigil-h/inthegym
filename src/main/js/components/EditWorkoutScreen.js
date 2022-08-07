import React, { useState, useCallback, useEffect } from 'react';
import {
  Pressable, StyleSheet, Text, View, TextInput
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import { colorToRgba, noop, rgbaToColor } from '../common/fun';
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

const EditWorkoutScreen = ({
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
  const [selected, setSelected] = useState(exercises[0]);

  const rename = useCallback((newTitle, exercise) => {
    setExercises((prev) => prev.map((ex) => {
      return ex === exercise ? { ...ex, title: newTitle } : ex;
    }));
  }, []);

  const addExercise = useCallback(
    (exercise) => {
      setExercises((prev) => [...prev, exercise]);
      setSelected(exercise);
    },
    []
  );

  const updateExercise = useCallback(
    (exercise) => setExercises((prev) => prev.map((ex) => (ex.title === exercise.title ? exercise : ex))),
    []
  );

  useEffect(() => setExercises(existingExercises), [existingExercises]);

  useEffect(
    () => {
      fbUpdate(userId, workoutTitle, { exercises })
        .then(noop);
    },
    [exercises, userId, workoutTitle]
  );

  return (
    <View style={styles.wrapper}>
      <View style={styles.leftBar}>
        <Tabs
          styles={styles}
          exercises={exercises}
          selected={selected}
          onSelected={setSelected}
          onRenamed={rename}
        />
        <Pressable
          style={[styles.newButton, pressableStyle]}
          onPress={() => addExercise(TEMPLATE)}
        >
          <Text style={styles.newButtonText}>New workout</Text>
        </Pressable>
      </View>
      <View style={styles.main}>
        {Boolean(selected) && (
        <Edit
          exercise={selected}
          onUpdate={updateExercise}
        />
        )}
      </View>
    </View>
  );
};

const Tabs = ({
  styles,
  exercises,
  selected,
  onSelected,
  onRenamed
}) => (
  <View style={styles.tabs}>
    {exercises.map((ex) => ((ex === selected) ? (
      <SelectedTab
        key={ex.title}
        styles={styles}
        exercise={ex}
        onRenamed={onRenamed}
      />
    ) : (
      <Tab
        key={ex.title}
        styles={styles}
        exercise={ex}
        onSelected={onSelected}
      />
    )))}
  </View>
);

const Tab = ({
  styles,
  exercise,
  onSelected
}) => (
  <Pressable
    key={exercise.title}
    onPress={() => onSelected(exercise)}
    style={styles.tab}
  >
    <Text style={styles.tabText}>{exercise.title}</Text>
  </Pressable>
);

const SelectedTab = ({
  styles,
  exercise,
  onRenamed
}) => {
  const [title, setTitle] = useState(exercise.title);

  return (
    <View style={[styles.tab, styles.selectedTab]}>
      <TextInput
        style={styles.selectedTabEdit}
        value={`${title}`}
        onChangeText={setTitle}
        onBlur={() => onRenamed(title, exercise)}
      />
    </View>
  );
};

/*
 * STYLE
 */
const createStyles = ({ colors }) => {
  const darken = (v, i) => {
    const factor = i === 0 ? 0.93 : 0.97;
    return v * factor;
  };
  const inputBg = rgbaToColor(colorToRgba(colors.background).map(darken));

  const styles = {
    wrapper: {
      flex: 1,
      flexDirection: 'row',
      margin: 6
    },
    leftBar: {
      flexDirection: 'column',
      justifyContent: 'space-between'
    },
    main: {
      flex: 5
    },
    tabs: {
      flex: 2,
      flexDirection: 'column'
    },
    tab: {
      borderBottomWidth: 1,
      borderColor: colors.border,
      paddingVertical: 12
    },
    tabText: {
      fontFamily: 'sans-serif',
      fontSize: 18,
      textAlign: 'center',
      color: colors.text
    },
    selectedTab: {
      backgroundColor: colors.card
    },
    selectedTabEdit: {
      backgroundColor: inputBg
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
