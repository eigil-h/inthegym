import { StyleSheet } from 'react-native';

const createStyles = ({ colors }) => {
  const styles = {
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
      backgroundColor: colors.card
    },
    buttTxt: {
      color: colors.text,
      textAlign: 'center',
      fontSize: 18,
      fontFamily: 'serif'
    }
  };

  return StyleSheet.create(styles);
};

export const pressable = ({ colors }) => ({ pressed }) => {
  if (pressed) {
    return {
      backgroundColor: colors.background,
      shadowColor: colors.background,
      shadowOffset: {
        width: 0,
        height: 6,
      },
      shadowOpacity: 0.29,
      shadowRadius: 6.27,
      elevation: 10
    };
  }

  return {
    backgroundColor: 'transparent'
  };
};

export default createStyles;
