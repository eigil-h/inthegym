import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Instruction = ({
  instruction: {
    msg,
    count,
    countColor
  }
}) => {
  const styles = createStyles(countColor);
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

const createStyles = (countColor) => {
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
