import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '@react-navigation/native';

const ExerciseListItem = ({ index, activeIndex, exercise }) => {
  const styles = createStyles(useTheme());

  // eslint-disable-next-line no-nested-ternary
  const statusStyle = index === activeIndex
    ? styles.present : index < activeIndex
      ? styles.past : styles.future;

  return (
    <View style={[styles.wrapper, statusStyle]}>
      <Text>
        {exercise.title}
      </Text>
    </View>
  );
};

/*
 * STYLE
 */
const createStyles = ({ colors }) => {
  const styles = {
    wrapper: {
      width: '90%',
      height: 60,
      marginVertical: 5,
      alignItems: 'center',
      justifyContent: 'center',
      borderTopRightRadius: 40,
      borderBottomRightRadius: 40
    },
    past: {
      backgroundColor: colors.card
    },
    present: {
      backgroundColor: colors.primary,
      width: '100%',
      height: 70,
      marginVertical: 0
    },
    future: {
      backgroundColor: colors.card
    }
  };

  return StyleSheet.create(styles);
};

export default ExerciseListItem;
