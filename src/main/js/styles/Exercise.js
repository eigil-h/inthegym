import { Dimensions, StyleSheet } from 'react-native';

const overlayBackgroundColor = 'transparent';
const buttonTextColor = '#000';
const pressedBackgroundColor = '#00000060';
const redColor = '#f00';
const greenColor = '#0f0';

const { height: windowHeight } = Dimensions.get('window');

const shared = StyleSheet.create({
  pressTxt: {
    color: buttonTextColor,
    textAlign: 'center',
    paddingTop: 0.15 * windowHeight,
    fontSize: 56
  },
  exercise: {
    ...StyleSheet.absoluteFillObject
  },
  description: {
    padding: 10,
    fontSize: 18,
    fontStyle: 'italic'
  },
  instruction: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 30,
    marginLeft: 30
  },
  series: {
    fontSize: 24,
    color: redColor
  },
  countDown: {
    fontSize: 24,
    color: greenColor
  }
});

export const pressable = ({ pressed }) => [{
  ...StyleSheet.absoluteFillObject,
  backgroundColor: pressed
    ? pressedBackgroundColor
    : overlayBackgroundColor
}];

export default shared;
