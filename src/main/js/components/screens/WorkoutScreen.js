import React from 'react';
import {Text, View, FlatList, TouchableHighlight} from "react-native";
import STYLES from "../../constants/styles";

const WorkoutScreen = (props) => (
    <View style={STYLES.page}>
      <View style={STYLES.main}>
        <FlatList data={props.route.params.exercises}
                  renderItem={({item}) => (
                      <TouchableHighlight key={item.title}
                                          onPress={() => props.navigation.navigate('Exercise', {
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
