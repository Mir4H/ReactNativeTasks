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
import {fetchData} from './../database/db';

const colors = {
    pink: '#b39e98',
    lightGrey: '#B9B7BD',
    offWhite: '#F5F5F5',
}

const DataRegistry = ({navigation}) => {
  const [registryData, setRegistryData] = useState([]);
  const isVisible = useIsFocused();

  useEffect(() => {
    readData('id');
  }, [isVisible]);

  async function readData(orderBy) {
    try {
      const dbResult = await fetchData(orderBy);
      setRegistryData(dbResult);
    } catch (err) {
      console.log('Error: ' + err);
    } finally {
    }
  }

  const renderData = item => {
    return (
      <TouchableOpacity activeOpacity={0.8} onPress={()=>navigation.navigate('DataDetails', {person: item.item.id})}>
        <View style={styles.listItemStyle}>
          <View style={styles.iconStyle}>
            <Text style={{fontSize: 16, color: '#F5F5F5'}}>
              {item.item.firstname[0].toUpperCase()}
              {item.item.lastname[0].toUpperCase()}
            </Text>
          </View>
          <Text style={styles.textStyle}>
            {item.item.firstname.toUpperCase()}{' '}
            {item.item.lastname.toUpperCase()} - {item.item.postalcode}
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
      <View style={styles.buttons}>
      <Text style={{fontSize: 15}}>Sort by:</Text>
        <Button color={colors.pink} title="Firstname" onPress={() => readData('firstname')} />
        <Button color={colors.pink} title="Lastname" onPress={() => readData('lastname')} />
        <Button color={colors.pink} title="Postal Code" onPress={() => readData('postalcode')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  homeStyle: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
  },
  flatlistStyle: {
    width: '100%',
    backgroundColor: colors.lightGrey,
  },
  listItemStyle: {
    height: 55,
    padding: 5,
    marginTop: 1,
    backgroundColor: colors.offWhite,
    width: '100%',
    justifyContent: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 5,
    marginTop: 5,
    alignItems: 'center',
  },
  textStyle: {
    alignSelf: 'center',
    marginLeft: 20,
    fontSize: 16,
  },
  iconStyle: {
    width: 45,
    height: 45,
    backgroundColor: colors.pink,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    flexDirection: 'row',
  },
});
export default DataRegistry;
