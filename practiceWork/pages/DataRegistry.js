import React, {useCallback, useEffect, useState} from 'react';
import {
  Button,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Text,
  Animated,
  Alert,
  Modal,
} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer, useIsFocused} from '@react-navigation/native';
import {fetchData, deleteItemDb, archiveItemDb} from './../database/db';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const colors = {
  offPink: '#b39e98',
  lightGrey: '#B9B7BD',
  offWhite: '#F5F5F5',
};

const DataRegistry = ({navigation}) => {
  const [selected, setSelected] = React.useState(new Map());
  const [registryData, setRegistryData] = useState([]);
  const isVisible = useIsFocused();
  const [ordering, SetOrdering] = useState('firstname');
  
  useEffect(() => {
    readData('id');
  }, [isVisible]);

  function orderX(x) {
    SetOrdering(x);
    readData(x);
  }
  const findInMap = (map, val) => {
    for (let [k, v] of map) {
      if (v === val) { 
        return true; 
      }
    }  
    return false;
  }
  
const onSelect = useCallback(
    id => {
      const newSelected = new Map(selected);
      newSelected.set(id, !selected.get(id));

      setSelected(newSelected);
    },
    [selected],
  );

  const deleteFromMap = () => {
    for (let [key, value] of selected) {
        if (value === true) {
            deleteItem(key);
            selected.delete(key);
        }
      }
  }

  const archiveFromMap = () => {
    for (let [key, value] of selected) {
        if (value === true) {
            archiveItem(key);
            selected.delete(key);
        }
      }
  }

  async function readData(orderBy) {
    try {
      const dbResult = await fetchData(orderBy);
      setRegistryData(dbResult);
    } catch (err) {
      console.log('Error: ' + err);
    } finally {
    }
  }

  const RenderRight = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [1.2, 0.5],
      extrapolate: 'clamp',
    });

    const opacity = dragX.interpolate({
      inputRange: [-100, 1],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });

    return (
      <Animated.View style={[styles.deleteStyle, {opacity: opacity}]}>
        <Animated.Text
          style={{color: '#fff', fontWeight: '600', transform: [{scale}]}}>
          Delete
        </Animated.Text>
      </Animated.View>
    );
  };

  let swipeRow = [],
    prevOpenRow;

  const closeRow = useCallback(
    id => {
      if (prevOpenRow && prevOpenRow !== swipeRow[id]) {
        prevOpenRow.close();
      }
      prevOpenRow = swipeRow[id];
    },
    [swipeRow],
  );

  async function deleteItem(itemToDelete) {
    try {
      const dbResult = await deleteItemDb(itemToDelete);
      readData(ordering);
    } catch (err) {
      console.log('Error: ' + err);
    } 
  }

  async function archiveItem(itemToArchive) {
    try {
      const dbResult = await archiveItemDb(itemToArchive);
      readData(ordering);
    } catch (err) {
      console.log('Error: ' + err);
    } 
  }

  function Item({ id, firstname, lastname, postalcode, selected, onSelect }) {
    const alertDeleteItem = () => {
        Alert.alert('Attention!', 'Do you really want to delete item?', [
          {
            text: 'Delete',
            onPress: () => {
              deleteItem(id);
            },
          },
          {
            text: 'Archive',
            onPress: () => {
              archiveItem(id);
            },
          },
          {text: 'Cancel', style: 'cancel'},
        ]);
      };
  
  
    return (
        <Swipeable
        key={id}
        ref={ref => (swipeRow[id] = ref)}
        onSwipeableWillOpen={() => closeRow(id)}
        renderRightActions={RenderRight}
        onSwipeableRightOpen={alertDeleteItem}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() =>
            navigation.navigate('DataDetails', {person: id})}
          onLongPress={() => onSelect((id))}
          style={[
            styles.listItemStyle,
            { backgroundColor: selected ? colors.offPink : colors.offWhite },
          ]}>
            <View style={[styles.iconStyle, {backgroundColor: selected ? colors.offWhite : colors.offPink}]}>
              <Text style={{fontSize: 16, color: selected ? colors.offPink : colors.offWhite }}>
                {firstname[0].toUpperCase()}
                {lastname[0].toUpperCase()}
              </Text>
            </View>
            <Text style={styles.textStyle}>
              {firstname.toUpperCase()}{' '}
              {lastname.toUpperCase()} - {postalcode}
            </Text>
          
        </TouchableOpacity>
      </Swipeable>
    );
  }


  return (
    <View style={{flex: 1}}>
    {registryData.length < 1 ? (
        <View style={styles.buttons}>
        <View style={{width: '50%'}}>
            <Button
              color={colors.offPink}
              title="Add Data"
              onPress={() => navigation.navigate('AddData')}
            /></View></View>
    ) : null }
      <View style={styles.homeStyle}>
        <FlatList
          style={styles.flatlistStyle}
          data={registryData}
          extraData={selected}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <Item
              id={item.id}
              firstname={item.firstname}
              lastname={item.lastname}
              postalcode= {item.postalcode}
              selected={!!selected.get(item.id)}
              onSelect={onSelect}
            />)}
        />
      </View>
      {findInMap(selected, true) || selected == {} ? (
      <View style={styles.buttons}>
          <View style={{width: '40%'}}>
            <Button
              color={colors.offPink}
              title="Delete selected"
              onPress={deleteFromMap}
            />
          </View>
          <View style={{width: '40%'}}>
            <Button
              color={colors.offPink}
              title="Archive selected"
              onPress={archiveFromMap}
            />
          </View>
      </View>) : <View style={styles.buttons}>
        <Text style={{fontSize: 16}}>Sort by:</Text>
        {ordering != 'firstname' ? (
          <View style={{width: '30%'}}>
            <Button
              color={colors.offPink}
              title="Firstname"
              onPress={() => orderX('firstname')}
            />
          </View>
        ) : null}
        {ordering != 'lastname' ? (
          <View style={{width: '30%'}}>
            <Button
              color={colors.offPink}
              title="Lastname"
              onPress={() => orderX('lastname')}
            />
          </View>
        ) : null}
        {ordering != 'postalcode' ? (
          <View style={{width: '30%'}}>
            <Button
              color={colors.offPink}
              title="Postal Code"
              onPress={() => orderX('postalcode')}
            />
          </View>
        ) : null}
      </View> }
    </View>
  );
};

const styles = StyleSheet.create({
  homeStyle: {
    flex: 12,
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
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 5,
    marginTop: 5,
    alignItems: 'center',
  },
  buttonStyle: {
    width: 100,
  },
  textStyle: {
    alignSelf: 'center',
    marginLeft: 20,
    fontSize: 16,
  },
  iconStyle: {
    width: 45,
    height: 45,
    backgroundColor: colors.offPink,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    flexDirection: 'row',
  },
  deleteStyle: {
    width: 100,
    marginTop: 1,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
});
export default DataRegistry;
