import React from 'react';
import {Text, View, FlatList, TouchableHighlight} from "react-native";
import STYLES from "../../constants/styles";

const WorkoutScreen = ({route: {params: {exercises}}, navigation}) => (
  <View style={STYLES.screen}>
    <FlatList data={exercises}
              renderItem={({item}) => <Exercise exercise={item} navigation={navigation}/>}
              keyExtractor={(item, index) => item.title}/>
  </View>
);

const Exercise = ({exercise, navigation}) => (
  <TouchableHighlight key={exercise.title}
                      onPress={() => navigation.navigate('Exercise', {
                        title: exercise.title,
                        exercise
                      })}>
    <View>
      <Text style={STYLES.listItem}>{exercise.title}</Text>
    </View>
  </TouchableHighlight>
);

export default WorkoutScreen
