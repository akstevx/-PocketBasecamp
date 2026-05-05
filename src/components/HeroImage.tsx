import { Image, ImageResizeMode, Pressable, StyleSheet } from 'react-native';

type HeroImageProps = {
  uri: string;
  height?: number;
  borderRadius?: number;
  marginBottom?: number;
  resizeMode?: ImageResizeMode;
  onPress?: () => void;
};

export function HeroImage({
  uri,
  height = 240,
  borderRadius = 10,
  marginBottom = 24,
  resizeMode = 'cover',
  onPress,
}: HeroImageProps) {
  const image = (
    <Image
      source={{ uri }}
      resizeMode={resizeMode}
      style={[
        styles.image,
        {
          height,
          borderRadius,
          marginBottom,
        },
      ]}
    />
  );

  if (!onPress) {
    return image;
  }

  return <Pressable onPress={onPress}>{image}</Pressable>;
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
  },
});