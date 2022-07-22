import React, {useEffect, useState} from 'react';
import {
  Button,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Text,
} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer, useIsFocused} from '@react-navigation/native';
import {fetchPersonData, deleteItemDb} from './../database/db';

const colors = {
  pink: '#b39e98',
  lightGrey: '#B9B7BD',
  offWhite: '#F5F5F5',
};

const DataDetails = ({route, navigation}) => {
  const [personData, setPersonData] = useState([]);
  const isVisible = useIsFocused();

  useEffect(() => {
    readData();
  }, [isVisible]);

  async function readData() {
    try {
      const dbResult = await fetchPersonData(route.params.person);
      setPersonData(dbResult);
    } catch (err) {
      console.log('Error: ' + err);
    } finally {
    }
  }

  async function deleteItem(itemToDelete) {
    try {
      const dbResult = await deleteItemDb(itemToDelete);
      navigation.navigate('DataRegistry');
    } catch (err) {
      console.log('Error: ' + err);
    } finally {
    }
  }

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
          color={colors.pink}
          onPress={() => navigation.navigate('DataRegistry')}
          title="Back"
        /></View>
        <View style={{width: '25%'}}>
        <Button
          color={colors.pink}
          title="Delete"
          onPress={() => deleteItem(route.params.person)}
        /></View>
        <View style={{width: '25%'}}>
        <Button
          color={colors.pink}
          title="Update"
          onPress={() => navigation.navigate('AddData', {person: route.params.person})}
        /></View>
      </View>
    </View>
  );
};

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
  },
  row: {
    flexDirection: 'row',
  },
  card: {
    marginTop: '35%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.offWhite,
    padding: 60,
    shadowColor: '#000',
    elevation: 5,
  },
  iconStyle: {
    width: 80,
    height: 80,
    backgroundColor: colors.pink,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    flexDirection: 'row',
    marginBottom: 20,
  },
});

export default DataDetails;
