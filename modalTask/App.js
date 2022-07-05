import React, {useState} from 'react';
import type {Node} from 'react';
import FormView from './components/AddBoot';
import {
  Button,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
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

 return (
    <View style={styles.container}>
      <Modal visible={visibility} animationType="fade">
        <FormView bootID={bootID} bootType={bootType} idInput={idInputHandler} typeInput={typeInputHandler} cancel={cancelBoot} add={addBootToList}/>
      </Modal>
      <View style={styles.listStyle}>
      <View style={styles.buttonSt}>
        <Button color="#38b058" title='Add new boot' onPress={showInputView} />
        </View>
        <Text style={{fontSize: 20}}>List of Boots</Text>
        <ScrollView style={styles.scrollviewstyle}>
        {listOfBoots.map((item, index) => (
          <TouchableOpacity key={index} onLongPress={()=>deleteItem(index)}>
          <View style={styles.listText}>
            <Text style={{ fontSize: 17 }}>
            {item.idBoot}: {item.typeBoot}
            </Text>
          </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
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
  scrollviewstyle:{
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
