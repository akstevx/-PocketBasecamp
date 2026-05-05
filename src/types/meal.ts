export type MealApiResponse = {
    meals: MealApiModel[] | null;
  };
  
  export type MealApiModel = {
    idMeal: string;
    strMeal: string;
    strCategory: string | null;
    strArea: string | null;
    strInstructions: string | null;
    strMealThumb: string | null;
    strYoutube: string | null;
  };
  
  export type Meal = {
    id: string;
    name: string;
    category: string;
    area: string;
    instructions: string;
    thumbnail: string;
    youtubeUrl: string;
  };