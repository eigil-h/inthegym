import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { EXERCISE_STATE } from './Interaction';

const Instruction = ({
  instruction: {
    msg,
    count,
    estate
  }
}) => {
  const styles = createStyles(estate, useTheme());
  return (
    <View style={styles.wrapper}>
      <View style={styles.msgBox}>
        <Text
          style={styles.msg}
          numberOfLines={2}
        >
          {msg}
        </Text>
      </View>
      <View style={styles.countBox}>
        <Text
          style={styles.count}
        >
          {count}
        </Text>
      </View>
    </View>
  );
};

const createStyles = (estate, { colors }) => {
  const countColor = estate === EXERCISE_STATE.PAUSE ? colors.notification : colors.text;
  const styles = {
    wrapper: {
      ...StyleSheet.absoluteFillObject,
      flexDirection: 'row',
      borderColor: 'red',
      alignItems: 'center'
    },
    msgBox: {
      flex: 5,
      paddingHorizontal: 8
    },
    msg: {
      fontSize: 22,
    },
    countBox: {
      flex: 2,
      borderWidth: 1,
      borderRadius: 8,
      marginRight: 8
    },
    count: {
      color: countColor,
      fontSize: 44,
      fontWeight: 'bold',
      textAlign: 'center'
    }
  };

  return StyleSheet.create(styles);
};

export default Instruction;
