import React from 'react';
import { ReactElement } from 'react';
import { FlatList, FlatListProps } from 'react-native';

type VerticalListProps<T> = FlatListProps<T> & {
  itemSpacing?: number;
  contentBottomPadding?: number;
};

export function VerticalList<T>({
  itemSpacing = 12,
  contentBottomPadding = 24,
  ...props
}: VerticalListProps<T>): ReactElement {
  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      ItemSeparatorComponent={() => <></>}
      contentContainerStyle={{
        paddingBottom: contentBottomPadding,
        gap: itemSpacing,
      }}
      {...props}
    />
  );
}