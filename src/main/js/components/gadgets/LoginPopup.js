import React, { useCallback, useState } from 'react';
import {
  Pressable, View, StyleSheet, Text, TextInput
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import { noop } from '../../common/fun';
import { signInAnon, signInWithEmailAndPassword } from '../../data/firebase';

const LoginPopup = React.memo(() => {
  const theme = useTheme();
  const styles = createStyles(theme);
  const pressableStyles = createPressableStyles(theme);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState();

  const onLogin = useCallback(() => {
    if (email && password) {
      signInWithEmailAndPassword(email, password)
        .then(noop)
        .catch(setError);
    } else {
      signInAnon()
        .then(noop)
        .catch(setError);
    }
  }, [email, password]);

  return (
    <View style={styles.container}>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder="Email or empty for anonymous"
          value={email}
          onChangeText={setEmail}
        />
      </View>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>
      <Pressable
        style={pressableStyles}
        onPress={onLogin}
      >
        <Text style={styles.buttonText}>Login</Text>
      </Pressable>

      {error && <Text style={styles.errorText}>{error}</Text>}
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
    },
    errorText: {
      fontFamily: 'serif',
      fontSize: 24,
      color: colors.error,
      marginTop: 20
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
