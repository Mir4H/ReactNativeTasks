
import React from 'react';
import { Button, StyleSheet, Text, TextInput, View} from 'react-native';

const FormView=(props)=>{
    return( 
        <View style={styles.mainform}>
          <View style={styles.formstyle}>
            <TextInput
              style={styles.textinput}
              maxLength={4}
              value={props.bootID}
              placeholder="ID"
              keyboardType="numeric"
              onChangeText={props.idInput}
            />
            <TextInput
              style={styles.textinput2}
              maxLength={30}
              value={props.bootType}
              placeholder="Boot Type"
              onChangeText={props.typeInput}
            />
          </View>
          <View style={styles.formstyle}>
            <View style={styles.buttonstyle}>
              <Button color="gray" title="Cancel" onPress={props.cancel} />
            </View>
            <View style={styles.buttonstyle}>
              <Button color="#38b058" title="OK" onPress={props.add} />
            </View>
          </View>
        </View>
    );
}
const styles = StyleSheet.create({
mainform: {
    alignItems: 'flex-start',
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  textinput: {
    backgroundColor: '#d6d6d6',
    width: '20%',
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 20,
    marginBottom: 10,
  },
  textinput2: {
    backgroundColor: '#d6d6d6',
    width: '70%',
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 20,
    marginBottom: 10,
  },
  formstyle: {
    width: '100%',
    flexDirection: 'row',
    marginBottom: 10,
    justifyContent: 'space-around',
  },
  buttonstyle: {
    width: '30%',
  },
});
export default FormView;