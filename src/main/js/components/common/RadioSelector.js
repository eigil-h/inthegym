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
      paddingRight: 12
    },
    outerCircle: {
      width: 16,
      height: 16,
      borderWidth: 2,
      borderRadius: 8,
      borderColor: colors.text,
      backgroundColor: colors.card
    },
    innerCircle: {
      ...StyleSheet.absoluteFillObject,
      left: 4,
      top: 4,
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: colors.text
    },
    label: {
      color: colors.text,
      fontSize: 16
    }
  };

  return StyleSheet.create(styles);
};

export default RadioSelector;
