import { ReactNode } from 'react';
import { StyleSheet, Text, TextStyle } from 'react-native';
import { theme } from '../theme';

type Variant = 'body' | 'title' | 'caption';

type AppTextProps = {
  children: ReactNode;
  variant?: Variant;
  style?: TextStyle;
};

export function AppText({
  children,
  variant = 'body',
  style,
}: AppTextProps) {
  return <Text style={[styles.base, styles[variant], style]}>{children}</Text>;
}

const styles = StyleSheet.create({
  base: {
    color: theme.colors.textPrimary,
  },
  body: {
    fontSize: 16,
    lineHeight: 22,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
  },
  caption: {
    fontSize: 13,
    color: theme.colors.textSecondary,
  },
});