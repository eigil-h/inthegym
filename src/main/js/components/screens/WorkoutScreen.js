import React, {Component} from 'react';
import {Text, View, FlatList, TouchableHighlight} from "react-native";
import STYLES from "../../constants/styles";

class WorkoutScreen extends Component {
  constructor(props) {
    super(props);
    console.log(props);
  }

  render() {
    return (
        <View style={STYLES.page}>
          <View style={STYLES.main}>
            <FlatList data={this.props.route.params.exercises}
                      renderItem={({item}) => (
                          <TouchableHighlight key={item.title}
                                              onPress={() => this.props.navigation.navigate('Exercise', {
                                                title: item.title,
                                                exercise: item
                                              })}>
                            <View>
                              <Text style={STYLES.listItem}>{item.title}</Text>
                            </View>
                          </TouchableHighlight>
                      )}/>
          </View>
        </View>
    )
  }
}

export default WorkoutScreen
