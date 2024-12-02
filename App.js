import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Button,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const MainScreen = ({ navigation }) => {
  const [foodList, setFoodList] = useState([
    { id: '1', name: 'Mee Goreng', calories: 384 },
    { id: '2', name: 'Nasi Lemak', calories: 494 },
  ]);

  const calculateSummary = () => {
    const totalCalories = foodList.reduce((sum, item) => sum + item.calories, 0);
    Alert.alert(
        'Calorie Summary',
        `Total: ${totalCalories} calories\nRecommended:
       - Male: 2500 calories
       - Female: 2000 calories`,
    );
  };

  return (
      <View style={styles.container}>
        <FlatList
            data={foodList}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <View style={styles.item}>
                  <Text>{item.name}</Text>
                  <Text>{item.calories} calories</Text>
                </View>
            )}
        />
        <Button
            title="Add/Edit Food"
            onPress={() => navigation.navigate('AddEdit', { foodList, setFoodList })}
        />
        <Button title="View Summary" onPress={calculateSummary} />
      </View>
  );
};

const AddEditScreen = ({ route, navigation }) => {
  const { foodList, setFoodList } = route.params;
  const [name, setName] = useState('');
  const [calories, setCalories] = useState('');

  const addItem = () => {
    if (!name || !calories) {
      Alert.alert('Error', 'Please fill out both fields.');
      return;
    }
    const newFood = { id: String(foodList.length + 1), name, calories: parseInt(calories) };
    setFoodList([...foodList, newFood]);
    navigation.goBack();
  };

  return (
      <View style={styles.container}>
        <TextInput
            style={styles.input}
            placeholder="Food Name"
            value={name}
            onChangeText={setName}
        />
        <TextInput
            style={styles.input}
            placeholder="Calories"
            keyboardType="numeric"
            value={calories}
            onChangeText={setCalories}
        />
        <Button title="Save" onPress={addItem} />
      </View>
  );
};

export default function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Main" component={MainScreen} />
          <Stack.Screen name="AddEdit" component={AddEditScreen} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    marginVertical: 5,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    elevation: 2,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
});

