import React from 'react';
import {Text, Pressable, View} from "react-native";
import STYLES, {pressableStyle} from '../../constants/styles'
import WORKOUT from "../../data/hardboiled"

const HomeScreen = ({navigation}) => (
  <View style={STYLES.screen}>
    {Object.keys(WORKOUT).map(title =>
      <Pressable
        key={title}
        onPress={() => navigation.navigate('Workout', {
          title,
          exercises: WORKOUT[title]
        })}
        style={pressableStyle}
      >
        <View style={STYLES.butt}>
          <Text style={STYLES.buttTxt}>{title}</Text>
        </View>
      </Pressable>
    )}
  </View>
);

export default HomeScreen
