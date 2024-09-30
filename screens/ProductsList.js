import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet,Text } from 'react-native';
import Filters from '../components/Filters';
import ProductListItem from '../components/ProductListItem';
import { useNavigation } from '@react-navigation/native';

const ProductsList = () => {
  const navigation = useNavigation();

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortBy, setSortBy] = useState("A-Z");

  const [selectedColor, setSelectedColor] = useState('all');
  const [selectedGender, setSelectedGender] = useState('all');
  const [selectedSize, setSelectedSize] = useState('all');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const filterSetters={
    setSelectedColor,
    setSelectedBrand,
    setSelectedGender,
    setSelectedSize
  }
  const allFilterStates = {
    selectedColor,
    selectedBrand,
    selectedGender,
    selectedSize
  }
  const filtersReset = () => {
    setSelectedColor("all")
    setSelectedBrand("all")
    setSelectedGender("all")
    setSelectedSize("all")
  }
  

  useEffect(() => {
    const productData = require('../data/products.json');
      setProducts(productData);
      setFilteredProducts(productData);
  }, []);

  const filterProducts = () => {
    let productsFiltered = products
    if (selectedColor !== 'all') {
      productsFiltered = productsFiltered.filter(product => product.colors.includes(selectedColor));
    }
    if (selectedGender !== 'all') {
      productsFiltered = productsFiltered.filter(product => product.genders.includes(selectedGender));
    }
    if (selectedSize !== 'all') {
      productsFiltered = productsFiltered.filter(product =>
        product.sizes.some(size => size.name === selectedSize)
      );
    }
    if (selectedBrand !== 'all') {
      productsFiltered = productsFiltered.filter(product => product.brandName === selectedBrand);
    }

    sortProducts(productsFiltered);
  }
  
  const sortProducts = (productsToSort) => {
    let sortedProducts=[...productsToSort]
    switch (sortBy) {
      case "A-Z":
        sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "Z-A":
        sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "LOWEST TO HIGHEST":
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case "HIGHEST TO LOWEST":
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }
    setFilteredProducts(sortedProducts)
  }

  useEffect(() => {
    if (products.length > 0) {
      filterProducts();
    }
  },[selectedColor,selectedGender,selectedSize,selectedBrand,products,sortBy])

  const renderProductListItem = ({ item }) => {
    const navigateToProductDetail=() => navigation.navigate('ProductDetail', { product: item })
    return (
      <ProductListItem onPress={navigateToProductDetail} item={item} />
    );
  };

  return (
    <View style={styles.container}>
      <Filters
        filterSetters={filterSetters}
        filterStates={allFilterStates}
        products={products}
        resetFilters={filtersReset}
        sortedBy={sortBy}
        setSortBy={setSortBy}
      />
      {filteredProducts.length > 0 ?
        <FlatList
          data={filteredProducts}
          keyExtractor={(item) => item.productId}
          renderItem={renderProductListItem}
        />
        :
        <View style={styles.noProductsContainer}>
          <Text style={styles.noProductsText}>No products found!</Text>
        </View>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    minHeight:"100%"
  },
  noProductsContainer: {
    flex: 1,
    width:"100%",
    justifyContent: "center",
    alignContent:"center"
  },
  noProductsText: {
    textAlign:"center",
  }

});

export default ProductsList;