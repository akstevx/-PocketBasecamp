import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { AppHeader } from '../../components/AppHeader';
import { AppText } from '../../components/AppText';
import { ScreenContainer } from '../../components/ScreenContainer';
import { Section } from '../../components/Section';
import { GridList } from '../../components/GridList';

import { MealCard } from './components/MealCard';

import { HomeStackParamList } from '../../types/navigation';
import { Meal } from '../../types/meal';

import { getMealsByCategory } from '../../services/meals/mealsService';
import { AppLoader } from '../../components/AppLoader';
import { AppToast } from '../../components/AppToast';

type HomeNavigationProp = NativeStackNavigationProp<HomeStackParamList,'Home'>;

export function HomeScreen() {
  const navigation = useNavigation<HomeNavigationProp>();

  const [meals, setMeals] = useState<Meal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    loadMeals();
  }, []);

  async function loadMeals() {
    try {
      setErrorMessage('');
      const result = await getMealsByCategory('Chicken');
      setMeals(result);
    }catch (error) {
      setErrorMessage('Failed to load meals.');
    }finally {
      setIsLoading(false);
    }
  }

  async function refreshMeals() {
    try {
      setIsRefreshing(true);
      setErrorMessage('');
  
      const result = await getMealsByCategory('Chicken');
      setMeals(result);
    } catch (error) {
      setErrorMessage('Failed to refresh meals.');
    } finally {
      setIsRefreshing(false);
    }
  }

  function openMeal(meal: Meal) {
    navigation.navigate('MealDetails', {
      mealId: meal.id,
      mealName: meal.name,
    });
  }

  return (
    <ScreenContainer scrollable = {false}>
      <AppHeader
        title="PocketBasecamp"
        subtitle="Browse real meals from API."
      />

      {errorMessage ? (
          <AppToast
            type="error"
            message={errorMessage}
          />
        ) : null
      }

      <Section>
        <AppText variant="title">Popular Meals</AppText>
      </Section>

      { isLoading ? (
        <AppLoader message="Loading meals..." />
      ) : (
      <GridList
        data={meals}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <MealCard meal={item} onPress={openMeal} />
        )}
        columnGap={16}
        rowGap={16}
        contentBottomPadding={0}
        refreshing={isRefreshing}
        onRefresh={refreshMeals}
      />
      )}
    </ScreenContainer>
  );
}