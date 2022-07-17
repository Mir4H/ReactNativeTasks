import React, {useState} from 'react';
import { View, Text, Button, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
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

  const [bootList, addBoot]=useState([{"id":1, "type":"Leather Boot", "size":39}, {"id":2, "type":"Winter Boot", "size":42}]);  
  
  const renderBoot=(item)=>{
    return(
      <TouchableOpacity activeOpacity={0.8}>
        <View style={styles.listItemStyle}>
          <Text>{item.index+1}: {item.item.type} {item.item.size}</Text>
        </View>
      </TouchableOpacity>
    );
  }

    return(
      <View style={{flex:1}}>
        <Button onPress={()=>props.navigation.navigate("AddBoot")} title="Add Boot"/>
        <View style={styles.homeStyle}>
          <Text style={styles.textStyle}>Boot List</Text>
          <FlatList style={styles.flatlistStyle}
            data={bootList}
            renderItem={renderBoot}
          />
        </View>
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

  const styles=StyleSheet.create({
    textStyle:{
      fontSize: 20,
      padding:2,
    },
    homeStyle:{
      marginTop:5,
      flex:8,
      alignItems:"center",
      backgroundColor:"#eee",
      width:"100%",
    },
    flatlistStyle:{
      width:'80%',
      backgroundColor:'grey',
    }, 
    listItemStyle:{
      marginTop:5,
      padding:5,
      backgroundColor:"#abc",
      width:"80%",
      alignSelf:"center",
    }
  });
export default App;