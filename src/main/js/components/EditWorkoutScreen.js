import React, {
  useCallback, useEffect, useRef, useState
} from 'react';
import {
  Platform,
  Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import {
  GestureHandlerRootView,
  PanGestureHandler
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  runOnJS
} from 'react-native-reanimated';
import Edit from './Edit';
import { updateWorkout as fbUpdate, deleteWorkout } from '../data/firebase';
import PopupDialog from './gadgets/PopupDialog';

const TEMPLATE = {
  title: 'a name',
  execution: {
    amount: 0,
    unit: 'repeats'
  },
  load: {
    amount: 0,
    unit: '',
    increase: 0
  },
  series: 1,
  pause: 30
};

const createNewExercise = () => JSON.parse(JSON.stringify(TEMPLATE));

const EditWorkoutScreen = React.memo(({
  navigation,
  route: {
    params: {
      exercises: existingExercises,
      title: workoutTitle,
      userId
    }
  }
}) => {
  const theme = useTheme();
  const styles = createStyles(theme);
  const pressableStyle = pressable(theme);
  const [exercises, setExercises] = useState(existingExercises);
  const [selected, setSelected] = useState(exercises[0]);
  const [lastSavedExercises, setLastSavedExercises] = useState(existingExercises);
  const [error, setError] = useState(null);

  // Add effect to handle empty workout deletion on navigation
  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', async (e) => {
      if (exercises.length === 0) {
        // Prevent default navigation behavior
        e.preventDefault();
        try {
          // Delete the empty workout document
          await deleteWorkout(userId, workoutTitle);
          // Then continue with navigation
          navigation.dispatch(e.data.action);
        } catch (err) {
          setError(err.message);
        }
      }
    });

    return unsubscribe;
  }, [navigation, exercises.length, userId, workoutTitle]);

  const addExercise = useCallback(
    () => {
      console.log('Adding new exercise');
      const newExercise = createNewExercise();
      setExercises((prev) => [...prev, newExercise]);
      setSelected(newExercise);
    },
    []
  );

  const updateExercise = useCallback(
    (prevTitle, exercise) => {
      console.log('Updating exercise', { prevTitle, exercise });
      if (exercise === null) {
        // Handle deletion
        setExercises((prev) => prev.filter((ex) => ex.title !== prevTitle));
        return;
      }
      setExercises((prev) => {
        const updated = prev.map((ex) => (ex.title === prevTitle ? exercise : ex));
        // If we're updating the selected exercise, update the selection
        if (selected?.title === prevTitle) {
          setSelected(exercise);
        }
        return updated;
      });
    },
    [selected]
  );

  const handleReorder = useCallback((from, to) => {
    if (from === to) return;
    const newExercises = [...exercises];
    const [removed] = newExercises.splice(from, 1);
    newExercises.splice(to, 0, removed);
    // Update selected exercise to follow its new position
    if (selected === exercises[from]) {
      setSelected(removed);
    }
    setExercises(newExercises);
  }, [exercises, selected]);

  useEffect(() => setExercises(existingExercises), [existingExercises]);

  // Only reset selection if the selected exercise is deleted
  useEffect(() => {
    if (!exercises.some((ex) => ex === selected)) {
      console.log('Selected exercise not found, resetting selection');
      setSelected(exercises[0]);
    }
  }, [exercises, selected]);

  useEffect(() => {
    if (JSON.stringify(exercises) !== JSON.stringify(lastSavedExercises)) {
      console.log('Saving exercises to Firebase:', exercises);
      fbUpdate(userId, workoutTitle, { exercises })
        .then(() => {
          console.log('Successfully saved exercises');
          setLastSavedExercises(exercises);
        })
        .catch((err) => {
          console.error('Failed to save exercises:', err);
          setError(err.message);
          setExercises(lastSavedExercises);
        });
    }
  }, [exercises, userId, workoutTitle, lastSavedExercises]);

  return (
    <GestureHandlerRootView style={styles.gestureRoot}>
      <SafeAreaView style={styles.wrapper}>
        <View style={styles.leftBar}>
          <Tabs
            styles={styles}
            exercises={exercises}
            selected={selected}
            onSelected={setSelected}
            onReorder={handleReorder}
          />
          <Pressable
            style={[styles.newButton, pressableStyle]}
            onPress={addExercise}
          >
            <Text style={styles.newButtonText}>New exercise</Text>
          </Pressable>
        </View>
        <View style={styles.main}>
          {selected ? (
            <Edit
              exercise={selected}
              onUpdate={updateExercise}
            />
          ) : <View />}
        </View>

        <PopupDialog
          isVisible={error !== null}
          type="error"
          title="Save Error"
          message={error || ''}
          onConfirm={() => setError(null)}
        />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
});

