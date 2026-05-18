import { useEffect, useRef } from 'react';
import {
  Animated,
  DimensionValue,
  Easing,
  StyleSheet,
} from 'react-native';

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
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 700,
          easing: Easing.linear,
          useNativeDriver: true,
        }),

        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 700,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ])
    );

    animation.start();

    return () => animation.stop();
  }, []);

  return (
    <Animated.View
      style={[
        styles.skeleton,
        {
          width,
          height,
          borderRadius,
          opacity,
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