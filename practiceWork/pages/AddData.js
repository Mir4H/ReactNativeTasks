import React, {useEffect, useState} from 'react';
import {Text, Button, View, StyleSheet, TextInput, SafeAreaView, Keyboard} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import InputField from './components/InputField';
import {ScrollView} from 'react-native-gesture-handler';
import {saveDataToDb} from './../database/db';

const AddData = ({navigation}) => {

  const [fieldInput, setFieldInput]= useState({
    firstname: '',
    lastname: '',
    street: '',
    postalCode: '',
    city: '',
  });  
  const [errors, setErrors] = useState({});

  const fieldChanged = (enteredText, field) => {
    setFieldInput(fields => ({...fields, [field]: enteredText}));
  };

  const checkInput = () => {
    Keyboard.dismiss();
    if (!fieldInput.firstname.trim()) {
        handleError('Please input firstname', 'firstname')
    }
    if (!fieldInput.lastname.trim()) {
        handleError('Please input lastname', 'lastname')
    }
    if (!fieldInput.postalCode.trim()) {
        handleError('Please input postal code', 'postalCode')
    }
    else {
        saveData();
    }
  };

  const handleError = (errorMsg, input) => {
    setErrors((errors)=>({...errors, [input]: errorMsg}))
  }

  async function saveData() {
    try{
        await saveDataToDb(fieldInput.firstname.trim(), fieldInput.lastname.trim(), fieldInput.street.trim(), fieldInput.postalCode.trim(), fieldInput.city.trim(), 0);
    } 
    catch(err){
        console.log(err);
    } 
    finally{
        navigation.navigate('DataRegistry');
    }
  }

  return (
    <View style={styles.mainform}>
      <Text style={styles.textStyleBig}>Please fill in the form</Text>
      <Text style={styles.textStyleSmall}>Fields marked with * can't be empty</Text>
      <ScrollView>
        <View style={styles.formstyle}>
          <InputField 
          label="Firstname *" 
          placeholder="Firstname... " 
          onChangeText ={(text)=>fieldChanged(text, "firstname")}  
          error={errors.firstname}
          onFocus={() => {
            handleError(null, 'firstname');
          }}/>
          <InputField 
          label="Lastname *" 
          placeholder="Lastname... "
          onChangeText ={(text)=>fieldChanged(text, "lastname")} 
          error={errors.lastname}
          onFocus={() => {
            handleError(null, 'lastname');
          }}/>
          <InputField 
          label="Street" 
          placeholder="Street... "
          onChangeText ={(text)=>fieldChanged(text, "street")} />
          <InputField 
          label="Postal Code *" 
          placeholder="Postal Code... "
          keyboardType = 'numeric'
          onChangeText ={(text)=>fieldChanged(text, "postalCode")} 
          error={errors.postalCode}
          onFocus={() => {
            handleError(null, 'postalCode');
          }}/>
          <InputField 
          label="City" 
          placeholder="City... "
          onChangeText ={(text)=>fieldChanged(text, "city")} />
          <View style={styles.buttonRow}>
            <View style={styles.buttonstyle}>
              <Button onPress={checkInput} title="Add" />
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
