import React from 'react';
import {
  Modal, Pressable, Text, View, StyleSheet
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';

const PopupDialog = ({
  isVisible,
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = 'Yes',
  cancelText = 'No',
  type = 'choice' // 'choice', 'message', or 'error'
}) => {
  const styles = createStyles(useTheme());
  const isError = type === 'error';

  return (
    <Modal
      visible={isVisible}
      animationType="fade"
      transparent
      onRequestClose={onCancel}
    >
      <View style={[styles.contentWrapper, isError && styles.errorWrapper]}>
        {isError && (
          <View style={styles.errorIconContainer}>
            <MaterialIcons name="error" size={32} color="#FF4444" />
          </View>
        )}
        <Text style={[styles.title, isError && styles.errorTitle]}>{title}</Text>
        <Text style={[styles.message, isError && styles.errorMessage]}>{message}</Text>
        <View style={styles.buttons}>
          {type === 'choice' ? (
            <>
              <Pressable
                style={[styles.button, styles.buttonChoice]}
                onPress={onConfirm}
              >
                <Text style={styles.buttonText}>{confirmText}</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonChoice]}
                onPress={onCancel}
              >
                <Text style={styles.buttonText}>{cancelText}</Text>
              </Pressable>
            </>
          ) : (
            <Pressable
              style={[
                styles.button,
                styles.buttonMessage,
                isError && styles.errorButton
              ]}
              onPress={onConfirm}
            >
              <Text style={styles.buttonText}>{isError ? 'OK' : confirmText}</Text>
            </Pressable>
          )}
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
      borderRadius: 12,
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
    errorWrapper: {
      borderWidth: 1,
      borderColor: '#FF4444',
    },
    errorIconContainer: {
      marginBottom: 15,
      alignItems: 'center',
    },
    buttons: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      width: '100%',
      marginTop: 20
    },
    button: {
      borderRadius: 8,
      padding: 12,
      elevation: 2,
      minWidth: 100,
      backgroundColor: colors.primary
    },
    buttonChoice: {
      flex: 1,
      marginHorizontal: 10
    },
    buttonMessage: {
      minWidth: 200
    },
    errorButton: {
      backgroundColor: '#FF4444',
    },
    buttonText: {
      color: colors.text,
      fontSize: 16,
      fontWeight: '600',
      textAlign: 'center'
    },
    title: {
      marginBottom: 15,
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
      color: colors.text
    },
    errorTitle: {
      color: '#FF4444',
    },
    message: {
      marginBottom: 15,
      fontSize: 16,
      textAlign: 'center',
      color: colors.text
    },
    errorMessage: {
      color: '#FF4444',
    }
  };

  return StyleSheet.create(styles);
};

export default React.memo(PopupDialog);
