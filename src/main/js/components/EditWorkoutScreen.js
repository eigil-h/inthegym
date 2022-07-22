import React, { useState } from 'react';
import {
  Pressable, StyleSheet, Text, View
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import { cpPush } from '../common/fun';

const NEW_EXERCISE = {
  title: 'new',
  isNew: true
};

const EditWorkoutScreen = ({ navigation, route: { params: { exercises: existingExercises } } }) => {
  const styles = createStyles(useTheme());
  const exercises = cpPush(existingExercises, NEW_EXERCISE);
  const [selected, setSelected] = useState(exercises[0]);

  return (
    <View style={styles.wrapper}>
      <Tabs
        styles={styles}
        exercises={exercises}
        selected={selected}
        onSelected={setSelected}
      />
      <Edit style={styles.edit} />
    </View>
  );
};

const Tabs = ({
  styles,
  exercises,
  selected,
  onSelected
}) => (
  <View style={styles.tabs}>
    {exercises.map((ex) => (
      <Tab
        key={ex.title}
        tabStyle={[ex === selected && styles.selectedTab, styles.tab, ex.isNew && styles.newTab]}
        tabTextStyle={[ex.isNew && styles.newTabText, styles.tabText]}
        exercise={ex}
        onSelected={onSelected}
      />
    ))}
  </View>
);

const Tab = ({
  tabStyle,
  tabTextStyle,
  exercise,
  onSelected
}) => (
  <Pressable
    key={exercise.title}
    onPress={() => onSelected(exercise)}
    style={tabStyle}
  >
    <Text style={tabTextStyle}>{exercise.title}</Text>
  </Pressable>
);

const Edit = ({ style }) => {
  return (<View style={style} />);
};

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
    tabs: {
      flex: 2,
      flexDirection: 'column'
    },
    tab: {
      borderBottomWidth: 1,
      borderColor: colors.border,
      paddingVertical: 12
    },
    selectedTab: {
      backgroundColor: colors.card
    },
    newTab: {
      borderBottomWidth: 0
    },
    tabText: {
      fontFamily: 'sans-serif',
      fontSize: 18,
      textAlign: 'center',
      color: colors.text
    },
    newTabText: {
      fontStyle: 'italic',
      textDecorationLine: 'underline'
    },
    edit: {
      flex: 5,
      backgroundColor: colors.card
    }
  };

  return StyleSheet.create(styles);
};

export default EditWorkoutScreen;
