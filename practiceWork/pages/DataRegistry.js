import React, {useEffect, useState} from 'react';
import {Button, View, StyleSheet, FlatList, TouchableOpacity, Text} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer, useIsFocused} from '@react-navigation/native';
import {fetchData} from './../database/db';

const DataRegistry = ({navigation}) => {

  const [registryData, setRegistryData] = useState([]);
  const isVisible = useIsFocused();

  useEffect(() => {
    readData('id');
  }, [isVisible])

  async function readData(orderBy) {
    try{
      const dbResult = await fetchData(orderBy);
      setRegistryData(dbResult);
    }
    catch(err){
      console.log("Error: "+err);
    }
    finally{
        console.log(registryData);
    }
  }

  const renderData = item => {
    return (
      <TouchableOpacity activeOpacity={0.8}>
        <View style={styles.listItemStyle}>
          <Text>
            {item.item.firstname.toUpperCase() } {item.item.lastname.toUpperCase()} - {item.item.postalcode}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{flex: 1}}>
      <View style={styles.homeStyle}>
        <FlatList
          style={styles.flatlistStyle}
          data={registryData}
          renderItem={renderData}
        />
      </View>
      <Text>Sort by</Text>
      <View style={styles.buttons}>
      <Button title="Firstname" onPress={() => readData('firstname')}/>
      <Button title="Lastname" onPress={() => readData('lastname')}/>
      <Button title="Postal Code" onPress={() => readData('postalcode')}/>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 5,
    }
});
export default DataRegistry;
