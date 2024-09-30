import { View, Text, StyleSheet,  ScrollView, } from 'react-native';
import PhotoGallery from '../components/PhotoGallery';

const ProductDetail = ({ route }) => {
  const { product } = route.params;
  const allImages = [product.mainImageUrl, ...product.additionalImages]

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContainer}>
      <PhotoGallery
        images={allImages}
      />
      <Text style={styles.productName}>{product.name}</Text>
      <Text style={styles.productDescription}>{product.description}</Text>
      <Text style={styles.productPrice}>Price: €{(product.price / 100).toFixed(2)}</Text>
      <View style={styles.sizesContainer}>
        <Text style={styles.sizesHeader}>SIZES</Text>
        <View style={styles.sizesListContainer}>
          {product.sizes.map((item)=><Text style={styles.sizeText} key={item.name}>{item.name}</Text>)}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    minHeight: "100%",
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom:40,
  },
  productName: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 10 
  },
  productDescription: {
    fontSize: 16,
    color: '#555' 
  },
  productPrice: {
    fontSize: 18,
    color: '#333',
    marginVertical: 10 
  },
  sizesContainer: {
    backgroundColor: "#dddddd",
    padding: 10,
    borderRadius: 10,
    overflow: "hidden",
    alignItems:"center"
  },
  sizesHeader: {
    marginBottom: 10,
    fontSize: 18,
    fontWeight: "bold",
    color:"#444"
  },
  sizesListContainer: {
    width: "100%",
    height:"auto",
    flexDirection: "row",
    justifyContent:"center",
    alignItems:"center",
    flexWrap:"wrap",
    gap:8,
  },
  sizeText: {
    fontSize: 16,
    color: '#666',
    backgroundColor: "#fff",
    padding:4,
    borderRadius: 4,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#666",
    textAlign:"center",
    
  },
});

export default ProductDetail;