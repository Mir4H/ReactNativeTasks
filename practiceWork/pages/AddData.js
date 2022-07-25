import React, {useEffect, useState} from 'react';
import {Text, Button, View, StyleSheet, TextInput, SafeAreaView, Keyboard, ActivityIndicator } from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer, useIsFocused} from '@react-navigation/native';
import InputField from './components/InputField';
import {ScrollView} from 'react-native-gesture-handler';
import {saveDataToDb, fetchPersonData, updateDataToDb} from './../database/db';

const AddData = ({route, navigation}) => {

    const person = route.params == undefined ? null : route.params.id;

// Setting data based on input fields
  const [fieldInput, setFieldInput]= useState({
    personId: '',
    firstname: '',
    lastname: '',
    street: '',
    postalCode: '',
    city: '',
  });  

  const load = person !== null;

  useEffect(() => {
    if (route.params?.id) {
        fieldChanged(person[0]['id'], "personId")
        fieldChanged(person[0]['firstname'], "firstname")
        fieldChanged(person[0]['lastname'], "lastname")
        fieldChanged(person[0]['street'], "street")
        fieldChanged(person[0]['postalcode'], "postalCode")
        fieldChanged(person[0]['city'], "city")
    }
  }, [load]);

//When field changes set data 
  const fieldChanged = (enteredText, field) => {
    setFieldInput(fields => ({...fields, [field]: enteredText}));
  };

//Setting error message based on empty fields
  const [errors, setErrors] = useState({});

  const handleError = (errorMsg, input) => {
    setErrors((errors)=>({...errors, [input]: errorMsg}))
  }

  //Check for empty fields and show error if any
  //Otherwise save data to database
  const checkInput = () => {
    Keyboard.dismiss(); //Close keyboard
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
        if (fieldInput.personId == "") {
            saveData();
        }
        else {
            updateData();
        }
    }
  };

  // Saving inputted data to database function
  async function saveData() {
    try{
        await saveDataToDb(fieldInput.firstname.trim(), fieldInput.lastname.trim(), fieldInput.street.trim(), fieldInput.postalCode.trim(), fieldInput.city.trim());
    } 
    catch(err){
        console.log(err);
    } 
    finally{
        emptyFiels();
        //Empty fields & go back to Registry page
    }
  }

  async function updateData() {
    try{
        await updateDataToDb(fieldInput.firstname.trim(), fieldInput.lastname.trim(), fieldInput.street.trim(), fieldInput.postalCode.trim(), fieldInput.city.trim(), fieldInput.personId);
    } 
    catch(err){
        console.log(err);
    } 
    finally{
        emptyFiels();
        //Empty fields & go back to Registry page
    }
  }


  const emptyFiels = () => {
    setFieldInput({
        personId: '',
        firstname: '',
        lastname: '',
        street: '',
        postalCode: '',
        city: '',
      });
    setErrors("");
    navigation.navigate('DataRegistry');
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
          }}
          value={fieldInput.firstname}
          />
          <InputField 
          label="Lastname *" 
          placeholder="Lastname... "
          onChangeText ={(text)=>fieldChanged(text, "lastname")} 
          error={errors.lastname}
          onFocus={() => {
            handleError(null, 'lastname');
          }}
          value={fieldInput.lastname}/>
          <InputField 
          label="Street" 
          placeholder="Street... "
          onChangeText ={(text)=>fieldChanged(text, "street")} 
          value={fieldInput.street}/>
          <InputField 
          label="Postal Code *" 
          placeholder="Postal Code... "
          keyboardType = 'numeric'
          onChangeText ={(text)=>fieldChanged(text, "postalCode")} 
          error={errors.postalCode}
          onFocus={() => {
            handleError(null, 'postalCode');
          }}
          value={fieldInput.postalCode}/>
          <InputField 
          label="City" 
          placeholder="City... "
          onChangeText ={(text)=>fieldChanged(text, "city")} 
          value={fieldInput.city}/>
          <View style={styles.buttonRow}>
            <View style={styles.buttonstyle}>
              <Button onPress={checkInput} title="Add" />
            </View>
            <View style={styles.buttonstyle}>
              <Button onPress={emptyFiels} title="Cancel" />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
container: {
flex: 1,
alignItems: 'center', 
backgroundColor: '#fff',
justifyContent: 'center',
},
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
