import React, { useCallback, useState } from 'react';
import {
  Pressable, View, StyleSheet, Text, TextInput
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import { noop } from '../../common/fun';
import { signInAnon, signInWithEmailAndPassword } from '../../data/firebase';
import PopupDialog from './PopupDialog';

const LoginPopup = React.memo(() => {
  const theme = useTheme();
  const styles = createStyles(theme);
  const pressableStyles = createPressableStyles(theme);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const onLogin = useCallback(() => {
    if (email && password) {
      signInWithEmailAndPassword(email, password)
        .then(noop)
        .catch((err) => setError(err.message));
    } else {
      signInAnon()
        .then(noop)
        .catch((err) => setError(err.message));
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
          placeholder="Password"
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

      <PopupDialog
        isVisible={error !== null}
        type="error"
        title="Login Error"
        message={error || ''}
        onConfirm={() => setError(null)}
      />
    </View>
  );
});

const createStyles = ({ colors }) => StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  inputWrapper: {
    width: '100%',
    marginBottom: 15
  },
  input: {
    backgroundColor: colors.card,
    borderRadius: 8,
    padding: 12,
    color: colors.text
  },
  buttonText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600'
  }
});

const createPressableStyles = ({ colors }) => ({
  backgroundColor: colors.primary,
  paddingVertical: 12,
  paddingHorizontal: 24,
  borderRadius: 8,
  marginTop: 10
});

export default LoginPopup;
