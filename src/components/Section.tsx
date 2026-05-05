import { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { theme } from '../theme';

type SectionProps = {
  children: ReactNode;
};

export function Section({ children }: SectionProps) {
  return <View style={styles.container}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.lg,
  },
});