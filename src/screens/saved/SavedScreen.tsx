import { useCallback, useState } from 'react';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

import { AppLoader } from '../../components/AppLoader';
import { AppText } from '../../components/AppText';
import { GridList } from '../../components/GridList';
import { ScreenContainer } from '../../components/ScreenContainer';
import { Section } from '../../components/Section';
import { getSavedMeals } from '../../storage/favoritesStorage';
import { Meal } from '../../types/meal';
import { MealCard } from '../home/components/MealCard';
import { CompositeNavigationProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, RootTabParamList } from '../../types/navigation';

type SavedNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<RootTabParamList, 'Saved'>,
  NativeStackNavigationProp<RootStackParamList>
>;
export function SavedScreen() {
  const [savedMeals, setSavedMeals] = useState<Meal[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const navigation = useNavigation<SavedNavigationProp>();

  useFocusEffect(
    useCallback(() => {
      loadSavedMeals();
    }, [])
  );

  async function loadSavedMeals() {
    try {
      setIsLoading(true);
      const result = await getSavedMeals();
      setSavedMeals(result);
    } finally {
      setIsLoading(false);
    }
  }

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
        <Section>
          <AppText variant="title">No saved meals yet</AppText>
          <AppText>Meals you save will appear here.</AppText>
        </Section>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer scrollable={false} paddingBottom={0}>
      <Section>
        <AppText variant="title">Saved Meals</AppText>
      </Section>

      <GridList
        data={savedMeals}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <MealCard meal={item} onPress={openMeal} />
        )}
        columnGap={16}
        rowGap={16}
      />
    </ScreenContainer>
  );
}