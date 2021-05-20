import {StyleSheet} from "react-native";

const STYLES = StyleSheet.create({
  navbar: {
    backgroundColor: '#ffa'
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
    backgroundColor: '#4af'
  },
  buttTxt: {
    color: '#fff',
    textAlign: 'center'
  },
  buttTxtLarge: {
    color: '#fff',
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
    color: 'red'
  },
  countDown: {
    marginLeft: 30,
    fontSize: 24,
    color: 'green'
  }
});

export default STYLES
