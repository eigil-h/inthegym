import React from 'react';
import {
  Text, View, FlatList, Pressable
} from 'react-native';
import STYLES, { pressableStyle } from '../../constants/styles';

const WorkoutScreen = ({ route: { params: { exercises } }, navigation }) => (
  <View style={STYLES.screen}>
    <FlatList
      data={exercises}
      renderItem={({ item }) => (
        <Exercise
          exercise={item}
          navigation={navigation}
        />
      )}
      keyExtractor={(item) => item.title}
    />
  </View>
);

const Exercise = ({ exercise, navigation }) => (
  <Pressable
    onPress={() => navigation.navigate('Exercise', {
      title: exercise.title,
      exercise
    })}
    style={pressableStyle}
  >
    <View>
      <Text style={STYLES.listItem}>{exercise.title}</Text>
    </View>
  </Pressable>
);

export default WorkoutScreen;
