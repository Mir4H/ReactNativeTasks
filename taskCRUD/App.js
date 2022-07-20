import React, {useEffect, useState } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import {NavigationContainer, useIsFocused} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {init, addBootDb, fetchBoots, deleteBootDb, updateBootDb} from './database/db';

init()
  .then(()=>{
    console.log('Database creation succeeded!');
  }).catch((err)=>{
    console.log('Database IS NOT initialized! '+err);
  });

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Boot List' }}/>
        <Stack.Screen name="AddBoot" component={AddBootScreen} options={{ title: 'Add new boot to list' }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const HomeScreen = ({navigation}) => {
  const [bootList, addBoot] = useState([]);
  const isVisible = useIsFocused();

  async function readBoots() {
    try{
      const dbResult = await fetchBoots();
      addBoot(dbResult);
    }
    catch(err){
      console.log("Error: "+err);
    }
    finally{
    }
  }

  async function deleteBoot(boot) {
    try{
      const dbResult = await deleteBootDb(bootList[boot].id);
      readBoots();
    }
    catch(err){
      console.log("Error: "+err);
    }
    finally{
    }
  }

  async function updateBoot(boot) {
    navigation.navigate('AddBoot', 
    {boot: bootList[boot]});
  }

  const renderBoot = item => {
    return (
      <TouchableOpacity activeOpacity={0.8} onLongPress={()=>deleteBoot(item.index)} onPress={()=>updateBoot(item.index)}>
        <View style={styles.listItemStyle}>
          <Text>
            {item.index + 1}: {item.item.type}, {item.item.size}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  useEffect(()=> {
    readBoots();
  }, [isVisible]);

  return (
    <View style={{flex: 1}}>
      <Button
        onPress={() => navigation.navigate('AddBoot')}
        title="Add Boot"
      />
      <View style={styles.homeStyle}>
        <FlatList
          style={styles.flatlistStyle}
          data={bootList}
          renderItem={renderBoot}
        />
      </View>
    </View>
  );
};

const AddBootScreen = (props) => {
  const [bootType, setBootType] = useState(props.route.params == undefined ? "" : props.route.params.boot.type);
  const [bootSize, setBootSize] = useState(props.route.params == undefined ? "" : props.route.params.boot.size);
  const [bootId, setBootId] = useState(props.route.params == undefined ? "" : props.route.params.boot.id);

  useEffect(()=>{
    setBootType(props.route.params==undefined ? "" : props.route.params.boot.type)
    setBootSize(props.route.params==undefined ? "" : props.route.params.boot.size.toString())

  },[props.route.params]
);

  const typeInputHandler = enteredNumb => {
    setBootType(enteredNumb);
  };

  const sizeInputHandler = enteredText => {
    setBootSize(enteredText);
  };

  const cancelBoot = () => {
    setBootType('');
    setBootSize('');
    props.navigation.navigate('Home')
  };

  async function saveBoot() {
    if (bootType.trim().length > 0 && bootSize.trim().length > 0) {
      if (bootId == "") {
        try{
          await addBootDb(bootType.trim(), bootSize.trim());
        } 
        catch(err){
          console.log(err);
        } 
        finally{
          props.navigation.navigate('Home')
        }
      } else {
        try{
          await updateBootDb(bootId, bootType.trim(), bootSize.trim());
        } 
        catch(err){
          console.log(err);
        } 
        finally{
          props.navigation.navigate('Home')
        }
      }
    }
    else {
      Alert.alert('Boot not added or modified!', 'One or both fields were empty.');
    }
  }

  return (
    <View style={styles.mainform}>
      <View style={styles.formstyle}>
      <TextInput
          style={styles.typeinput}
          maxLength={30}
          value={bootType}
          onChangeText={typeInputHandler}
          placeholder="Boot Type"
        />
        <TextInput
          style={styles.sizeinput}
          maxLength={4}
          keyboardType = 'numeric'
          value={bootSize}
          onChangeText={sizeInputHandler}
          placeholder="Size"
        />
      </View>
    <View style={styles.formstyle}>
      <View style={styles.buttonstyle}>
        <Button title="Cancel" onPress={cancelBoot} />
      </View>
      <View style={styles.buttonstyle}>
        <Button title="OK" onPress={saveBoot}/>
      </View>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 20,
    padding: 2,
  },
  homeStyle: {
    flex: 8,
    alignItems: 'center',
    backgroundColor: '#eee',
    width: '100%',
  },
  flatlistStyle: {
    width: '80%',
    backgroundColor: 'grey',
  },
  listItemStyle: {
    marginTop: 5,
    padding: 5,
    backgroundColor: '#abc',
    width: '80%',
    alignSelf: 'center',
  },
  mainform: {
    alignItems: 'center',
    marginTop: 10,
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  sizeinput: {
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
export default App;
