import React, { Component } from 'react';
import {Text, View} from "react-native";
import STYLES from "../../constants/styles";

class WorkoutScreen extends Component {
  constructor(props){
    super(props)
    console.log(props)
  }
  render() {
    return(
        <View style={STYLES.page}>
          <View style={STYLES.main}>
            {this.props.route.params.exercises.map(o =>
                <Text>{JSON.stringify(o)}</Text>
            )}
          </View>
        </View>
        )
  }
}

export default WorkoutScreen
