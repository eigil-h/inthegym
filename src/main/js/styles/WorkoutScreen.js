import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    flexDirection: 'column'
  },
  mainContainer: {
    flex: 27
  },
  sideContainer: {
    flex: 23,
    flexDirection: 'row'
  },
  listContainer: {
    flex: 27,
    flexDirection: 'column',
    paddingLeft: 10
  },
  detailsContainer: {
    flex: 23,
    flexDirection: 'column'
  }
});

export default styles;
