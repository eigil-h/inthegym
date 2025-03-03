import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { signOut } from '../../data/firebase';

const LogoutButton = () => {
  const theme = useTheme();
  const styles = createStyles(theme);
  const pressableStyles = createPressableStyles(theme);

  return (
    <Pressable
      style={pressableStyles}
      onPress={signOut}
    >
      <Text style={styles.buttonText}>Logout</Text>
    </Pressable>
  );
};

const createStyles = ({ colors }) => {
  return StyleSheet.create({
    // eslint-disable-next-line react-native/no-unused-styles
    buttonText: {
      fontFamily: 'sans-serif',
      fontSize: 16,
      color: colors.text
    }
  });
};

const createPressableStyles = ({ colors }) => ({ pressed }) => {
  if (pressed) {
    return {
      borderWidth: 1,
      borderRadius: 5,
      borderColor: colors.border,
      paddingHorizontal: 4,
      marginRight: 24,
      backgroundColor: colors.primary
    };
  }

  return {
    paddingHorizontal: 4,
    marginRight: 24,
    backgroundColor: colors.background
  };
};

export default LogoutButton;
