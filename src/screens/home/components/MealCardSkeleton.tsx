import { StyleSheet, View } from 'react-native';

import { SkeletonBox } from '../../../components/SkeletonBox';
import { theme } from '../../../theme';

export function MealCardSkeleton() {
  return (
    <View style={styles.container}>
      <SkeletonBox
        height={140}
        borderRadius={12}
      />

      <View style={styles.content}>
        <SkeletonBox
          height={20}
          width="80%"
        />

        <View style={styles.spacing} />

        <SkeletonBox
          height={16}
          width="60%"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.surface,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  content: {
    padding: theme.spacing.md,
  },
  spacing: {
    height: theme.spacing.sm,
  },
});