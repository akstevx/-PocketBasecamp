import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppText } from './AppText';
import { theme } from '../theme';

type FloatingHeaderProps = {
  title?: string;
  onBackPress: () => void;
};

export function FloatingHeader({ title, onBackPress }: FloatingHeaderProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Pressable style={styles.backButton} onPress={onBackPress}>
        <Ionicons name="chevron-back" size={24} color={theme.colors.textPrimary} />
      </Pressable>

      {title ? <AppText style={styles.title}>{title}</AppText> : null}

      <View style={styles.rightPlaceholder} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top:10,
    left: 0,
    right: 0,
    zIndex: 10,
    height: 96,
    paddingHorizontal: theme.spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.85)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontWeight: '700',
  },
  rightPlaceholder: {
    width: 40,
  },
});