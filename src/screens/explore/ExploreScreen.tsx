import { useEffect, useState } from 'react';
import {
  CompositeNavigationProp,
  useNavigation,
} from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { AppText } from '../../components/AppText';
import { AppToast } from '../../components/AppToast';
import { EmptyState } from '../../components/EmptyState';
import { GridList } from '../../components/GridList';
import { ScreenContainer } from '../../components/ScreenContainer';
import { SearchInput } from '../../components/SearchInput';
import { Section } from '../../components/Section';
import { useAsync } from '../../hooks/useAsync';
import { useDebounce } from '../../hooks/useDebounce';
import { searchMealsByName } from '../../services/meals/mealsService';
import { Meal } from '../../types/meal';
import {
  RootStackParamList,
  RootTabParamList,
} from '../../types/navigation';

import { MealCard } from '../home/components/MealCard';
import { MealCardSkeleton } from '../home/components/MealCardSkeleton';

type ExploreNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<RootTabParamList, 'Explore'>,
  NativeStackNavigationProp<RootStackParamList>
>;

export function ExploreScreen() {
  const navigation = useNavigation<ExploreNavigationProp>();

  const [query, setQuery] = useState('');
  const [meals, setMeals] = useState<Meal[]>([]);

  const { isLoading, errorMessage, execute, clearError } = useAsync();

  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    const trimmedQuery = debouncedQuery.trim();

    if (trimmedQuery.length < 2) {
      setMeals([]);
      clearError();
      return;
    }

    loadMeals(trimmedQuery);
  }, [debouncedQuery]);

  async function loadMeals(searchQuery: string) {
    const result = await execute(() =>
      searchMealsByName(searchQuery)
    );

    if (result) {
      setMeals(result);
    }
  }

  function openMeal(meal: Meal) {
    navigation.navigate('MealDetails', {
      mealId: meal.id,
      mealName: meal.name,
    });
  }

  return (
    <ScreenContainer
      scrollable={false}
      paddingBottom={0}
      paddingTop={-20}
    >
      <Section>
        <AppText variant="title">Explore Meals</AppText>
      </Section>

      <Section>
        <SearchInput
          value={query}
          placeholder="Search meals..."
          onChangeText={setQuery}
        />
      </Section>

      {errorMessage ? (
        <AppToast
          type="error"
          message={errorMessage}
        />
      ) : null}

      {isLoading ? (
        <GridList
          data={[1, 2, 3, 4, 5, 6]}
          keyExtractor={(item) => item?.toString() ?? ""} 
          renderItem={() => <MealCardSkeleton />}
          columnGap={16}
          rowGap={16}
        />
      ) : query.trim().length < 2 ? (
        <EmptyState
          icon="search-outline"
          title="Search meals"
          message="Find your favorite meals by name."
          paddingBottom={200}
        />
      ) : meals.length === 0 ? (
        <EmptyState
          icon="restaurant-outline"
          title="No meals found"
          message="Try searching with another keyword."
          paddingBottom={200}
        />
      ) : (
        <GridList
          data={meals}
          keyExtractor={(item, index) =>
            item?.id ?? `placeholder-${index}`
          }
          renderItem={({ item }) =>
            item ? (
              <MealCard
                meal={item}
                onPress={openMeal}
              />
            ) : null
          }
          columnGap={16}
          rowGap={16}
        />
      )}
    </ScreenContainer>
  );
}