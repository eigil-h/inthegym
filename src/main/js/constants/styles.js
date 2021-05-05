import {StyleSheet} from "react-native";

const STYLES = StyleSheet.create({
  page: {
  },
  navbar: {
    backgroundColor: '#ffa'
  },
  main: {
    flexGrow: 1.0,
    flexDirection: 'row',
    flexWrap: 'wrap',
    direction: 'inherit'
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
    color: '#fff'
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
  }
});

export default STYLES
