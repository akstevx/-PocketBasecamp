import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MealDetailsScreen } from '../screens/home/MealDetailsScreen';
import { HomeScreen } from '../screens/home/HomeScreen';
import { HomeStackParamList } from '../types/navigation';

const Stack = createNativeStackNavigator<HomeStackParamList>();

export function HomeStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MealDetails"
        component={MealDetailsScreen}
        options={{ title: 'Meal Details', headerTitleAlign: 'center', headerShown: false}}
      />
    </Stack.Navigator>
  );
}