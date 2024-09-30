import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import OptionsModal from './OptionsModal';

const CustomPicker = ({ title, options, selectedValue, onValueChange }) => {
  const optionsToSort=[...options]
  const firstOption = optionsToSort.shift()
  optionsToSort.sort((a, b) => a.localeCompare(b));
  const sortedOptions=[firstOption,...optionsToSort]
  
  const [modalVisible, setModalVisible] = useState(false);
  const optionChosen = (option) => {
    setModalVisible(false)
    if (option) {
      onValueChange(option)
    }
  }

  return (
    <View style={styles.pickerContainer}>
      <TouchableOpacity
        style={styles.container}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.pickerTitle}>{title}:</Text>
        <View style={styles.picker}>
          <Text style={styles.pickerText}>
            {selectedValue.toUpperCase()}
          </Text>
        </View>
      </TouchableOpacity>
      <OptionsModal
              isVisible={modalVisible}
              options={sortedOptions}     
              onOptionChosen={optionChosen}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height:"100%",
    flexDirection:"row",
    justifyContent: "center",
    alignItems:"center",
    },
pickerContainer: {
    height: 50,
    borderWidth: 1,
    borderColor: "#999",
    borderRadius: 10,
    overflow:"hidden",
    padding: 10,
    fontSize:14,
  },
  picker: {
    height: "100%",
    justifyContent:"center",
    
  },
  pickerText: {
    color: '#333',
    width: "auto",
    fontSize: 14,
    marginLeft:5
  },
});

export default CustomPicker;