import { useCallback } from 'react';
import {
  CompositeNavigationProp,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppLoader } from '../../components/AppLoader';
import { AppText } from '../../components/AppText';
import { GridList } from '../../components/GridList';
import { ScreenContainer } from '../../components/ScreenContainer';
import { Section } from '../../components/Section';
import { useFavoritesStore } from '../../store/favoritesStore';
import {
  RootStackParamList,
  RootTabParamList,
} from '../../types/navigation';
import { Meal } from '../../types/meal';
import { MealCard } from '../home/components/MealCard';
import { EmptyState } from '../../components/EmptyState';

type SavedNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<RootTabParamList, 'Saved'>,
  NativeStackNavigationProp<RootStackParamList>
>;

export function SavedScreen() {
  const navigation = useNavigation<SavedNavigationProp>();

  const { savedMeals, isLoading, loadSavedMeals,} = useFavoritesStore();

  useFocusEffect(
    useCallback(() => {
      loadSavedMeals();
    }, [])
  );

  function openMeal(meal: Meal) {
    navigation.navigate('MealDetails', {
      mealId: meal.id,
      mealName: meal.name,
    });
  }

  if (isLoading) {
    return (
      <ScreenContainer>
        <AppLoader message="Loading saved meals..." />
      </ScreenContainer>
    );
  }

  if (savedMeals.length === 0) {
    return (
    <ScreenContainer>
        <EmptyState
          icon="heart-outline"
          title="No saved meals yet"
          message="Meals you save will appear here."
          paddingTop={120}
        />
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer
      scrollable={false}
      paddingBottom={0}
      paddingTop={-20}
    >
      <Section>
        <AppText variant="title">
          Saved Meals
        </AppText>
      </Section>

      <GridList
        data={savedMeals}
        keyExtractor={(item, index) => item?.id ?? `placeholder-${index}`}
        renderItem={({ item }) => (
          <MealCard
            meal={item}
            onPress={openMeal}
          />
        )}
        columnGap={16}
        rowGap={16}
      />
    </ScreenContainer>
  );
}