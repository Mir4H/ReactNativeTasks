import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import AddBoot from './components/AddBoot';
import ModifyBoot from './components/ModifyBoot';

const App = () => {
  const [listOfBoots, addBootList] = useState([]);
  const [addBootVisible, setAddBootVisible] = useState(false);
  const [modifyBootVisible, setModifyBootVisible] = useState(false);
  const [updateId, setUpdateId] = useState(-1);
  const [bootToUpdate, setBootToUpdate] = useState();

  const addBootToList = (id, type) => {
    if (id.trim().length > 0 && type.trim().length > 0) {
      addBootList(listOfBoots => [
        ...listOfBoots,
        {id: id.trim(), type: type.trim()},
      ]);
      setAddBootVisible(false);
    } else {
      Alert.alert('No boot added!', 'One or both fields were empty.');
      setAddBootVisible(false);
    }
  };

  const modifyBoot = (id, type) => {
    if (id.trim().length > 0 && type.trim().length > 0) {
      listOfBoots[updateId].type = type.trim();
      listOfBoots[updateId].id = id.trim();
      addBootList(listOfBoots);
      setUpdateId(-1);
      setModifyBootVisible(false);
    } else {
      Alert.alert('Boot not modified!', 'One or both fields were empty.');
      setModifyBootVisible(false);
    }
  };
  const deleteBoot = removeId => {
    addBootList(listOfBoots =>
      listOfBoots.filter((boot, index) => index != removeId),
    );
  };
  const updateItem = index => {
    setUpdateId(index);
    setBootToUpdate(listOfBoots[index]);
    setModifyBootVisible(true);
  };
  const showInputModal = () => {
    setAddBootVisible(true);
  };

  return (
    <View style={styles.container}>
      <AddBoot
        visibility={addBootVisible}
        setVisibility={setAddBootVisible}
        bootDataHandler={addBootToList}
      />
      <ModifyBoot
        visibility={modifyBootVisible}
        setVisibility={setModifyBootVisible}
        bootDataHandler={modifyBoot}
        bootToUpdate={bootToUpdate}
      />
      <View style={styles.buttonSt}>
        <Button onPress={showInputModal} title="Add boot" />
      </View>
      <Text style={{fontSize: 20}}>List of Boots</Text>
      <ScrollView style={styles.scrollviewstyle}>
        {listOfBoots.map((item, index) => (
          <TouchableOpacity
            key={index}
            onLongPress={() => deleteBoot(index)}
            onPress={() => updateItem(index)}>
            <View style={styles.listText}>
              <Text style={{fontSize: 17}}>
                {item.id}: {item.type}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  buttonSt: {
    width: '80%',
    margin: 20,
  },
  listText: {
    marginTop: 5,
    marginLeft: 5,
    marginRight: 5,
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 2,
  },
  scrollviewstyle: {
    width: '80%',
    backgroundColor: '#BEBEBE',
  },
});

export default App;
