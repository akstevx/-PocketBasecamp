import { ReactElement } from 'react';
import { FlatList, FlatListProps } from 'react-native';

type GridListProps<T> = FlatListProps<T> & {
  columns?: number;
  columnGap?: number;
  rowGap?: number;
  contentBottomPadding?: number;
};

export function GridList<T>({
  columns = 2,
  columnGap = 12,
  rowGap = 12,
  contentBottomPadding = 4,
  ...props
}: GridListProps<T>): ReactElement {
  return (
    <FlatList
      numColumns={columns}
      showsVerticalScrollIndicator={false}
      columnWrapperStyle={{
        gap: columnGap,
        marginBottom: rowGap,
      }}
      contentContainerStyle={{
        paddingBottom: contentBottomPadding,
      }}
      {...props}
    />
  );
}