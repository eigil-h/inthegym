import React, {
  useCallback,
  useEffect,
  useState,
  useRef
} from 'react';
import {
  StyleSheet, View, Text, TextInput, Pressable, ScrollView
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import RadioSelector from './gadgets/RadioSelector';

const SAVE_DEBOUNCE_MS = 1000; // 1 second debounce for auto-save

const Edit = ({ exercise: original, onUpdate }) => {
  const theme = useTheme();
  const styles = createStyles(theme);
  const pressableStyle = pressable(theme);
  const [exercise, setExercise] = useState(original);
  const [saveStatus, setSaveStatus] = useState(''); // '', 'saving', 'saved'
  const saveTimeoutRef = useRef(null);

  const debouncedSave = useCallback((updatedExercise) => {
    setSaveStatus('saving');
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }
    saveTimeoutRef.current = setTimeout(() => {
      onUpdate(original.title, updatedExercise);
      setSaveStatus('saved');
      // Clear "saved" status after 2 seconds
      setTimeout(() => setSaveStatus(''), 2000);
    }, SAVE_DEBOUNCE_MS);
  }, [onUpdate, original.title]);

  const updateExercise = useCallback((updater) => {
    setExercise((prev) => {
      const updated = updater(prev);
      debouncedSave(updated);
      return updated;
    });
  }, [debouncedSave]);

  const setTitle = useCallback((value) => {
    if (!value) return;
    updateExercise((prev) => ({ ...prev, title: value }));
  }, [updateExercise]);

  const setExecutionAmount = useCallback((value) => {
    updateExercise((prev) => ({ ...prev, execution: { ...prev.execution, amount: Number(value) } }));
  }, [updateExercise]);

  const setExecutionUnit = useCallback((value) => {
    updateExercise((prev) => ({ ...prev, execution: { ...prev.execution, unit: value } }));
  }, [updateExercise]);

  const setLoadAmount = useCallback((value) => {
    updateExercise((prev) => ({ ...prev, load: { ...prev.load, amount: Number(value) } }));
  }, [updateExercise]);

  const setLoadUnit = useCallback((value) => {
    updateExercise((prev) => ({ ...prev, load: { ...prev.load, unit: value } }));
  }, [updateExercise]);

  const setLoadIncrease = useCallback((value) => {
    updateExercise((prev) => ({ ...prev, load: { ...prev.load, increase: Number(value) } }));
  }, [updateExercise]);

  const setSeries = useCallback((value) => {
    if (value < 1) return;
    updateExercise((prev) => ({ ...prev, series: Number(value) }));
  }, [updateExercise]);

  const setPause = useCallback((value) => {
    updateExercise((prev) => ({ ...prev, pause: Number(value) }));
  }, [updateExercise]);

  const numberFilter = useCallback((text) => (text.match(/\d*/g)), []);
  const noFilter = useCallback(() => true, []);

  useEffect(() => {
    setExercise(original);
  }, [original]);

  useEffect(() => {
    // Cleanup any pending save timeouts
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, []);

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
        <View style={styles.buttonContent}>
          <Pressable
            style={pressableStyle}
            onPress={() => onUpdate(original.title, null)}
          >
            <Ionicons
              name="trash-bin"
              style={styles.buttonIcon}
            />
          </Pressable>
          <Text style={styles.saveStatus}>
            {saveStatus === 'saving' ? 'Saving...' : saveStatus === 'saved' ? 'Saved' : ''}
          </Text>
        </View>
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
      justifyContent: 'center',
      marginTop: 24,
      paddingHorizontal: 18
    },
    buttonContent: {
      width: '60%',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      gap: 24
    },
    buttonIcon: {
      fontSize: 24,
      color: colors.text
    },
    saveStatus: {
      fontFamily: 'sans-serif',
      fontSize: 16,
      color: colors.text,
      opacity: 0.7
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
