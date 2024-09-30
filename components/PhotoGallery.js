import { FlatList, TouchableOpacity, View, Image, Modal,StyleSheet,Dimensions } from "react-native";
import { useState } from "react";
import ImageViewer from 'react-native-image-zoom-viewer';
import Icon from 'react-native-vector-icons/FontAwesome';
const { width, height } = Dimensions.get('window');

const PhotoGallery = ({ images }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);

    const openZoomViewer = (index) => {
      setSelectedImageIndex(index);
      setModalVisible(true);
    };
    return <>
    <FlatList
        data={images}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={( index) => index.toString()}
        renderItem={({ item,index }) => (
          <TouchableOpacity onPress={() => openZoomViewer(index)}>
            <View>
              <Image source={{ uri: item }} style={styles.carouselImage} />
            </View>
          </TouchableOpacity>
        )}
      />
      <Modal
        visible={modalVisible}
        transparent={true}
        statusBarTranslucent={true}
        animationType="fade"
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
          <Icon name="close" size={35} color="#fff" />
          </TouchableOpacity>
          
          <View style={styles.zoomContainer}>
            <ImageViewer
              backgroundColor='transparent'
              imageUrls={images.map((url) => ({ url }))}
              index={selectedImageIndex}
              enableSwipeDown
              onSwipeDown={() => setModalVisible(false)}
              renderIndicator={() => null}
            />
          </View>
        </View>
      </Modal>
    </>
}
const styles = StyleSheet.create({
    carouselImage: {
      width: width - 40,
      height: 450,
      borderRadius: 10,
      marginRight: 10
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    zoomContainer: {
      width: width * 0.9,
      height: height * 0.6,
      borderRadius: 10,
      overflow: 'hidden',
    },
    closeButton: {
      position: 'absolute',
      top: 40,
      right: 20,
      zIndex: 1,
    },
    closeButtonText: {
      fontWeight: 'bold',
      fontSize: 14,
      color: '#333',
      textAlign:"center"
    },
  });
export default PhotoGallery;