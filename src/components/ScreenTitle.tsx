import { StyleSheet, Text } from 'react-native';
import { theme } from '../theme';

type ScreenTitleProps = {
  title: string;
};

export function ScreenTitle({ title }: ScreenTitleProps) {
  return <Text style={styles.title}>{title}</Text>;
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: theme.colors.textPrimary,
  },
});