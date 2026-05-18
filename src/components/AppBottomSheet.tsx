import { Modal, Pressable, StyleSheet, View } from 'react-native';

import { AppText } from './AppText';
import { PrimaryButton } from './PrimaryButton';
import { theme } from '../theme';

type AppBottomSheetProps = {
  visible: boolean;
  title?: string;
  body?: string;
  buttonText?: string;
  onAction?: () => void;
  onClose?: () => void;
};

export function AppBottomSheet({
  visible,
  title = 'Something went wrong',
  body = 'Please try again.',
  buttonText = 'Okay',
  onAction,
  onClose,
}: AppBottomSheetProps) {
  function handleAction() {
    onAction?.();
    onClose?.();
  }

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <Pressable style={styles.backdrop} onPress={onClose}>
        <Pressable style={styles.sheet}>
          <View style={styles.handle} />

          <AppText variant="title" style={styles.title}>
            {title}
          </AppText>

          <AppText style={styles.body}>
            {body}
          </AppText>

          <PrimaryButton
            title={buttonText}
            onPress={handleAction}
          />
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.lg,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
  },
  handle: {
    width: 42,
    height: 5,
    borderRadius: 99,
    backgroundColor: theme.colors.border,
    alignSelf: 'center',
    marginBottom: theme.spacing.lg,
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
});