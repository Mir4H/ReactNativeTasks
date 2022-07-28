import React, {useEffect, useState} from 'react';
import {
  Text,
  Button,
  View,
  StyleSheet,
  TextInput,
  SafeAreaView,
  Keyboard,
  ActivityIndicator,
} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer, useIsFocused} from '@react-navigation/native';
import InputField from './components/InputField';
import {ScrollView} from 'react-native-gesture-handler';
import {saveDataToDb, fetchPersonData, updateDataToDb} from './../database/db';

//Defining colors to use in the styles
const colors = {
  offPink: '#a37c7c',
  lightGrey: '#B9B7BD',
  offWhite: '#F5F5F5',
  offRed: '#d65151',
  offBlack: '#2e2c2b',
};

const AddData = ({route, navigation}) => {
  // if route params exist set person with the id data
  const person = route.params == undefined ? null : route.params.id;

  // Setting data based on input fields
  const [fieldInput, setFieldInput] = useState({
    personId: '',
    firstname: '',
    lastname: '',
    street: '',
    postalCode: '',
    city: '',
  });

  //if params have data fill in the form with the existing details
  useEffect(() => {
    if (person !== null) {
      fieldChanged(person[0]['id'], 'personId');
      fieldChanged(person[0]['firstname'], 'firstname');
      fieldChanged(person[0]['lastname'], 'lastname');
      fieldChanged(person[0]['street'], 'street');
      fieldChanged(person[0]['postalcode'], 'postalCode');
      fieldChanged(person[0]['city'], 'city');
    }
  }, [route.params]);

  //When field changes set data
  const fieldChanged = (enteredText, field) => {
    setFieldInput(fields => ({...fields, [field]: enteredText}));
  };

  //Setting error message based on empty fields
  const [errors, setErrors] = useState({});

  const handleError = (errorMsg, input) => {
    setErrors(errors => ({...errors, [input]: errorMsg}));
  };

  //Check for empty fields and show an error if any, otherwise save or update data to database
  const checkInput = () => {
    Keyboard.dismiss(); //Close keyboard
    if (!fieldInput.firstname.trim()) {
      handleError('Please input first name', 'firstname');
    }
    if (!fieldInput.lastname.trim()) {
      handleError('Please input last name', 'lastname');
    }
    if (!fieldInput.postalCode.trim()) {
      handleError('Please input postal code', 'postalCode');
    } if (fieldInput.firstname.trim() && fieldInput.lastname.trim() && fieldInput.postalCode.trim()) {
        if (fieldInput.personId == '') {
            saveData();
          } else {
            updateData();
          }
    }
  };

  // Saving inputted data to database function
  async function saveData() {
    try {
      await saveDataToDb(
        fieldInput.firstname.trim(),
        fieldInput.lastname.trim(),
        fieldInput.street.trim(),
        fieldInput.postalCode.trim(),
        fieldInput.city.trim(),
      );
    } catch (err) {
      console.log(err);
    } finally {
      //Empty fields & go back to Registry page
      emptyFiels();
    }
  }

  async function updateData() {
    try {
      await updateDataToDb(
        fieldInput.firstname.trim(),
        fieldInput.lastname.trim(),
        fieldInput.street.trim(),
        fieldInput.postalCode.trim(),
        fieldInput.city.trim(),
        fieldInput.personId,
      );
    } catch (err) {
      console.log(err);
    } finally {
      //Empty fields & go back to Registry page
      emptyFiels();
    }
  }

  //Empty fields & go back to Registry page
  const emptyFiels = () => {
    setFieldInput({
      personId: '',
      firstname: '',
      lastname: '',
      street: '',
      postalCode: '',
      city: '',
    });
    setErrors('');
    navigation.goBack();
  };

  return (
    <View style={styles.mainform}>
      {/*The form to be shown */}
      <Text style={styles.textStyleBig}>Please fill in the form</Text>
      <Text style={styles.textStyleSmall}>
        Fields marked with * can't be empty
      </Text>
      {/*Inside scrollview, so user can scroll the view if one has small screen */}
      <ScrollView>
        <View style={styles.formstyle}>
          {/*The textimput field created as custom component Inputfield, since repetitive. 
        The value will be set to the state variable list and in case of an error a specific error will be shown*/}
          <InputField
            label="First name *"
            placeholder="First name... "
            maxLength={12}
            onChangeText={text => fieldChanged(text, 'firstname')}
            error={errors.firstname}
            onFocus={() => {
              handleError(null, 'firstname');
            }}
            value={fieldInput.firstname}
          />
          <InputField
            label="Last name *"
            placeholder="Last name... "
            maxLength={17}
            onChangeText={text => fieldChanged(text, 'lastname')}
            error={errors.lastname}
            onFocus={() => {
              handleError(null, 'lastname');
            }}
            value={fieldInput.lastname}
          />
          <InputField
            label="Street"
            placeholder="Street... "
            maxLength={30}
            onChangeText={text => fieldChanged(text, 'street')}
            value={fieldInput.street}
          />
          <InputField
            label="Postal Code *"
            placeholder="Postal Code... "
            keyboardType="numeric"
            maxLength={7}
            onChangeText={text => fieldChanged(text, 'postalCode')}
            error={errors.postalCode}
            onFocus={() => {
              handleError(null, 'postalCode');
            }}
            value={fieldInput.postalCode}
          />
          <InputField
            label="City"
            placeholder="City... "
            maxLength={15}
            onChangeText={text => fieldChanged(text, 'city')}
            value={fieldInput.city}
          />
          {/*Showing submit and cancel buttons. Submit will check all required fields are filled before saving the data. 
          Cancel will empty all fields and go back*/}
          <View style={styles.buttonRow}>
            <View style={styles.buttonstyle}>
              <Button
                color={colors.offPink}
                onPress={checkInput}
                title="Submit"
              />
            </View>
            <View style={styles.buttonstyle}>
              <Button
                color={colors.offPink}
                onPress={emptyFiels}
                title="Cancel"
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
//Styling
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainform: {
    flex: 1,
    width: '100%',
    flexDirection: 'column',
    backgroundColor: colors.offWhite,
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
    marginTop: 10,
    color: 'black',
    fontSize: 30,
    fontWeight: 'bold',
    marginLeft: 15,
    color: colors.offBlack,
  },
  textStyleSmall: {
    fontSize: 14,
    marginLeft: 15,
    marginBottom: 15,
    color: colors.offBlack,
  },
});

export default AddData;
