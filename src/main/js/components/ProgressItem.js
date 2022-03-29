import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '@react-navigation/native';

export const PROGRESS_STATE = {
  PAST: 'past',
  PRESENT: 'present',
  FUTURE: 'future'
};

const ProgressItem = ({ title, progressState }) => {
  const styles = createStyles(useTheme());

  return (
    <View style={[styles.wrapper, styles[progressState]]}>
      <Text>
        {title}
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
      height: 60,
      marginVertical: 5,
      paddingLeft: 15,
      alignItems: 'flex-start',
      justifyContent: 'center',
      borderRadius: 10
    },
    past: {
      backgroundColor: colors.card
    },
    present: {
      backgroundColor: colors.primary,
      height: 70,
      marginVertical: 0,
      borderRadius: 5
    },
    future: {
      backgroundColor: colors.card
    }
  };

  return StyleSheet.create(styles);
};

export default ProgressItem;
