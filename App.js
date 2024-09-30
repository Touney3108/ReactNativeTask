import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ProductsList from './screens/ProductsList';
import ProductDetail from './screens/ProductDetail';

const Stack = createStackNavigator();
//product detail prva slika dodati i urediti page
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ProductsList">
        <Stack.Screen name="ProductsList" component={ProductsList} options={{ title: 'Products List' }} />
        <Stack.Screen name="ProductDetail" component={ProductDetail} options={{ title: 'Product Detail' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
