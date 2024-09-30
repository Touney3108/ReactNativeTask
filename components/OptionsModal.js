import { TouchableOpacity,Text,View,FlatList,Modal,StyleSheet } from "react-native";
const OptionsModal = ({ isVisible, options,onOptionChosen }) => {
    const renderItem = ({ item,index }) => (
        <TouchableOpacity
          style={[styles.option,index!==0&&styles.notFirstOption]}
          onPress={() => onOptionChosen(item)}
        >
          <Text style={styles.optionText}>{item.toUpperCase()}</Text>
        </TouchableOpacity>
      );
    return (
        <Modal
            visible={isVisible}
            statusBarTranslucent={true}
            transparent={true}
            animationType="fade"
            onRequestClose={() => onOptionChosen()}
            >
            <TouchableOpacity
              style={styles.modalOverlay}
              onPress={() => onOptionChosen()}
            >
              <View style={styles.modalContent}>
                <FlatList
                  data={options}
                  renderItem={renderItem}
                  keyExtractor={(item) => item}
                />
              </View>
            </TouchableOpacity>
        </Modal>
    )
}

const styles = StyleSheet.create({
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

export default OptionsModal;