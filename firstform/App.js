import React, {useState} from 'react';
import type {Node} from 'react';
import {Button, StyleSheet, Text, TextInput, View} from 'react-native';

const App = () => {
  const [pet, setPet] = useState("");
  const [list, addPet] = useState([]);
  const [age, setAge] = useState("");
  const [list2, addAge] = useState([]);

  const petInputHandler = enteredText => {
    setPet(enteredText);
  }
  const ageInputHandler = enteredNumb => {
    setAge(enteredNumb)
  }

  const addPetToList=()=>{
    addPet(list=>[...list, pet]);
    addAge(list2=>[...list2, age]);
  }

const clearValues=()=>{
  setPet("");
  setAge("");
}  
  return (
    <View style={styles.container}>
      <View style={styles.mainform}>
        <View style={styles.formstyle}>
          <TextInput style={styles.textinput} value={pet} placeholder="Enter pet name" onChangeText={petInputHandler}/>
          <Button color="#38b058" title="OK" onPress={addPetToList} />
        </View>
        <View style={styles.formstyle}>
          <TextInput style={styles.textinput} value={age} placeholder="Enter pet age" keyboardType='numeric' onChangeText={ageInputHandler}/>
          <Button color="gray" title="Cancel" onPress={clearValues}/>
        </View>
      </View>
      {list.map((item, index)=>{return <Text style={styles.listText} key={index}>Name: {item} | Age: {list2[index]}</Text>})}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems:'center'
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
  listText: {
    fontSize: 16,
    marginTop: 2,
  }
});

export default App;
