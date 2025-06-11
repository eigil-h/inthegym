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
  const theme = useTheme();
  const styles = createStyles(theme);
  const isError = type === 'error';

  return (
    <Modal
      visible={isVisible}
      animationType="fade"
      transparent
      onRequestClose={onCancel}
    >
      <View style={styles.overlay}>
        <View style={[styles.contentWrapper, isError && styles.errorWrapper]}>
          {isError && (
            <View style={styles.errorIconContainer}>
              <MaterialIcons name="error" size={32} color={theme.colors.error} />
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
                <Text style={[styles.buttonText, isError && styles.errorButtonText]}>
                  {isError ? 'OK' : confirmText}
                </Text>
              </Pressable>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const createStyles = (theme) => {
  const { colors, spacing, borderRadius } = theme;

  const styles = {
    overlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center'
    },
    contentWrapper: {
      width: '85%',
      backgroundColor: colors.card,
      borderRadius: borderRadius.lg,
      padding: spacing.xl,
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
      borderColor: colors.error
    },
    errorIconContainer: {
      marginBottom: spacing.md,
      alignItems: 'center'
    },
    buttons: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      width: '100%',
      marginTop: spacing.lg
    },
    button: {
      borderRadius: borderRadius.md,
      padding: spacing.md,
      elevation: 2,
      minWidth: 100,
      backgroundColor: colors.primary
    },
    buttonChoice: {
      flex: 1,
      marginHorizontal: spacing.sm
    },
    buttonMessage: {
      minWidth: 200
    },
    errorButton: {
      backgroundColor: colors.error
    },
    buttonText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: '600',
      textAlign: 'center'
    },
    errorButtonText: {
      color: '#FFFFFF'
    },
    title: {
      marginBottom: spacing.md,
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
      color: colors.text
    },
    errorTitle: {
      color: colors.error
    },
    message: {
      marginBottom: spacing.md,
      fontSize: 16,
      textAlign: 'center',
      color: colors.text
    },
    errorMessage: {
      color: colors.text
    }
  };

  return StyleSheet.create(styles);
};

export default React.memo(PopupDialog);
