import React, {Component} from 'react';
import {Text, View} from "react-native";
import STYLES from "../../constants/styles";


class ExerciseScreen extends Component {
  constructor(props) {
    super(props);
    console.log(props);
  }

  render() {
    return (
        <View style={STYLES.page}>
          <View style={STYLES.main}>
            <Text>jupp</Text>
          </View>
        </View>
    )
  }
}

export default ExerciseScreen