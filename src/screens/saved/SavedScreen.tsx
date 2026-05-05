import { useEffect, useState } from 'react';

import { AppLoader } from '../../components/AppLoader';
import { AppText } from '../../components/AppText';
import { GridList } from '../../components/GridList';
import { ScreenContainer } from '../../components/ScreenContainer';
import { Section } from '../../components/Section';
import { getSavedMeals } from '../../storage/favoritesStorage';
import { Meal } from '../../types/meal';

export function SavedScreen() {
  const [savedMeals, setSavedMeals] = useState<Meal[]>([]);
  const [isLoading,  setIsLoading] = useState(true);

  useEffect(() => {
    loadSavedMeals();
  }, []);

  async function loadSavedMeals() {
    try {
      const result = await getSavedMeals();
      setSavedMeals(result);
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoading) {
    return (
      <ScreenContainer>
        <AppLoader message="Loading saved meals..." />
      </ScreenContainer>
    );
  }

  if (savedMeals.length === 0) {
    return (
      <ScreenContainer>
        <Section>
          <AppText variant="title">No saved meals yet</AppText>
          <AppText>Meals you save will appear here.</AppText>
        </Section>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer scrollable={false} paddingBottom={0}>
      <Section>
        <AppText variant="title">Saved Meals</AppText>
      </Section>

      <GridList
        data={savedMeals}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <AppText>{item.name}</AppText>
        )}
        columnGap={16}
        rowGap={16}
      />
    </ScreenContainer>
  );
}