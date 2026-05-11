import { create } from 'zustand';

import {
  getSavedMeals,
  isMealSaved,
  removeMeal,
  saveMeal,
} from '../storage/favoritesStorage';
import { Meal } from '../types/meal';

type FavoritesState = {
  savedMeals: Meal[];
  isLoading: boolean;
  loadSavedMeals: () => Promise<void>;
  saveFavorite: (meal: Meal) => Promise<void>;
  removeFavorite: (mealId: string) => Promise<void>;
  checkIsSaved: (mealId: string) => Promise<boolean>;
};

export const useFavoritesStore = create<FavoritesState>((set) => ({
  savedMeals: [],
  isLoading: false,

  loadSavedMeals: async () => {
    set({ isLoading: true });

    try {
      const meals = await getSavedMeals();

      set({
        savedMeals: meals,
      });
    } finally {
      set({ isLoading: false });
    }
  },

  saveFavorite: async (meal: Meal) => {
    await saveMeal(meal);

    set((state) => ({
      savedMeals: state.savedMeals.some((item) => item.id === meal.id)
        ? state.savedMeals
        : [meal, ...state.savedMeals],
    }));
  },

  removeFavorite: async (mealId: string) => {
    await removeMeal(mealId);

    set((state) => ({
      savedMeals: state.savedMeals.filter(
        (meal) => meal.id !== mealId
      ),
    }));
  },

  checkIsSaved: async (mealId: string) => {
    return isMealSaved(mealId);
  },
}));