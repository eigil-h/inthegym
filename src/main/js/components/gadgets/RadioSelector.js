import React from 'react';
import {
  View, Text, Pressable, StyleSheet
} from 'react-native';
import { useTheme } from '@react-navigation/native';

const RadioSelector = React.memo(({
  items,
  selectedItem,
  onSelected
}) => {
  const styles = createRadioSelectorStyles();

  return (
    <View style={styles.container}>
      {items.map((item) => (
        <RadioButton
          key={item}
          label={item}
          isSelected={selectedItem === item}
          onSelected={onSelected}
        />
      ))}
    </View>
  );
});

const createRadioSelectorStyles = () => {
  return StyleSheet.create({
    container: {
      flexDirection: 'column',
      padding: 16
    }
  });
};

const RadioButton = React.memo(({
  label,
  isSelected,
  onSelected
}) => {
  const styles = createRadioButtonStyles(useTheme());
  return (
    <Pressable
      style={styles.pressable}
      onPress={() => onSelected(label)}
    >
      <View style={styles.circleContainer}>
        <View style={styles.outerCircle} />
        {isSelected && <View style={styles.innerCircle} />}
      </View>
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
});

const createRadioButtonStyles = ({ colors }) => {
  const styles = {
    pressable: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 3
    },
    circleContainer: {
      paddingRight: 12,
      width: 24,
      height: 24,
      position: 'relative',
      justifyContent: 'center',
      alignItems: 'center'
    },
    outerCircle: {
      width: 20,
      height: 20,
      borderWidth: 2,
      borderRadius: 10,
      borderColor: colors.primary,
      backgroundColor: colors.card
    },
    innerCircle: {
      position: 'absolute',
      width: 12,
      height: 12,
      borderRadius: 6,
      backgroundColor: colors.primary,
      top: '50%',
      left: '50%',
      transform: [
        { translateX: -6 },
        { translateY: -6 }
      ]
    },
    label: {
      color: colors.text,
      fontSize: 16
    }
  };

  return StyleSheet.create(styles);
};

export default RadioSelector;
