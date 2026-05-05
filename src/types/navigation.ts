export type RootStackParamList = {
  MainTabs: undefined;
};

export type RootTabParamList = {
  HomeStack: undefined;
  Explore: undefined;
  Saved: undefined;
  Settings: undefined;
};

export type HomeStackParamList = {
  Home: undefined;
  MealDetails: {
    mealId: string;
    mealName: string;
  };
};