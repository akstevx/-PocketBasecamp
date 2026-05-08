import { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
  MainTabs: undefined;
  MealDetails: {
    mealId: string;
    mealName: string;
  };
};

export type RootTabParamList = {
  HomeStack: NavigatorScreenParams<HomeStackParamList>;
  Explore: undefined;
  Saved: undefined;
  Settings: undefined;
};


export type HomeStackParamList = {
  Home: undefined;
};