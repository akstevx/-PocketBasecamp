import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppTabs } from './AppTabs';
import { RootStackParamList } from '../types/navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  return (
    <Stack.Navigator>
        <Stack.Screen
            name="MainTabs"
            component={AppTabs}
            options={{ headerShown: false }}
        />
    </Stack.Navigator>
  );
}