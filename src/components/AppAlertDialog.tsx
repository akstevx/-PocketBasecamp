import { Modal, Pressable, StyleSheet, View } from 'react-native';

import { AppText } from './AppText';
import { PrimaryButton } from './PrimaryButton';
import { theme } from '../theme';

type AppAlertDialogProps = {
  visible: boolean;

  title?: string;
  body?: string;

  singleOption?: boolean;

  positiveButtonText?: string;
  negativeButtonText?: string;

  onPositiveAction?: () => void;
  onNegativeAction?: () => void;

  onDismiss?: () => void;
};

export function AppAlertDialog({
  visible,

  title = 'Confirm Action',
  body = 'Are you sure you want to continue?',

  singleOption = false,

  positiveButtonText = 'Confirm',
  negativeButtonText = 'Cancel',

  onPositiveAction,
  onNegativeAction,

  onDismiss,
}: AppAlertDialogProps) {
  function handlePositiveAction() {
    onPositiveAction?.();
    onDismiss?.();
  }

  function handleNegativeAction() {
    onNegativeAction?.();
    onDismiss?.();
  }

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onDismiss}
    >
      <Pressable
        style={styles.backdrop}
        onPress={onDismiss}
      >
        <Pressable style={styles.dialog}>
          <AppText
            variant="title"
            style={styles.title}
          >
            {title}
          </AppText>

          <AppText style={styles.body}>
            {body}
          </AppText>

          <View style={styles.buttonContainer}>
            {!singleOption ? (
              <View style={styles.secondaryButton}>
                <PrimaryButton
                  title={negativeButtonText}
                  variant="secondary"
                  onPress={handleNegativeAction}
                />
              </View>
            ) : null}

            <View style={styles.primaryButton}>
              <PrimaryButton
                title={positiveButtonText}
                onPress={handlePositiveAction}
              />
            </View>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
  },
  dialog: {
    width: '100%',
    backgroundColor: theme.colors.surface,
    borderRadius: 24,
    padding: theme.spacing.lg,
  },
  title: {
    textAlign: 'center',
    marginBottom: theme.spacing.sm,
  },
  body: {
    textAlign: 'center',
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.lg,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: theme.spacing.md,
  },
  secondaryButton: {
    flex: 1,
  },
  primaryButton: {
    flex: 1,
  },
});