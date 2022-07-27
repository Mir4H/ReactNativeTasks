import React, {useEffect, useState} from 'react';
import {
  Button,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  Text,
} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer, useIsFocused} from '@react-navigation/native';
import {fetchPersonData, deleteItemDb, archiveItemDb} from './../database/db';

//Defining colors to use in the styles
const colors = {
  offPink: '#a37c7c',
  lightGrey: '#B9B7BD',
  offWhite: '#F5F5F5',
  offRed: '#d65151',
};
//Details screen
const DataDetails = ({route, navigation}) => {
  const [personData, setPersonData] = useState([]);
  const isVisible = useIsFocused();
  //info of the person selected
  const person = route.params.person;

  //read the data from database once visible
  useEffect(() => {
    readData();
  }, [isVisible]);

  async function readData() {
    try {
      const dbResult = await fetchPersonData(person);
      setPersonData(dbResult);
    } catch (err) {
      console.log('Error: ' + err);
    } finally {
    }
  }
  // alert in case delete button is clicked, show archive option only if not an archived item
  const alertDeleteItem = item => {
    const buttons = [
      {text: 'Cancel', style: 'cancel'},
      {
        text: 'Delete',
        onPress: () => {
          deleteItem(item);
        },
      },
    ];

    if (personData[0]['archive'] == 0) {
      buttons.push({
        text: 'Archive',
        onPress: () => {
          archiveItem(1, item);
        },
      });
    }

    Alert.alert('Attention!', 'Do you really want to delete item?', buttons);
  };

  //set item archived
  async function archiveItem(archive, itemToArchive) {
    try {
      const dbResult = await archiveItemDb(archive, itemToArchive);
      navigation.navigate('Archive');
    } catch (err) {
      console.log('Error: ' + err);
    }
  }
  //delete item
  async function deleteItem(itemToDelete) {
    try {
      const dbResult = await deleteItemDb(itemToDelete);
      navigation.navigate('DataRegistry');
    } catch (err) {
      console.log('Error: ' + err);
    } finally {
    }
  }
  //show an icon with initials and contact details on a "card"
  const renderData = item => {
    return (
      <View style={styles.card}>
        <View style={styles.iconStyle}>
          <Text style={{fontSize: 28, color: colors.offWhite}}>
            {item.item.firstname[0].toUpperCase()}
            {item.item.lastname[0].toUpperCase()}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.textStyle}>
            {item.item.firstname.toUpperCase()}{' '}
            {item.item.lastname.toUpperCase()}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.textStyle}>
            {item.item.street == '' ? 'No street added' : item.item.street}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.textStyle}>
            {item.item.postalcode}{' '}
            {item.item.city == '' ? 'No city added' : item.item.city}
          </Text>
        </View>
      </View>
    );
  };
  // Show the card and buttons for going back, delete and update, if update is clicked the person's data is passed to the update screen
  return (
    <View style={{flex: 1}}>
      <View style={styles.homeStyle}>
        <FlatList
          style={styles.flatlistStyle}
          data={personData}
          renderItem={renderData}
        />
      </View>
      <View style={styles.buttons}>
        <View style={{width: '25%'}}>
          <Button
            color={colors.offPink}
            onPress={() => navigation.navigate('DataRegistry')}
            title="Back"
          />
        </View>
        <View style={{width: '25%'}}>
          <Button
            color={colors.offPink}
            title="Delete"
            onPress={() => alertDeleteItem(person)}
          />
        </View>
        <View style={{width: '25%'}}>
          <Button
            color={colors.offPink}
            title="Update"
            onPress={() => navigation.navigate('AddData', {id: personData})}
          />
        </View>
      </View>
    </View>
  );
};
//Styling
const styles = StyleSheet.create({
  homeStyle: {
    flex: 10,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: colors.lightGrey,
  },
  buttons: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  textStyle: {
    alignSelf: 'center',
    fontSize: 24,
    color: colors.offPink,
  },
  row: {
    flexDirection: 'row',
  },
  card: {
    marginTop: '25%',
    alignItems: 'center',
    backgroundColor: colors.offWhite,
    paddingVertical: 50,
    paddingHorizontal: 40,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    elevation: 13,
  },
  iconStyle: {
    width: 80,
    height: 80,
    backgroundColor: colors.offPink,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    flexDirection: 'row',
    marginBottom: 20,
  },
});

export default DataDetails;
