import { RouteProp, useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { AppLoader } from '../../components/AppLoader';
import { AppText } from '../../components/AppText';
import { HeroImage } from '../../components/HeroImage';
import { ScreenContainer } from '../../components/ScreenContainer';
import { Section } from '../../components/Section';
import { getMealById } from '../../services/meals/mealsService';
import { theme } from '../../theme';
import { Meal } from '../../types/meal';
import { HomeStackParamList } from '../../types/navigation';
import { useNavigation } from '@react-navigation/native';
import { FloatingHeader } from '../../components/FloatingHeader';
import { ImagePreviewModal } from '../../components/ImagePreviewModal';
import { saveMeal, removeMeal, isMealSaved } from '../../storage/favoritesStorage';
import { PrimaryButton } from '../../components/PrimaryButton';
import { RootStackParamList } from '../../types/navigation';
import React from 'react';


//get argument params for this component

type MealDetailsRouteProp = RouteProp<RootStackParamList, 'MealDetails'>;

export function MealDetailsScreen() {
  //add navigation 
  const navigation = useNavigation();

  //use routes to get arguments passed
  const route = useRoute<MealDetailsRouteProp>();

  //get mealId from params
  const { mealId } = route.params;

  //create live data for meal, loader, and error
  const [meal, setMeal] = useState<Meal | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const [isImagePreviewVisible, setIsImagePreviewVisible] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    loadMeal();
  }, []);

  async function loadMeal() {
    try {
      setIsLoading(true);
      setErrorMessage('');

      const result = await getMealById(mealId);
      setMeal(result);

      const saved = await isMealSaved(result.id);
      setIsSaved(saved);
    } catch (error) {
      setErrorMessage('Failed to load meal details.');
    } finally {
      setIsLoading(false);
    }
  }

  async function toggleSavedMeal() {
    if (!meal) return;
  
    if (isSaved) {
      await removeMeal(meal.id);
      setIsSaved(false);
    } else {
      await saveMeal(meal);
      setIsSaved(true);
    }
  }

  if (isLoading) {
    return (
      <ScreenContainer>
        <AppLoader message="Loading meal..." />
      </ScreenContainer>
    );
  }

  if (errorMessage) {
    return (
      <ScreenContainer>
        <Section>
          <AppText variant="title">Error</AppText>
          <AppText>{errorMessage}</AppText>
        </Section>
      </ScreenContainer>
    );
  }

  if (!meal) {
    return null;
  }

  return (
    <>
      <ScreenContainer paddingTop={0} paddingHorizontal={0}>
        {meal.thumbnail ? (
          <HeroImage
            uri={meal.thumbnail}
            height={280}
            borderRadius={0}
            marginBottom={24}
            onPress={() => setIsImagePreviewVisible(true)}
          />
        ) : null}
  
        <View style={{ paddingHorizontal: theme.spacing.lg }}>
          <Section>
            <AppText variant="title">{meal.name}</AppText>
          </Section>
  
          <Section>
            <AppText>Category: {meal.category}</AppText>
            <AppText>Area: {meal.area}</AppText>
          </Section>

          <Section>
            <PrimaryButton
              title={isSaved ? 'Remove from Saved' : 'Save Meal'}
              onPress={toggleSavedMeal}
              variant={isSaved ? 'secondary' : 'primary'}
            />
          </Section>
  
          <Section>
            <AppText>{meal.instructions}</AppText>
          </Section>
        </View>
      </ScreenContainer>

      <ImagePreviewModal
        visible={isImagePreviewVisible}
        uri={meal.thumbnail}
        onClose={() => setIsImagePreviewVisible(false)}
      />
  
      <FloatingHeader onBackPress={() => navigation.goBack()} />

    </>
  );
}