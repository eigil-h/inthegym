import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '@react-navigation/native';

export const PROGRESS_STATE = {
  PAST: 1,
  PRESENT: 2,
  FUTURE: 3
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
    [PROGRESS_STATE.PAST]: {
      backgroundColor: colors.card
    },
    [PROGRESS_STATE.PRESENT]: {
      backgroundColor: colors.primary,
      height: 70,
      marginVertical: 0,
      borderRadius: 5
    },
    [PROGRESS_STATE.FUTURE]: {
      backgroundColor: colors.card
    }
  };

  return StyleSheet.create(styles);
};

export default ProgressItem;
