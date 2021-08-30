import { StyleSheet } from 'react-native';

const blackTransparent = '#00000050';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'row'
  },
  amounts: {
    flex: 1,
    flexDirection: 'column',
    padding: 5,
    justifyContent: 'space-evenly'
  },
  units: {
    flex: 1,
    flexDirection: 'column',
    padding: 5,
    justifyContent: 'space-evenly',
    borderLeftWidth: StyleSheet.hairlineWidth,
    borderColor: blackTransparent
  },
  amountsText: {
    fontFamily: 'sans-serif',
    fontSize: 16,
    textAlign: 'right'
  },
  unitsText: {
    fontFamily: 'sans-serif',
    fontSize: 16
  }
});

export default styles;
