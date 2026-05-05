import { API_BASE_URL } from '../../constants/api';
import { logRepositoryOperation } from '../../utils/logger';
import { Meal, MealApiModel, MealApiResponse } from '../../types/meal';

function mapMealApiToMeal(meal: MealApiModel): Meal {
  return {
    id: meal.idMeal,
    name: meal.strMeal,
    category: meal.strCategory ?? '',
    area: meal.strArea ?? '',
    instructions: meal.strInstructions ?? '',
    thumbnail: meal.strMealThumb ?? '',
    youtubeUrl: meal.strYoutube ?? '',
  };
}

export async function getMealById(mealId: string): Promise<Meal> {
  return logRepositoryOperation(
    {
      source: 'remote',
      operation: 'getMealById',
      input: { mealId },
    },
    async () => {
      const response = await fetch(`${API_BASE_URL}/lookup.php?i=${mealId}`);

      if (!response.ok) {
        throw new Error('Failed to fetch meal details');
      }

      const data: MealApiResponse = await response.json();

      if (!data.meals || data.meals.length === 0) {
        throw new Error('Meal not found');
      }

      return mapMealApiToMeal(data.meals[0]);
    }
  );
}


export async function getMealsByCategory(category: string): Promise<Meal[]> {
  return logRepositoryOperation(
    {
      source: 'remote',
      operation: 'getMealsByCategory',
      input: { category },
    },
    async () => {
      const response = await fetch(`${API_BASE_URL}/filter.php?c=${category}`);

      if (!response.ok) {
        throw new Error('Failed to fetch meals by category');
      }

      const data: MealApiResponse = await response.json();

      if (!data.meals || data.meals.length === 0) {
        return [];
      }

      return data.meals.map(mapMealApiToMeal);
    }
  );
}