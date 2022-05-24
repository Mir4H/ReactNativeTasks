import React, {useState} from 'react';
import type {Node} from 'react';
import {Button, StyleSheet, Text, TextInput, View} from 'react-native';

const App = () => {
  return (
    <View style={styles.container}>
      <View style={styles.formstyle}>
        <TextInput style={styles.textinput} />
        <TextInput style={styles.textinput} />
      </View>
      <View style={styles.formstyle}>
        <View style={styles.buttonstyle}>
          <Button color="#38b058" title="OK" />
        </View>
        <View style={styles.buttonstyle}>
          <Button color="gray" title="Cancel" />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  textinput: {
    width: '40%',
    backgroundColor: '#d6d6d6',
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 10,
    marginBottom: 10,
  },
  buttonstyle: {
    width: '40%',
  },
  formstyle: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default App;
