import { Image, Pressable, StyleSheet } from 'react-native';
import { AppText } from '../../../components/AppText';
import { theme } from '../../../theme';
import { Meal } from '../../../types/meal';
import { Ionicons } from '@expo/vector-icons';
import { View } from 'react-native';
import { useFavoritesStore } from '../../../store/favoritesStore';


type MealCardProps = {
  meal: Meal;
  onPress: (meal: Meal) => void;
};

export function MealCard({ meal, onPress }: MealCardProps) {

  const savedMeals = useFavoritesStore((state) => state.savedMeals);
  const isSaved = savedMeals.some((savedMeal) => savedMeal.id === meal.id);

  return (
    <Pressable style={styles.card} onPress={() => onPress(meal)}>
        <View style={styles.favoriteBadge}>
          <Ionicons
            name={isSaved ? 'heart' : 'heart-outline'}
            size={20}
            color={
              isSaved
                ? theme.colors.secondary
                : theme.colors.textPrimary
            }          />
      </View>
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

  favoriteBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: theme.colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
});
