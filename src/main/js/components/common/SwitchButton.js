import React from 'react';
import {
  View, Text, Switch, StyleSheet
} from 'react-native';
import { useTheme } from '@react-navigation/native';

const SwitchButton = ({
  labels,
  isEnabled,
  onToggleSwitch
}) => {
  const theme = useTheme();
  const { colors } = theme;
  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{isEnabled ? labels[1] : labels[0]}</Text>
      <Switch
        trackColor={{ false: colors.card, true: colors.card }}
        thumbColor={isEnabled ? colors.primary : colors.card}
        onValueChange={onToggleSwitch}
        value={isEnabled}
      />
    </View>
  );
};

const createStyles = ({ colors }) => {
  const styles = {
    container: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 4
    },
    label: {
      color: colors.text,
      fontSize: 16,
      paddingRight: 4
    }
  };

  return StyleSheet.create(styles);
};

export default React.memo(SwitchButton);
