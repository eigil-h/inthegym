import React from 'react';
import {Text, TouchableHighlight, View} from "react-native";
import STYLES from '../../constants/styles'
import WORKOUT from "../../data/hardboiled"

const HomeScreen = ({navigation}) => (
  <View style={STYLES.screen}>
    {Object.keys(WORKOUT).map(key =>
      <TouchableHighlight key={key}
                          onPress={() => navigation.navigate(
                            'Workout',
                            {title: key, exercises: WORKOUT[key]}
                          )}>
        <View style={STYLES.butt}>
          <Text style={STYLES.buttTxt}>{key}</Text>
        </View>
      </TouchableHighlight>
    )}
  </View>
);

export default HomeScreen
