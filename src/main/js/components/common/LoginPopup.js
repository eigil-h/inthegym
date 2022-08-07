import React, { useCallback, useEffect, useState } from 'react';
import {
  Pressable, View, StyleSheet, Text
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import RadioSelector from './RadioSelector';
import { getUserId, setUserId } from '../../data/local';
import { noop } from '../../common/fun';

const OPTIONS = [
  'eigil',
  'eivin',
  'test'
];

const LoginPopup = React.memo(({
  onSelected
}) => {
  const theme = useTheme();
  const styles = createStyles(theme);
  const pressableStyles = createPressableStyles(theme);
  const [selected, setSelected] = useState('');

  const onSave = useCallback(() => {
    setUserId(selected).then(noop);
    onSelected(selected);
  }, [onSelected, selected]);

  useEffect(() => {
    (async () => {
      const userId = await getUserId();
      setSelected(userId || OPTIONS[0]);
    })();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.radio}>
        <RadioSelector
          items={OPTIONS}
          selectedItem={selected}
          onSelected={setSelected}
        />
      </View>
      <Pressable
        style={pressableStyles}
        onPress={onSave}
      >
        <Text style={styles.buttonText}>Select</Text>
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
    radio: {
      marginTop: 20
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
