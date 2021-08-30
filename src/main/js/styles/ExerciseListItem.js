import { StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';

const createStyles = () => {
  const { colors } = useTheme();

  const styles = {
    wrapper: {
      width: '90%',
      height: 60,
      marginVertical: 5,
      alignItems: 'center',
      justifyContent: 'center',
      borderTopRightRadius: 40,
      borderBottomRightRadius: 40
    },
    past: {
      backgroundColor: colors.card
    },
    present: {
      backgroundColor: colors.primary,
      width: '100%',
      height: 70,
      marginVertical: 0
    },
    future: {
      backgroundColor: colors.card
    }
  };

  return StyleSheet.create(styles);
};

export default createStyles;
