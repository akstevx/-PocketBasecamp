import { StyleSheet, View } from 'react-native';
import { AppText } from './AppText';
import { theme } from '../theme';

type ToastType = 'success' | 'error' | 'info';

type AppToastProps = {
  message: string;
  type?: ToastType;
};

export function AppToast({ message, type = 'info' }: AppToastProps) {
  return (
    <View style={[styles.container, styles[type]]}>
      <AppText style={styles.text}>{message}</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.md,
    borderRadius: 12,
    marginBottom: theme.spacing.md,
  },
  success: {
    backgroundColor: '#E8F7EE',
  },
  error: {
    backgroundColor: '#FDECEC',
  },
  info: {
    backgroundColor: '#EEF2FF',
  },
  text: {
    fontWeight: '600',
  },
});