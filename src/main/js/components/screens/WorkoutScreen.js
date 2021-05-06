import React from 'react';
import {Text, View, FlatList, TouchableHighlight} from "react-native";
import STYLES from "../../constants/styles";

const WorkoutScreen = ({route: {params: {exercises}}, navigation}) => (
  <View style={STYLES.page}>
    <View style={STYLES.main}>
      <FlatList data={exercises}
                renderItem={({item}) => (
                  <TouchableHighlight key={item.title}
                                      onPress={() => navigation.navigate('Exercise', {
                                        title: item.title,
                                        exercise: item
                                      })}>
                    <View>
                      <Text style={STYLES.listItem}>{item.title}</Text>
                    </View>
                  </TouchableHighlight>
                )}
                keyExtractor={(item, index) => item.title}/>
    </View>
  </View>
);

export default WorkoutScreen
