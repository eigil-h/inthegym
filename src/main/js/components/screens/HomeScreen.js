import React from 'react';
import {Text, TouchableHighlight, View} from "react-native";
import STYLES from '../../constants/styles'
import WORKOUT from "../../data/hardboiled"

const HomeScreen = ({navigation}) => (
  <View style={STYLES.screen}>
    {Object.keys(WORKOUT).map(title =>
      <TouchableHighlight key={title}
                          onPress={() => navigation.navigate('Workout', {
                            title,
                            exercises: WORKOUT[title]
                          })}>
        <View style={STYLES.butt}>
          <Text style={STYLES.buttTxt}>{title}</Text>
        </View>
      </TouchableHighlight>
    )}
  </View>
);

export default HomeScreen
