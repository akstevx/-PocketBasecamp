import AsyncStorage from '@react-native-async-storage/async-storage';
import { Meal } from '../types/meal';
import { logInfo, logRepositoryOperation } from '../utils/logger';

const SAVED_MEALS_KEY = 'saved_meals';

export async function getSavedMeals(): Promise<Meal[]> {
  return logRepositoryOperation(
    {
      source: 'local',
      operation: 'getSavedMeals',
    },
    async () => {
      const rawValue = await AsyncStorage.getItem(SAVED_MEALS_KEY);

      if (!rawValue) {
        return [];
      }

      return JSON.parse(rawValue) as Meal[];
    }
  );
}

export async function saveMeal(meal: Meal): Promise<void> {
  return logRepositoryOperation(
    {
      source: 'local',
      operation: 'saveMeal',
      input: { mealId: meal.id },
    },
    async () => {
      const savedMeals = await getSavedMeals();
      const alreadySaved = savedMeals.some((item) => item.id === meal.id);

      if (alreadySaved) {
        return;
      }

      const updatedMeals = [meal, ...savedMeals];

      await AsyncStorage.setItem(SAVED_MEALS_KEY, JSON.stringify(updatedMeals));
    }
  );
}

export async function removeMeal(mealId: string): Promise<void> {
  return logRepositoryOperation(
    {
      source: 'local',
      operation: 'removeMeal',
      input: { mealId },
    },
    async () => {
      const savedMeals = await getSavedMeals();
      const updatedMeals = savedMeals.filter((meal) => meal.id !== mealId);

      await AsyncStorage.setItem(SAVED_MEALS_KEY, JSON.stringify(updatedMeals));
    }
  );
}

export async function isMealSaved(mealId: string): Promise<boolean> {
  return logRepositoryOperation(
    {
      source: 'local',
      operation: 'isMealSaved',
      input: { mealId },
    },
    async () => {
      const savedMeals = await getSavedMeals();
      return savedMeals.some((meal) => meal.id === mealId);
    }
  );
}