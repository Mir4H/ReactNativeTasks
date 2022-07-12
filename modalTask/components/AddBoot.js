import React, {useEffect, useState} from 'react';
import {Text, Modal, View, TextInput, Button, StyleSheet} from 'react-native';

const AddBoot = (props) => {
    const [bootID, setBootID] = useState('');
    const [bootType, setBootType] = useState('');
    
    useEffect(()=>{
        setBootID(props.bootToUpdate==undefined ? "" : props.bootToUpdate.id);
        setBootType(props.bootToUpdate==undefined ? "" : props.bootToUpdate.type);
    }, [props.bootToUpdate])

    const idInputHandler = (enteredText) => {
        setBootID(enteredText);
      }

    const typeInputHandler = (enteredNumb) => {
        setBootType(enteredNumb);
      }
    const cancelBoot=()=>{
        setBootType('');
        setBootID('');
      }
    const addBootList=()=>{
        props.bootDataHandler(bootID, bootType);
        setBootType('');
        setBootID('');
    }

    return(
        <Modal visible={props.visibility}>
          <View style={styles.mainform}>
            <View style={styles.formstyle}>
            <TextInput
              style={styles.idinput}
              maxLength={4}
              value={bootID}
              onChangeText={idInputHandler}
              placeholder="ID"
            />
            <TextInput
              style={styles.typeinput}
              maxLength={30}
              value={bootType}
              onChangeText={typeInputHandler}
              placeholder="Boot Type"
            />
          </View>
          </View>
          <View style={styles.formstyle}>
            <View style={styles.buttonstyle}>
              <Button title="Cancel" onPress={cancelBoot} />
            </View>
            <View style={styles.buttonstyle}>
              <Button title="OK" onPress={addBootList} />
            </View>
          </View>        
        </Modal>
      );
    };

const styles = StyleSheet.create({
    mainform: {
        alignItems: 'flex-start',
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'space-around',
      },
    idinput: {
        backgroundColor: '#d6d6d6',
        width: '20%',
        borderColor: 'gray',
        borderWidth: 1,
        marginTop: 20,
        marginBottom: 10,
      },
    typeinput: {
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

  export default AddBoot;