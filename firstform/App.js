import React, {useState} from 'react';
import type {Node} from 'react';
import {Button, StyleSheet, Text, TextInput, View,} from 'react-native';

const App = () => {
  const [boot, setBoot]=useState();
  return (
        <View style={styles.container}>
          <View style={styles.mainform}>
          <View style={styles.formstyle}>
          <TextInput style={styles.textinput}/>
          <Button color='#38b058' title='OK'/>
          </View>
          <View style={styles.formstyle}>
          <TextInput style={styles.textinput}/>
          <Button color='gray' title='Cancel'/>
          </View>
          </View>
        </View>
  );
};

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center',
  }, 
  text:{
    fontSize: 24,
    padding: 5,
    fontWeight:'bold',
  },
  mainform: {
    alignItems: 'flex-start',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  textinput:{
    backgroundColor:'#d6d6d6',
    borderColor:'gray',
    borderWidth:1,
    marginTop: 10,
    marginBottom: 10,
  },
  formstyle:{
    width:'40%',
    flexDirection:'column',
    justifyContent:'space-around',
  }
});

export default App;
