import React, {useState} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Details">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Boot List' }}/>
        <Stack.Screen name="AddBoot" component={AddBootScreen} options={{ title: 'Add new boot to list' }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const HomeScreen = props => {
  const [bootList, addBoot] = useState([
    {id: 1, type: 'Leather Boot', size: 39},
    {id: 2, type: 'Winter Boot', size: 42},
  ]);

  const renderBoot = item => {
    return (
      <TouchableOpacity activeOpacity={0.8}>
        <View style={styles.listItemStyle}>
          <Text>
            {item.index + 1}: {item.item.type} {item.item.size}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={{flex: 1}}>
      <Button
        onPress={() => props.navigation.navigate('AddBoot')}
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

const AddBootScreen = props => {
  const [bootType, setBootType] = useState('');
  const [bootSize, setBootSize] = useState('');

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
        <Button title="OK" />
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
