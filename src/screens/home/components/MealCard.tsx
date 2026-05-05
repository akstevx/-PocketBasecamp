import { Image, Pressable, StyleSheet } from 'react-native';
import { AppText } from '../../../components/AppText';
import { theme } from '../../../theme';
import { Meal } from '../../../types/meal';

type MealCardProps = {
  meal: Meal;
  onPress: (meal: Meal) => void;
};

export function MealCard({ meal, onPress }: MealCardProps) {
  return (
    <Pressable style={styles.card} onPress={() => onPress(meal)}>
      <Image source={{ uri: meal.thumbnail }} style={styles.image} />

      <AppText variant="title" style={styles.title}>
        {meal.name}
      </AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: theme.colors.surface,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginBottom: theme.spacing.md,
  },
  image: {
    width: '100%',
    height: 130,
  },
  title: {
    fontSize: 15,
    padding: theme.spacing.sm,
    textAlign: 'center'
  },
});