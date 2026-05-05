import { ReactElement } from 'react';
import { FlatList, FlatListProps } from 'react-native';

type HorizontalListProps<T> = FlatListProps<T> & {
  itemSpacing?: number;
  contentHorizontalPadding?: number;
};

export function HorizontalList<T>({
  itemSpacing = 12,
  contentHorizontalPadding = 16,
  ...props
}: HorizontalListProps<T>): ReactElement {
  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        paddingHorizontal: contentHorizontalPadding,
        gap: itemSpacing,
      }}
      {...props}
    />
  );
}