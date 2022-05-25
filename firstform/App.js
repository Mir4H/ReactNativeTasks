import React, {useState} from 'react';
import type {Node} from 'react';
import {Button, FlatList, StyleSheet, Text, TextInput, View} from 'react-native';

const App = () => {
  const [pet, setPet] = useState();
  const [age, setAge] = useState();
  const [listOfPets, addPet] = useState([]);

  const petInputHandler = enteredText => {
    setPet(enteredText);
  }
  const ageInputHandler = enteredNumb => {
    setAge(enteredNumb)
  }

  const addPetToList=()=>{
    addPet(listOfPets=>[...listOfPets, {name:pet, age:age}]);
  }

const clearValues=()=>{
  setPet("");
  setAge("");
}  
  return (
    <View style={styles.container}>
      <View style={styles.mainform}>
        <View style={styles.formstyle}>
          <TextInput style={styles.textinput} maxLength={30} value={pet} placeholder="Enter pet name" onChangeText={petInputHandler}/>
          <Button color="#38b058" title="OK" onPress={addPetToList} />
        </View>
        <View style={styles.formstyle}>
          <TextInput style={styles.textinput} maxLength={4} value={age} placeholder="Enter pet age" keyboardType='numeric' onChangeText={ageInputHandler}/>
          <Button color="gray" title="Cancel" onPress={clearValues}/>
        </View>
      </View>
      <View style={styles.titleText}><Text style={{ fontSize: 20 }}>List of Pets</Text></View>
      <FlatList data={listOfPets} renderItem={({item, index})=><View style={styles.listText}><Text style={{ fontSize: 16 }} key={index}>{index+1}: {item.name} | {item.age}</Text></View>}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainform: {
    alignItems: 'flex-start',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  textinput: {
    backgroundColor: '#d6d6d6',
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 20,
    marginBottom: 10,
  },
  formstyle: {
    width: '40%',
    flexDirection: 'column',
    marginBottom: 10,
  },
  titleText: {
    marginTop: 5,
    alignItems: 'center',
  },
  listText: {
    marginTop: 3,
    marginLeft: 20,
    marginRight: 20,
    borderColor:'gray',
    padding: 2,
    borderWidth:1,
    backgroundColor:'#f0f7f6',
  }
});

export default App;
