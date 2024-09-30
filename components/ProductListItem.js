import { TouchableOpacity,Image,Text,StyleSheet } from "react-native";
const ProductListItem = ({onPress,item}) => {
    return (
        <TouchableOpacity
          style={styles.productCard}
          onPress={onPress}
        >
          <Image source={{ uri: item.mainImageUrl }} style={styles.image} />
          <Text style={styles.productName}>{item.name}</Text>
          <Text style={styles.productPrice}>€{(item.price / 100).toFixed(2)}</Text>
        </TouchableOpacity>
      );
}

const styles = StyleSheet.create({
    productCard: {
      marginHorizontal:10,
      marginBottom: 20,
      padding:5,
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 10,
      overflow: "hidden",
      textAlign:"center",
      
    },
    image: {
      width: '100%',
      height: 200,
      borderRadius: 10,
      overflow:"hidden"
    },
    productName: {
      fontSize: 18,
      fontWeight: 'bold',
      marginTop: 10,
      textAlign:"center",
    },
    productPrice: {
      fontSize: 16,
      color: '#888',
      marginTop: 5,
      textAlign:"center",
    },
});
  
export default ProductListItem;
