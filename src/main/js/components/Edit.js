import React, { useCallback, useEffect, useState } from 'react';
import {
  StyleSheet, View, Text, TextInput, Pressable
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import RadioSelector from './common/RadioSelector';

const Edit = ({ exercise: original, onUpdate }) => {
  const theme = useTheme();
  const styles = createStyles(theme);
  const pressableStyle = pressable(theme);
  const [exercise, setExercise] = useState(original);

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
    <View style={styles.wrapper}>
      <View style={styles.inputs}>
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
            label="increase by"
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
      <View style={styles.save}>
        <Pressable
          style={pressableStyle}
          onPress={() => onUpdate(exercise)}
        >
          <Text style={styles.labelText}>Save</Text>
        </Pressable>
      </View>
    </View>
  );
};

const Group = ({
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
);

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
      paddingHorizontal: 12,
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
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: 12,
      borderBottomWidth: 1,
      borderColor: colors.border
    },
    labelText: {
      fontFamily: 'serif',
      fontSize: 16,
      color: colors.text
    },
    inputText: {
      fontFamily: 'sans-serif',
      fontSize: 18,
      color: colors.text,
      marginLeft: 24
    },
    save: {
      flexDirection: 'column',
      alignItems: 'center',
      marginTop: 24
    }
  };

  return StyleSheet.create(styles);
};

const pressable = ({ colors }) => ({ pressed }) => {
  if (pressed) {
    return {
      paddingVertical: 6,
      paddingHorizontal: 24,
      borderWidth: 1,
      borderRadius: 5,
      borderColor: colors.border,
      backgroundColor: colors.primary
    };
  }

  return {
    paddingVertical: 6,
    paddingHorizontal: 24,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.border,
    backgroundColor: colors.card
  };
};

export default React.memo(Edit);