const Tabs = React.memo(({
  styles,
  exercises,
  selected,
  onSelected,
  onReorder
}) => {
  const scrollRef = useRef();
  const [height, setHeight] = useState(0);
  const [selectedY, setSelectedY] = useState(0);
  const [draggingIndex, setDraggingIndex] = useState(-1);

  const selectedHandler = useCallback((exercise, y) => {
    setSelectedY(y);
    onSelected(exercise);
  }, [onSelected]);

  const layoutHandler = useCallback(
    ({ nativeEvent }) => setHeight(nativeEvent.layout.height),
    []
  );

  useEffect(
    () => {
      if (selectedY > height) {
        scrollRef.current?.scrollTo({ y: selectedY, animated: true });
      }
    },
    [height, selectedY]
  );

  return (
    <ScrollView
      ref={scrollRef}
      onLayout={layoutHandler}
      contentContainerStyle={styles.tabs}
      showsVerticalScrollIndicator={false}
    >
      {exercises.map((ex, index) => (
        <Tab
          key={ex.title}
          styles={styles}
          exercise={ex}
          isSelected={ex === selected}
          onSelected={selectedHandler}
          index={index}
          onDragStart={() => setDraggingIndex(index)}
          onDragEnd={() => setDraggingIndex(-1)}
          isDragging={index === draggingIndex}
          onReorder={onReorder}
        />
      ))}
    </ScrollView>
  );
});

const Tab = React.memo(({
  styles,
  exercise,
  isSelected,
  onSelected,
  index,
  onDragStart,
  onDragEnd,
  isDragging,
  onReorder
}) => {
  const [y, setY] = useState(0);
  const translateY = useSharedValue(0);
  const { colors } = useTheme();

  const onLayout = useCallback((event) => {
    const { y: layoutY } = event.nativeEvent.layout;
    setY(layoutY);
  }, []);

  const panGesture = useAnimatedGestureHandler({
    onStart: () => {
      runOnJS(onDragStart)();
    },
    onActive: (event) => {
      translateY.value = event.translationY;
      const newIndex = Math.floor((y + event.translationY) / 50); // Approximate height of a tab
      if (newIndex !== index && newIndex >= 0) {
        runOnJS(onReorder)(index, newIndex);
      }
    },
    onEnd: () => {
      translateY.value = withSpring(0);
      runOnJS(onDragEnd)();
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    const baseStyle = {
      transform: [{ translateY: translateY.value }],
      zIndex: isDragging ? 1 : 0
    };

    if (Platform.OS === 'ios') {
      return {
        ...baseStyle,
        shadowColor: colors.border,
        shadowOffset: isDragging ? { width: 0, height: 2 } : { width: 0, height: 0 },
        shadowOpacity: isDragging ? 0.25 : 0,
        shadowRadius: isDragging ? 3.84 : 0
      };
    }
    return {
      ...baseStyle,
      elevation: isDragging ? 5 : 0
    };
  });

  const renderText = useCallback(() => (
    <Text
      style={styles.tabText}
      ellipsizeMode="middle"
      numberOfLines={2}
    >
      {exercise.title}
    </Text>
  ), [exercise.title, styles.tabText]);

  return (
    <PanGestureHandler onGestureEvent={panGesture}>
      <Animated.View style={animatedStyle} onLayout={onLayout}>
        {isSelected ? (
          <View style={[styles.tab, styles.selectedTab]}>
            {renderText()}
          </View>
        ) : (
          <Pressable
            key={exercise.title}
            onPress={() => onSelected(exercise, y)}
            style={styles.tab}
          >
            {renderText()}
          </Pressable>
        )}
      </Animated.View>
    </PanGestureHandler>
  );
});

/*
 * STYLE
 */
const createStyles = ({ colors }) => {
  const styles = {
    gestureRoot: {
      flex: 1
    },
    wrapper: {
      flex: 1,
      flexDirection: 'row',
      margin: 6
    },
    leftBar: {
      flex: 2,
      flexDirection: 'column',
      justifyContent: 'space-between'
    },
    main: {
      flex: 5
    },
    tabs: {
      flexDirection: 'column'
    },
    tab: {
      borderBottomWidth: 1,
      borderColor: colors.border,
      paddingVertical: 12,
      paddingLeft: 12
    },
    tabText: {
      fontFamily: 'sans-serif',
      fontSize: 18,
      color: colors.text
    },
    selectedTab: {
      backgroundColor: colors.card
    },
    newButton: {
      margin: 16,
      padding: 6
    },
    newButtonText: {
      fontFamily: 'sans-serif',
      fontStyle: 'italic',
      fontSize: 18,
      textAlign: 'center',
      color: colors.text
    }
  };

  return StyleSheet.create(styles);
};

const pressable = ({ colors }) => ({ pressed }) => {
  if (pressed) {
    return {
      padding: 6,
      borderWidth: 1,
      borderRadius: 5,
      borderColor: colors.border,
      backgroundColor: colors.primary
    };
  }

  return {
    padding: 6
  };
};

export default EditWorkoutScreen;
