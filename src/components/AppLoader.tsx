import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { AppText } from './AppText';
import { theme } from '../theme';

type AppLoaderProps = {
  message?: string;
};

export function AppLoader({ message = 'Loading...' }: AppLoaderProps) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={theme.colors.textPrimary} />
      <AppText style={styles.message}>{message}</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.lg,
  },
  message: {
    marginTop: theme.spacing.sm,
    color: theme.colors.textSecondary,
  },
});