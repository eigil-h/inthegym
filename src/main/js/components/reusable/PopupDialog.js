import React from 'react';
import {
  Modal, Pressable, Text, View, StyleSheet
} from 'react-native';
import { useTheme } from '@react-navigation/native';

const PopupDialog = ({
  isVisible,
  title,
  message,
  onConfirm,
  onCancel
}) => {
  const styles = createStyles(useTheme());

  return (
    <Modal
      visible={isVisible}
      animationType="fade"
      transparent
      onRequestClose={onCancel}
    >
      <View style={styles.contentWrapper}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.message}>{message}</Text>
        <View style={styles.buttons}>
          <Pressable
            style={[styles.button, styles.buttonConfirm]}
            onPress={onConfirm}
          >
            <Text style={styles.buttonConfirmText}>Yes</Text>
          </Pressable>
          <Pressable
            style={[styles.button, styles.buttonCancel]}
            onPress={onCancel}
          >
            <Text style={styles.buttonCancelText}>No</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const createStyles = ({ colors }) => {
  const styles = {
    contentWrapper: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
      marginBottom: '50%',
      marginHorizontal: 42,
      backgroundColor: colors.card,
      borderRadius: 6,
      padding: 35,
      shadowColor: colors.border,
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    buttons: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'baseline',
      width: '100%'
    },
    button: {
      borderRadius: 6,
      padding: 10,
      elevation: 2
    },
    buttonConfirm: {
      backgroundColor: colors.primary,
    },
    buttonCancel: {
      backgroundColor: colors.background,
      padding: 50
    },
    buttonConfirmText: {
      color: colors.text,
      textAlign: 'center'
    },
    buttonCancelText: {
      color: colors.text,
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center'
    },
    title: {
      marginBottom: 15,
      fontSize: 18,
      textAlign: 'center'
    },
    message: {
      marginBottom: 15,
      textAlign: 'center'
    }
  };

  return StyleSheet.create(styles);
};

export default React.memo(PopupDialog);
