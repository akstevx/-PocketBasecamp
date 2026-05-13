import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';

import { AppText } from './AppText';
import { theme } from '../theme';

type EmptyStateProps = {
  title: string;
  message: string;
  paddingTop?: number;
  paddingBottom?: number;
  icon?: keyof typeof Ionicons.glyphMap;
};

export function EmptyState({
  title,
  message,
  icon = 'alert-circle-outline',
  paddingTop = 0,
  paddingBottom = 120,
}: EmptyStateProps) {
  return (
    <View
      style={[
        styles.container,
        {
          paddingTop,
          paddingBottom,
        },
      ]}
    >
      <Ionicons
        name={icon}
        size={56}
        color={theme.colors.textSecondary}
      />

      <View style={styles.spacing} />

      <AppText variant="title" style={styles.title}>
        {title}
      </AppText>

      <AppText style={styles.message}>
        {message}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.xl,
  },
  spacing: {
    height: theme.spacing.md,
  },
  title: {
    textAlign: 'center',
  },
  message: {
    marginTop: theme.spacing.sm,
    textAlign: 'center',
    color: theme.colors.textSecondary,
  },
});