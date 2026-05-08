import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MealDetailsScreen } from '../screens/home/MealDetailsScreen';
import { RootStackParamList } from '../types/navigation';
import { AppTabs } from './AppTabs';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MainTabs"
        component={AppTabs}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="MealDetails"
        component={MealDetailsScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}