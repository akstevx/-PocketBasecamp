import { ReactElement } from 'react';
import { FlatList, FlatListProps, View } from 'react-native';

type GridListItem<T> = T | null;

type GridListProps<T> = Omit<
  FlatListProps<GridListItem<T>>,
  'data' | 'renderItem' | 'numColumns'
> & {
  data: T[];
  renderItem: FlatListProps<T>['renderItem'];
  columns?: number;
  columnGap?: number;
  rowGap?: number;
  contentBottomPadding?: number;
};

export function GridList<T>({
  columns = 2,
  columnGap = 12,
  rowGap = 12,
  contentBottomPadding = 0,
  data,
  renderItem,
  keyExtractor,
  ...props
}: GridListProps<T>): ReactElement {
  const remainder = data.length % columns;
  const placeholdersCount = remainder === 0 ? 0 : columns - remainder;

  const formattedData: GridListItem<T>[] = [
    ...data,
    ...Array(placeholdersCount).fill(null),
  ];

  return (
    <FlatList<GridListItem<T>>
      {...props}
      data={formattedData}
      numColumns={columns}
      showsVerticalScrollIndicator={false}
      columnWrapperStyle={{
        gap: columnGap,
        marginBottom: rowGap,
      }}
      contentContainerStyle={{
        paddingBottom: contentBottomPadding,
      }}
      keyExtractor={(item, index) => {
        if (item === null) {
          return `placeholder-${index}`;
        }

        return keyExtractor ? keyExtractor(item, index) : String(index);
      }}
      renderItem={(info) => {
        if (info.item === null) {
          return <View style={{ flex: 1 }} />;
        }

        return renderItem
          ? renderItem({
              ...info,
              item: info.item,
            })
          : null;
      }}
    />
  );
}