import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '@react-navigation/native';

const Instruction = ({
  instruction: {
    msg,
    count,
    estate
  }
}) => {
  const styles = createStyles(useTheme());
  return (
    <View style={styles.wrapper}>
      <View style={styles.msgBox}>
        <Text
          style={styles.msg}
          numberOfLines={1}
        >
          {msg}
        </Text>
      </View>
      <View style={styles.countBox}>
        <Text
          style={styles.count}
          numberOfLines={1}
        >
          {count}
        </Text>
      </View>
    </View>
  );
};

const createStyles = ({ colors }) => {
  const styles = {
    wrapper: {
      flexDirection: 'row',
      paddingLeft: 5,
      paddingTop: 15
    },
    msgBox: {
      flex: 3
    },
    msg: {
      fontSize: 22,
      lineHeight: 27
    },
    countBox: {
      flex: 1
    },
    count: {
      fontSize: 28,
      lineHeight: 28
    }
  };

  return StyleSheet.create(styles);
};

export default Instruction;
