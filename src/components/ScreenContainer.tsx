import { ReactNode } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { theme } from '../theme';

type ScreenContainerProps = {
  children: ReactNode;
  scrollable?: boolean;
  paddingTop?: number;
  paddingBottom?: number;
  paddingHorizontal?: number;
  includeTopInset?: boolean;
  includeBottomInset?: boolean;
};

export function ScreenContainer({
  children,
  scrollable = true,
  paddingTop = theme.spacing.sm,
  paddingBottom = 0,
  paddingHorizontal = theme.spacing.lg,
  includeTopInset = true,
  includeBottomInset = true,
}: ScreenContainerProps) {
  const insets = useSafeAreaInsets();

  const contentStyle = {
    paddingTop: (includeTopInset ? insets.top : 0) + paddingTop,
    paddingBottom: (includeBottomInset ? insets.bottom : 0) + paddingBottom,
    paddingHorizontal,
  };

  if (!scrollable) {
    return <View style={[styles.container, contentStyle]}>{children}</View>;
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={contentStyle}
      showsVerticalScrollIndicator={false}
    >
      {children}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
});