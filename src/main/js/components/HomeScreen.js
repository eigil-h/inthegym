import React, { useCallback, useEffect, useState } from 'react';
import {
  Text, Pressable, View, StyleSheet, TextInput
} from 'react-native';
import { useFocusEffect, useTheme } from '@react-navigation/native';
import loadHome, { updateWorkout as fbUpdate } from '../data/firebase';
import { noop } from '../common/fun';
import LoginPopup from './common/LoginPopup';

const NEW_WORKOUT = 'New Workout';

const HomeScreen = ({ navigation, isEditMode }) => {
  const styles = createStyles(useTheme());
  const pressableStyle = pressable(useTheme());
  const [userId, setUserId] = useState(null);
  const [workouts, setWorkouts] = useState([]);
  const [shouldReload, setShouldReload] = useState(false);

  const newWorkout = useCallback(
    (title) => {
      if (userId) {
        fbUpdate(userId, title, { exercises: [] })
          .then(setShouldReload(true));
      }
    },
    [userId]
  );

  useEffect(() => {
    if (shouldReload && userId) {
      setShouldReload(false);
      loadHome(userId, setWorkouts).then(noop);
    }
  }, [shouldReload, userId]);

  useFocusEffect(() => {
    if (userId) {
      loadHome(userId, setWorkouts).then(noop);
    }
  });

  if (!userId) {
    return (<LoginPopup onSelected={setUserId} />);
  }

  return (
    <View style={styles.screen}>
      {isEditMode && (
      <NewWorkout
        styles={styles}
        pressableStyle={pressableStyle}
        onNamed={newWorkout}
      />
      )}
      {Object.keys(workouts).map((title) => (
        <Pressable
          key={title}
          onPress={() => {
            if (isEditMode) {
              navigation.navigate('EditWorkout', {
                title,
                exercises: workouts[title],
                userId
              });
            } else {
              navigation.navigate('Workout', {
                title,
                exercises: workouts[title]
              });
            }
          }}
          style={pressableStyle}
        >
          <View style={styles.butt}>
            <Text style={styles.buttTxt}>{title}</Text>
          </View>
        </Pressable>
      ))}
    </View>
  );
};

const NewWorkout = ({
  styles,
  pressableStyle,
  onNamed
}) => {
  const [isEdit, setEdit] = useState(false);
  const [title, setTitle] = useState('');

  const editDoneHandler = useCallback(() => {
    onNamed(title);
    setEdit(false);
    setTitle('');
  }, [onNamed, title]);

  return (
    <Pressable
      key="editWO"
      onPress={() => setEdit(true)}
      style={pressableStyle}
    >
      <View style={[styles.butt, styles.newButt]}>
        {isEdit ? (
          <TextInput
            style={[styles.buttTxt, styles.newButtTxt]}
            multiline
            blurOnSubmit
            autoFocus
            placeholder={NEW_WORKOUT}
            value={title}
            onChangeText={setTitle}
            onSubmitEditing={editDoneHandler}
          />
        ) : (
          <Text style={[styles.buttTxt, styles.newButtTxt]}>{NEW_WORKOUT}</Text>
        )}
      </View>
    </Pressable>
  );
};

/*
 * STYLE
 */
const createStyles = ({ colors }) => {
  const styles = {
    screen: {
      flexDirection: 'row',
      flexWrap: 'wrap'
    },
    butt: {
      width: 100,
      height: 100,
      margin: 30,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.card
    },
    buttTxt: {
      color: colors.text,
      textAlign: 'center',
      fontSize: 18,
      fontFamily: 'serif'
    },
    newButt: {
      borderWidth: 1,
      borderStyle: 'dashed'
    },
    newButtTxt: {
      fontStyle: 'italic'
    }
  };

  return StyleSheet.create(styles);
};

const pressable = ({ colors }) => ({ pressed }) => {
  if (pressed) {
    return {
      backgroundColor: colors.background,
      shadowColor: colors.background,
      shadowOffset: {
        width: 0,
        height: 6,
      },
      shadowOpacity: 0.29,
      shadowRadius: 6.27,
      elevation: 10
    };
  }

  return {
    backgroundColor: 'transparent'
  };
};

export default HomeScreen;
