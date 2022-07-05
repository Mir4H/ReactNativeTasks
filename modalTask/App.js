import React, {useState} from 'react';
import type {Node} from 'react';
import {
  Button,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';

const App = () => {
  const [visibility, setVisibility] = useState(false);
  const [bootID, setBootID] = useState();
  const [bootType, setBootType] = useState();
  const [listOfBoots, addBoot] = useState([]);

  const idInputHandler = enteredText => {
    setBootID(enteredText);
  }
  const typeInputHandler = enteredNumb => {
    setBootType(enteredNumb);
  }
  const addBootToList=()=>{
    addBoot(listOfBoots=>[...listOfBoots, {idBoot:bootID, typeBoot:bootType}]);
    setVisibility(false);
  }

  const keyHandler=(item, index)=>{
    return index.toString();
  }

  const showInputView=()=>{
    setVisibility(true);
  }

  const cancelBoot=()=>{
    setBootType('');
    setBootID('');
    setVisibility(false);
  }
  const deleteItem = removeId => {
    addBoot(listOfBoots => listOfBoots.filter((boot, index) => index != removeId));
  };
  const renderFish=({item, index})=>{
    return (
      <TouchableOpacity activeOpacity={0.8} onLongPress={()=>deleteItem(index)}>
        <View style={styles.listText}><Text style={{ fontSize: 17 }} key={index}>{item.idBoot}: {item.typeBoot}</Text></View>
      </TouchableOpacity>
    );
  }
 return (
    <View style={styles.container}>
      <Modal visible={visibility} animationType="fade">
        <View style={styles.mainform}>
          <View style={styles.formstyle}>
            <TextInput
              style={styles.textinput}
              maxLength={4}
              value={bootID}
              placeholder="ID"
              keyboardType="numeric"
              onChangeText={idInputHandler}
            />
            <TextInput
              style={styles.textinput2}
              maxLength={30}
              value={bootType}
              placeholder="Boot Type"
              onChangeText={typeInputHandler}
            />
          </View>
          <View style={styles.formstyle}>
            <View style={styles.buttonstyle}>
              <Button color="gray" title="Cancel" onPress={cancelBoot} />
            </View>
            <View style={styles.buttonstyle}>
              <Button color="#38b058" title="OK" onPress={addBootToList} />
            </View>
          </View>
        </View>
      </Modal>
      <View style={styles.listStyle}>
      <View style={styles.buttonSt}>
        <Button color="#38b058" title='Add new boot' onPress={showInputView} />
        </View>
        <Text style={{fontSize: 20}}>List of Boots</Text>
        <FlatList style={styles.flatliststyle}
          keyExtractor={keyHandler}
          data={listOfBoots}
          renderItem={renderFish}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width:"100%",
  },
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
  buttonSt: {
    width: '80%',
    margin: 20,
  },
  titleText: {
    marginTop: 5,
    alignItems: 'center',
  },
  listText: {
    marginTop: 5,
    marginLeft: 5,
    marginRight: 5,
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 2,
  },
  flatliststyle:{
    width:'80%',
    backgroundColor:'#BEBEBE',
  },
  listStyle:{
    flex:8,
    alignItems:'center',
    justifyContent:'space-around',
    backgroundColor:"#eee",
    borderColor:"black",
    borderWidth:2,
    width:"100%",

  },
});

export default App;
