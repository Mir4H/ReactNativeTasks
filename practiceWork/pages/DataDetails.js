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
import {fetchPersonData} from './../database/db';

const colors = {
  pink: '#b39e98',
  lightGrey: '#B9B7BD',
  offWhite: '#F5F5F5',
};

const DataDetails = ({route, navigation}) => {
  /*  return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Button onPress={() => navigation.navigate('DataRegistry')} title="Data Registry" />
          <Button onPress={() => navigation.goBack()} title="Cancel" />
        </View>
      );
  }*/

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

  const renderData = item => {
    return (
      <TouchableOpacity activeOpacity={0.8}>
        <View style={styles.card}>
        <View style={styles.row}>
          <Text style={styles.textStyle}>
            {item.item.firstname.toUpperCase()}{' '}
            {item.item.lastname.toUpperCase()}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.textStyle}>{item.item.street == "" ? "No street added" : item.item.street}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.textStyle}>
            {item.item.postalcode} {item.item.city == "" ? "No city added" : item.item.city}
          </Text>
        </View>
        </View>
      </TouchableOpacity>
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
        <Button
          color={colors.pink}
          onPress={() => navigation.navigate('DataRegistry')}
          title="Back"
        />
        <Button
          color={colors.pink}
          title="Delete"
          onPress={() => readData('lastname')}
        />
        <Button
          color={colors.pink}
          title="Update"
          onPress={() => readData('postalcode')}
        />
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
    marginTop: '50%',
    justifyContent:'center',
    alignItems: 'center',
    backgroundColor: colors.offWhite,
    padding: 60,
  }
});

export default DataDetails;
