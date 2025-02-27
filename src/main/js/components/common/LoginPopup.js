import React, { useCallback, useEffect, useState } from 'react';
import {
  Pressable, View, StyleSheet, Text, TextInput
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import { getUserId, setUserId } from '../../data/local';
import { noop } from '../../common/fun';
import { signInAnon } from '../../data/firebase';

const LoginPopup = React.memo(({
  onSelected
}) => {
  const theme = useTheme();
  const styles = createStyles(theme);
  const pressableStyles = createPressableStyles(theme);
  const [selected, setSelected] = useState('');

  const onLogin = useCallback(() => {
    signInAnon().then(() => setUserId(selected)).then(noop);
    onSelected(selected);
  }, [onSelected, selected]);

  useEffect(() => {
    (async () => {
      const userId = await getUserId();
      if (userId != null) {
        setSelected(userId);
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder="User ID"
          value={selected}
          onChangeText={setSelected}
        />
      </View>
      <Pressable
        style={pressableStyles}
        onPress={onLogin}
      >
        <Text style={styles.buttonText}>Login</Text>
      </Pressable>
    </View>
  );
});

const createStyles = ({ colors }) => {
  return StyleSheet.create({
    container: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.background
    },
    inputWrapper: {
      marginTop: 20
    },
    input: {
      height: 40,
      width: 200,
      borderColor: colors.border,
      borderWidth: 1,
      borderRadius: 5,
      backgroundColor: colors.background
    },
    button: {
    },
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

export default LoginPopup;
