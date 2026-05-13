import { StyleSheet, View, DimensionValue } from 'react-native';
import { theme } from '../theme';

type SkeletonBoxProps = {
  width?: DimensionValue;
  height: number;
  borderRadius?: number;
};

export function SkeletonBox({
  width = '100%',
  height,
  borderRadius = 12,
}: SkeletonBoxProps) {
  return (
    <View
      style={[
        styles.skeleton,
        {
          width,
          height,
          borderRadius,
        },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  skeleton: {
    backgroundColor: theme.colors.border,
  },
});