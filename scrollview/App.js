import React, {useState} from 'react';
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  View,
} from 'react-native';

const App = () => {
  const [fish, setFish] = useState();
  const [listOfFish, addFish] = useState([]);
  const [updateID, setUpdateID] = useState(-1);

  const fishInputHandler = enteredText => {
    setFish(enteredText);
  };

  const addFishToList = () => {
    if (updateID != -1) {
      listOfFish[updateID] = fish;
      addFish(listOfFish);
      setUpdateID(-1);
    } else {
      addFish(listOfFish => [...listOfFish, fish]);
    }
    setFish('');
  };

  const deleteItem = index => {
    addFish(listOfFish => listOfFish.filter((fish, id) => id != index));
  };

  const updateItem = index => {
    setUpdateID(index);
    setFish(listOfFish[index]);
  };

  const FishList = () => {
    return listOfFish.map((item, index) => (
      <TouchableOpacity
        key={index}
        onLongPress={() => deleteItem(index)}
        onPress={() => updateItem(index)}>
        <View style={styles.listItemStyle}>
          <Text style={{fontSize: 16}}>
            {index + 1}: {item}
          </Text>
        </View>
      </TouchableOpacity>
    ));
  };

  return (
    <View style={styles.container}>
      <View style={styles.formview}>
        <TextInput
          style={styles.textinput}
          maxLength={30}
          value={fish}
          placeholder="Add some fish.."
          onChangeText={fishInputHandler}
        />
        <View style={styles.buttonstyle}>
          <Button color="#38b058" title="OK" onPress={addFishToList} />
        </View>
      </View>
      <Text style={styles.titleText}>List of Fish</Text>
      <View style={styles.listStyle}>
        <ScrollView style={styles.scrollStyle}>
          <FishList />
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  formview: {
    marginTop: 30,
    width: '80%',
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  textinput: {
    backgroundColor: '#d6d6d6',
    borderColor: 'gray',
    borderWidth: 1,
    width: '70%',
  },
  buttonstyle: {
    width: '20%',
  },
  titleText: {
    marginBottom: 10,
    alignItems: 'center',
    fontSize: 20,
  },
  listStyle: {
    flex: 8,
    alignItems: 'center',
    backgroundColor: '#d9d9d9',
    width: '100%',
    borderTopWidth: 1,
    borderColor: '#38b058',
  },
  listItemStyle: {
    width: '80%',
    marginTop: 5,
    borderColor: 'grey',
    padding: 8,
    borderWidth: 1,
    backgroundColor: '#f0f7f6',
    alignSelf: 'center',
  },
  scrollStyle: {
    width: '90%',
    backgroundColor: '#63bf7c',
  },
});

export default App;
