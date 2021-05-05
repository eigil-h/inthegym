import React, {Component} from 'react';
import {Text, TouchableHighlight, View} from "react-native";
import STYLES from '../../constants/styles'
import WORKOUT from "../../data/hardboiled"

class HomeScreen extends Component {
  render() {
    return (
        <View style={STYLES.page}>
          <View style={STYLES.main}>
            {Object.keys(WORKOUT).map(key =>
                <TouchableHighlight key={key}
                                    onPress={() => this.props.navigation.navigate(
                                      'Workout',
                                      {title: key, exercises: WORKOUT[key]}
                                    )}>
                  <View style={STYLES.butt}>
                    <Text style={STYLES.buttTxt}>{key}</Text>
                  </View>
                </TouchableHighlight>
            )}
          </View>
        </View>
    );
  }
}

export default HomeScreen
