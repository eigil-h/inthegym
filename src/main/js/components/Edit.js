import React, { useCallback, useEffect, useState } from 'react';
import {
  StyleSheet, View, Text, TextInput, Pressable, ScrollView
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import RadioSelector from './gadgets/RadioSelector';

const Edit = ({ exercise: original, onUpdate }) => {
  const theme = useTheme();
  const styles = createStyles(theme);
  const pressableStyle = pressable(theme);
  const [exercise, setExercise] = useState(original);

  const setTitle = useCallback((value) => {
    if (!value) return;
    setExercise((prev) => ({ ...prev, title: value }));
  }, []);

  const setExecutionAmount = useCallback((value) => {
    setExercise((prev) => ({ ...prev, execution: { ...prev.execution, amount: Number(value) } }));
  }, []);

  const setExecutionUnit = useCallback((value) => {
    setExercise((prev) => ({ ...prev, execution: { ...prev.execution, unit: value } }));
  }, []);

  const setLoadAmount = useCallback((value) => {
    setExercise((prev) => ({ ...prev, load: { ...prev.load, amount: Number(value) } }));
  }, []);

  const setLoadUnit = useCallback((value) => {
    setExercise((prev) => ({ ...prev, load: { ...prev.load, unit: value } }));
  }, []);

  const setLoadIncrease = useCallback((value) => {
    setExercise((prev) => ({ ...prev, load: { ...prev.load, increase: Number(value) } }));
  }, []);

  const setSeries = useCallback((value) => {
    if (value < 1) return;
    setExercise((prev) => ({ ...prev, series: Number(value) }));
  }, []);

  const setPause = useCallback((value) => {
    setExercise((prev) => ({ ...prev, pause: Number(value) }));
  }, []);

  const numberFilter = useCallback((text) => (text.match(/\d*/g)), []);
  const noFilter = useCallback(() => true, []);

  useEffect(() => {
    setExercise(original);
  }, [original]);

  return (
    <ScrollView
      contentContainerStyle={styles.wrapper}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.inputs}>
        <Input
          styles={styles}
          label="title"
          value={exercise.title}
          filter={noFilter}
          onUpdate={setTitle}
        />
        <Group
          styles={styles}
          title="execution"
        >
          <Input
            styles={styles}
            label="amount"
            value={exercise.execution.amount.toString()}
            filter={numberFilter}
            isNumber
            onUpdate={setExecutionAmount}
          />
          <View style={styles.input}>
            <Text style={styles.labelText}>unit</Text>
            <RadioSelector
              items={['repeats', 'seconds']}
              selectedItem={exercise.execution.unit}
              onSelected={setExecutionUnit}
            />
          </View>
        </Group>
        <Group
          styles={styles}
          title="load"
        >
          <Input
            styles={styles}
            label="amount"
            value={exercise.load.amount.toString()}
            filter={numberFilter}
            isNumber
            onUpdate={setLoadAmount}
          />
          <Input
            styles={styles}
            label="unit"
            value={exercise.load.unit}
            filter={noFilter}
            onUpdate={setLoadUnit}
          />
          <Input
            styles={styles}
            label="increase"
            value={exercise.load.increase?.toString()}
            filter={numberFilter}
            isNumber
            onUpdate={setLoadIncrease}
          />
        </Group>
        <Input
          styles={styles}
          label="sets"
          value={exercise.series.toString()}
          filter={numberFilter}
          isNumber
          onUpdate={setSeries}
        />
        <Input
          styles={styles}
          label="chill"
          value={exercise.pause.toString()}
          filter={numberFilter}
          isNumber
          onUpdate={setPause}
        />
      </View>
      <View style={styles.button}>
        <Pressable
          style={pressableStyle}
          onPress={() => onUpdate(original.title, exercise)}
        >
          <Text style={styles.buttonText}>Save</Text>
        </Pressable>
        <Pressable
          style={pressableStyle}
          onPress={() => onUpdate(original.title, null)}
        >
          <Ionicons
            name="trash-bin"
            style={styles.buttonText}
          />
        </Pressable>
      </View>
    </ScrollView>
  );
};

const Group = React.memo(({
  styles,
  title,
  children
}) => (
  <View style={styles.group}>
    <Text style={styles.groupHeader}>{title}</Text>
    <View style={styles.groupBody}>
      {children}
    </View>
  </View>
));

const Input = React.memo(({
  styles,
  label,
  value,
  filter,
  isNumber,
  onUpdate
}) => {
  const [text, setText] = useState(value || '');

  const changeHandler = useCallback(
    (t) => {
      const filtered = filter(t);
      if (filtered) {
        setText(t);
      }
    },
    [filter]
  );

  useEffect(() => setText(value || ''), [value]);

  return (
    <View style={styles.input}>
      <Text style={styles.labelText}>{label}</Text>
      <TextInput
        style={styles.inputText}
        value={`${text}`}
        keyboardType={isNumber ? 'numeric' : 'default'}
        onChangeText={changeHandler}
        onBlur={() => onUpdate(text)}
      />
    </View>
  );
});

const createStyles = ({ colors }) => {
  const styles = {
    wrapper: {
      flexDirection: 'column'
    },
    inputs: {
      flexDirection: 'column',
      paddingHorizontal: 18,
      backgroundColor: colors.card
    },
    group: {
      flexDirection: 'column'
    },
    groupHeader: {
      fontFamily: 'serif',
      fontSize: 12,
      color: colors.border
    },
    groupBody: {
      marginLeft: 16
    },
    input: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingTop: 12,
      borderBottomWidth: 1,
      borderColor: colors.border
    },
    labelText: {
      flex: 1,
      fontFamily: 'serif',
      fontSize: 16,
      color: colors.text
    },
    inputText: {
      flex: 2,
      fontFamily: 'sans-serif',
      fontSize: 22,
      textAlign: 'right',
      color: colors.text,
      marginLeft: 24
    },
    button: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginTop: 24
    },
    buttonText: {
      fontFamily: 'serif',
      fontSize: 22,
      lineHeight: 26,
      color: colors.text
    }
  };

  return StyleSheet.create(styles);
};

const pressable = ({ colors }) => ({ pressed }) => {
  return {
    paddingVertical: 6,
    paddingHorizontal: 24,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.border,
    backgroundColor: pressed ? colors.primary : colors.card
  };
};

export default React.memo(Edit);
