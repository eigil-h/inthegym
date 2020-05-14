import React, {Component} from 'react';
import {Text, TouchableHighlight, View} from "react-native";
import STYLES from "../../constants/styles";

class ExerciseScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSeries: 0,
      countDown: this.props.route.params.exercise['pause'],
      active: false
    };
  }

  render() {
    const { active } = this.state;
    return (
        <View style={STYLES.page}>
          <View style={STYLES.main}>
            <Text style={STYLES.description}>"{this.props.route.params.exercise['description']}"</Text>
            <Text style={STYLES.detail}>{this.props.route.params.exercise['repeats']} repeats of {this.props.route.params.exercise['amount']} {this.props.route.params.exercise['unit']} in {this.props.route.params.exercise['series']} series</Text>
            <TouchableHighlight key="startButton" onPress={() => this.setState({active: true})}>
              <View style={STYLES.butt}>
                <Text style={STYLES.buttTxt}>START</Text>
              </View>
            </TouchableHighlight>
          </View>
        </View>
    )
  }
}

export default ExerciseScreen
