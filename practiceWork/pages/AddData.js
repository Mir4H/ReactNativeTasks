import React, {useEffect, useState} from 'react';
import {Text, Button, View, StyleSheet, TextInput, SafeAreaView, Keyboard} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import InputField from './components/InputField';
import {ScrollView} from 'react-native-gesture-handler';

const AddData = ({navigation}) => {

  const [fieldInput, setFieldInput]= useState({
    firstname: '',
    lastname: '',
    street: '',
    postalCode: '',
    city: '',
  });  

  const fieldChanged = (enteredText, field) => {
    setFieldInput(previous => ({...previous, [field]: enteredText}));
  };

  return (
    <View style={styles.mainform}>
      <Text style={styles.textStyleBig}>Please fill in the form</Text>
      <Text style={styles.textStyleSmall}>Fields marked with * can't be empty</Text>
      <ScrollView>
        <View style={styles.formstyle}>
          <InputField 
          label="Firstname *" 
          placeholder="Firstname... " 
          onChangeText ={(text)=>fieldChanged(text, "firstname")} />
          <InputField 
          label="Lastname *" 
          placeholder="Lastname... "
          onChangeText ={(text)=>fieldChanged(text, "lastname")} />
          <InputField 
          label="Street" 
          placeholder="Street... "
          onChangeText ={(text)=>fieldChanged(text, "street")} />
          <InputField 
          label="Postal Code *" 
          placeholder="Postal Code... "
          onChangeText ={(text)=>fieldChanged(text, "postalCode")} />
          <InputField 
          label="City" 
          placeholder="City... "
          onChangeText ={(text)=>fieldChanged(text, "city")} />
          <View style={styles.buttonRow}>
            <View style={styles.buttonstyle}>
              <Button title="Add" />
            </View>
            <View style={styles.buttonstyle}>
              <Button onPress={() => navigation.goBack()} title="Cancel" />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainform: {
    flex: 1,
    marginTop: 10,
    width: '100%',
    flexDirection: 'column',
  },
  formstyle: {
    marginHorizontal: 15,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 15,
  },
  buttonstyle: {
    width: '40%',
    height: 50,
  },
  textStyleBig: {
    color: 'black',
    fontSize: 30,
    fontWeight: 'bold',
    marginLeft: 15,
  },
  textStyleSmall: {
    fontSize: 14,
    marginLeft: 15,
    marginBottom: 15,
  },
});

export default AddData;
