import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { signOut } from '../../data/firebase';

const Button = ({ text }) => {
  const theme = useTheme();
  const styles = createStyles(theme);
  const pressableStyles = createPressableStyles(theme);

  return (
    <Pressable
      style={pressableStyles}
      onPress={signOut}
    >
      <Text style={styles.buttonText}>{text}</Text>
    </Pressable>
  );
};

const createStyles = ({ colors }) => {
  return StyleSheet.create({
    buttonText: {
      fontFamily: 'sans-serif',
      fontSize: 24,
      color: colors.text
    }
  });
};

const createPressableStyles = ({ colors }) => ({ pressed }) => {
  if (pressed) {
    return {
      marginTop: 20,
      paddingVertical: 6,
      paddingHorizontal: 24,
      borderWidth: 1,
      borderRadius: 5,
      borderColor: colors.border,
      backgroundColor: colors.primary
    };
  }

  return {
    marginTop: 20,
    paddingVertical: 6,
    paddingHorizontal: 24,
    backgroundColor: colors.background
  };
};

export default Button;
