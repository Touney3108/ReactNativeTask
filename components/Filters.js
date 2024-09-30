import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Modal,FlatList } from "react-native";
import { useState } from "react";
import Icon from 'react-native-vector-icons/FontAwesome';
import CustomPicker from "./CustomPicker";
import OptionsModal from "./OptionsModal";
const Filters = ({ filterSetters, filterStates, products, resetFilters, sortedBy, setSortBy }) => {
  const sortingOptions = ["A-Z", "Z-A", "LOWEST TO HIGHEST", "HIGHEST TO LOWEST"];
  const [modalVisible, setModalVisible] = useState(false);
  //filtering options are extracted from provided array of products so if that product gets listed new color/size from backend it will show up as an option
  const colors = new Set();
  const sizes = new Set();
  const brands = new Set();
  const genders = new Set();
  products.forEach(product => {
      product.colors.forEach((color) => colors.add(color));
      product.sizes.forEach((size) => sizes.add(size.name));
      brands.add(product.brandName);
      product.genders.forEach((gender) => genders.add(gender));
  });
  
  const sortByChosen = (option) => {
    setModalVisible(false)
    if (option) {
      setSortBy(option)
    }
  }

    
  return(
    <View style={styles.filtersContainer}>
      <View style={styles.filtersHeader}>
        <TouchableOpacity style={styles.sortByButton} onPress={()=>setModalVisible(true)}>
          <Icon name="sort-amount-asc" size={20} color="#000" />
          <Text style={styles.filtersHeaderText}>{sortedBy}</Text>
        </TouchableOpacity>
        {filterStates.selectedColor !== "all" ||
          filterStates.selectedBrand !== "all" ||
          filterStates.selectedGender !== "all" ||
          filterStates.selectedSize !== "all" ?
        <TouchableOpacity style={styles.filtersRemoveButton} onPress={resetFilters}>
          <Icon name="close" size={24} color="#b00" />
          <Text style={styles.filtersRemoveButtonText}>REMOVE</Text>
        </TouchableOpacity>:<View/>}
        
      </View>
      <OptionsModal
        isVisible={modalVisible}
        options={sortingOptions}
        onOptionChosen={sortByChosen}
      />
      <ScrollView
        style={styles.filtersScrollContainer}
        horizontal={true}
        contentContainerStyle={styles.scrollViewContent}
        >
          <CustomPicker
          title="Gender"
          options={["all",...genders]}
          selectedValue={filterStates.selectedGender}
          onValueChange={(item) => filterSetters.setSelectedGender(item)}
        />
        <CustomPicker
          title="Size"
          options={["all",...sizes]}
          selectedValue={filterStates.selectedSize}
          onValueChange={(item) => filterSetters.setSelectedSize(item)}
        />
        <CustomPicker
            title="Color"
            options={["all",...colors]}
            selectedValue={filterStates.selectedColor}
            onValueChange={(item) => filterSetters.setSelectedColor(item)}    
        />
        <CustomPicker
          title="Brand"
          options={["all",...brands]}
          selectedValue={filterStates.selectedBrand}
          onValueChange={(item) => filterSetters.setSelectedBrand(item)}
        />
      </ScrollView>
    </View>)
}
const styles = StyleSheet.create({
  filtersContainer: {
    marginHorizontal:10,
    backgroundColor: "#eee",
    padding: 10,
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height:2 },
    shadowOpacity: 0.3,
    shadowRadius:4,
  },
  filtersScrollContainer: {
    width: "100%",
    height: 60,
    
  },
  scrollViewContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap:5,
  },
  filtersHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems:"center",
    marginVertical: 8,
    fontSize: 16,
  },
  filtersHeaderText: {
    fontSize: 16,
    fontWeight:"bold",
  },
  filtersRemoveButton: {
    flexDirection: "row",
    justifyContent: "end",
    alignItems: "center",
    gap: 3,
  },
  filtersRemoveButtonText: {
    color: "#b00",
  },
  sortByButton: {
    flexDirection: "row",
    alignContent:"center",
    gap:5
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    margin: 20,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 20,
    maxHeight: '80%',
  },
  option: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  notFirstOption: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  optionText: {
    fontSize: 16,
    textAlign:"center"
  },

});

export default Filters;