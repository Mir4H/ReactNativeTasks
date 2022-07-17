import React, {useState} from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const App=()=>{
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Details">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AddBoot" component={AddBootScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
  const HomeScreen=(props)=>{
    return(
        <View>
          <Text>Home</Text>
        </View>
    );
  }

  const AddBootScreen=(props)=>{
    return(
        <View>
          <Text>AddBoot</Text>
        </View>
    );
  }
export default App;