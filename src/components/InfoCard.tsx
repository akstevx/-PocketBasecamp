import { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { theme } from '../theme';

type InfoCardProps = {
  children: ReactNode;
};

export function InfoCard({ children }: InfoCardProps) {
  return <View style={styles.card}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: 16,
    padding: theme.spacing.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
});