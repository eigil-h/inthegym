import { StyleSheet } from 'react-native';

const navbarBackgroundColor = '#ffa';
const buttonBackgroundColor = '#4af';
const buttonTextColor = '#fff';
const redColor = '#f00';
const greenColor = '#0f0';

const STYLES = StyleSheet.create({
  navbar: {
    backgroundColor: navbarBackgroundColor
  },
  screen: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  butt: {
    width: 100,
    height: 100,
    margin: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: buttonBackgroundColor
  },
  buttTxt: {
    color: buttonTextColor,
    textAlign: 'center'
  },
  buttTxtLarge: {
    color: buttonTextColor,
    fontSize: 36
  },
  listItem: {
    padding: 10,
    fontSize: 18,
    height: 44
  },
  description: {
    padding: 10,
    fontSize: 18,
    fontStyle: 'italic'
  },
  detail: {
    padding: 10,
    fontSize: 24
  },
  exercise: {
    flexDirection: 'column'
  },
  series: {
    marginLeft: 30,
    fontSize: 24,
    color: redColor
  },
  countDown: {
    marginLeft: 30,
    fontSize: 24,
    color: greenColor
  }
});

export const pressableStyle = ({ pressed }) => [{
  backgroundColor: pressed
    ? 'yellow'
    : 'transparent'
}];

export default STYLES;
