import { Ionicons } from '@expo/vector-icons';
import { Image, Modal, Pressable, StyleSheet, View } from 'react-native';
import { theme } from '../theme';

type ImagePreviewModalProps = {
  visible: boolean;
  uri: string;
  onClose: () => void;
};

export function ImagePreviewModal({
  visible,
  uri,
  onClose,
}: ImagePreviewModalProps) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.container}>
        <Pressable style={styles.closeButton} onPress={onClose}>
          <Ionicons name="close" size={28} color="#FFFFFF" />
        </Pressable>

        <Image
          source={{ uri }}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    justifyContent: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 56,
    right: theme.spacing.lg,
    zIndex: 10,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});