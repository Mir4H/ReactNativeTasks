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

//Defining colors to use in the styles
const colors = {
  offPink: '#a37c7c',
  lightGrey: '#B9B7BD',
  offWhite: '#F5F5F5',
  offRed: '#d65151',
};

const DataRegistry = ({route, navigation}) => {
  // variables
  const [selected, setSelected] = useState(new Map());
  const [registryData, setRegistryData] = useState([]);
  const isVisible = useIsFocused();
  // sort by default by first name
  const [ordering, SetOrdering] = useState('firstname');
  const prop = route.params == undefined ? 1 : route.params.archive;

  // once the screen is visible read the data & order by id
  useEffect(() => {
    readData('id');
  }, [isVisible]);

  // handling the order of the items once a button is clicked. Set the new order and read the data in that order
  function orderX(x) {
    SetOrdering(x);
    readData(x);
  }

  // handling selection of an item & setting the selection of the item to opposite what it was
  const onSelect = useCallback(
    id => {
      const newSelected = new Map(selected);
      newSelected.set(id, !selected.get(id));

      setSelected(newSelected);
    },
    [selected],
  );

  // Deleting selected items from database and selection list
  const deleteFromMap = () => {
    for (let [key, value] of selected) {
      if (value === true) {
        deleteItem(key);
        selected.delete(key);
      }
    }
  };

  // Mark selected items archived
  const archiveFromMap = () => {
    for (let [key, value] of selected) {
      if (value === true) {
        archiveItem(key);
        selected.delete(key);
      }
    }
  };

  // Checking if some item is selected
  const findInMap = (map, val) => {
    for (let [k, v] of map) {
      if (v === val) {
        return true;
      }
    }
    return false;
  };

  // Alert once multiple items selected and delete button is clicked
  const alertDeleteMultiple = () => {
    // Buttons that always show on the alert
    const buttons = [
      {text: 'Cancel', style: 'cancel'},
      {
        text: 'Delete',
        onPress: () => {
          deleteFromMap();
        },
      },
    ];
    // show also archive button, if on main contact screen
    if (prop == 0) {
      buttons.push({
        text: 'Archive',
        onPress: () => {
          archiveFromMap();
        },
      });
    }
    Alert.alert('Attention!', 'Do you really want to delete item?', buttons);
  };

  // Return selected items from the archive to the main contact screen
  async function returnMultiple() {
    //Go through all items on selection list
    for (let [key, value] of selected) {
      // if item is selected modify the archive column of that item in the database and read new data to the screen
      if (value === true) {
        try {
          const dbResult = await archiveItemDb(0, key);
          selected.delete(key);
          readData(ordering);
        } catch (err) {
          console.log('Error: ' + err);
        }
      }
    }
  }

  // Read data from the database, prop defines if reading main or archived contact data. Order by sort selection and set the registry data, catch any error
  async function readData(orderBy) {
    try {
      const dbResult = await fetchData(prop, orderBy);
      setRegistryData(dbResult);
    } catch (err) {
      console.log('Error: ' + err);
    }
  }

  // delete item from the database
  async function deleteItem(itemToDelete) {
    try {
      const dbResult = await deleteItemDb(itemToDelete);
      readData(ordering);
    } catch (err) {
      console.log('Error: ' + err);
    }
  }
  // Mark item to be archived in the database, 1 for archive
  async function archiveItem(itemToArchive) {
    try {
      const dbResult = await archiveItemDb(1, itemToArchive);
      readData(ordering);
    } catch (err) {
      console.log('Error: ' + err);
    }
  }

  // Handeling what's shown if item is swiped
  const RenderRight = (progress, dragX) => {
    // scale the text
    const scale = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [1.2, 0.5],
      extrapolate: 'clamp',
    });
    // change opacity of the background
    const opacity = dragX.interpolate({
      inputRange: [-100, 1],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });
    // Shown "under" the list item once it's swiped
    return (
      <Animated.View style={[styles.deleteStyle, {opacity: opacity}]}>
        <Animated.Text
          style={{
            color: colors.offWhite,
            fontWeight: '600',
            transform: [{scale}],
          }}>
          Delete
        </Animated.Text>
      </Animated.View>
    );
  };

  // If an item is swiped and user clicks on cancel button on the alert, the swipe will close
  let swipedItem = [],
    prevOpened;

  const closeSwipe = useCallback(
    id => {
      if (prevOpened && prevOpened !== swipedItem[id]) {
        prevOpened.close();
      }
      prevOpened = swipedItem[id];
    },
    [swipedItem],
  );

  //Item of the flatlist
  function Item({id, firstname, lastname, postalcode, selected, onSelect}) {
    //alerting when deleting by swipe
    const alertDeleteItem = () => {
      const buttons = [
        {
          text: 'Cancel',
          style: 'cancel',
          onPress: () => {
            closeSwipe(-1);
          },
        },
        {
          text: 'Delete',
          onPress: () => {
            deleteItem(id);
          },
        },
      ];
      // show archive option only if on main contacts screen
      if (prop == 0) {
        buttons.push({
          text: 'Archive',
          onPress: () => {
            archiveItem(id);
          },
        });
      }
      Alert.alert('Attention!', 'Do you really want to delete item?', buttons);
    };

    return (
      // swipeable item
      <Swipeable
        key={id}
        //reference in order to close the swipe in case of cancel
        ref={ref => (swipedItem[id] = ref)}
        onSwipeableWillOpen={() => closeSwipe(id)}
        //show the delete view when swiping
        renderRightActions={RenderRight}
        //delete (alert) if fully opened by swipe
        onSwipeableRightOpen={alertDeleteItem}>
        {/*enable touch features*/}
        <TouchableOpacity
          //touch item opacity
          activeOpacity={0.8}
          // click on the item opens details page
          onPress={() => navigation.navigate('DataDetails', {person: id})}
          // long press selects or deselects the item
          onLongPress={() => onSelect(id)}
          // styling changes based on if selected or not
          style={[
            styles.listItemStyle,
            {backgroundColor: selected ? colors.offPink : colors.offWhite},
          ]}>
          <View
            style={[
              styles.iconStyle,
              {backgroundColor: selected ? colors.offWhite : colors.offPink},
            ]}>
            <Text
              style={{
                fontSize: 18,
                color: selected ? colors.offPink : colors.offWhite,
              }}>
              {firstname[0].toUpperCase()}
              {lastname[0].toUpperCase()}
            </Text>
          </View>
          <Text
            style={[
              styles.textStyle,
              {color: selected ? colors.offWhite : colors.offPink},
            ]}>
            {firstname.toUpperCase()} {lastname.toUpperCase()} | {postalcode}
          </Text>
        </TouchableOpacity>
      </Swipeable>
    );
  }

  return (
    <View style={{flex: 1}}>
      {/*show add contact in case no contacts added yet and screen is main contact screen*/}
      {registryData.length < 1 && prop === 0 ? (
        <View style={styles.buttons}>
          <View style={{width: '50%'}}>
            <Button
              color={colors.offPink}
              title="Add contact"
              onPress={() => navigation.navigate('AddData')}
            />
          </View>
        </View>
      ) : null}
      <View style={styles.homeStyle}>
        {/*Flatflist defined with data of Registry data, Item is an individual item on the list */}
        <FlatList
          style={styles.flatlistStyle}
          data={registryData}
          extraData={selected}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <Item
              id={item.id}
              firstname={item.firstname}
              lastname={item.lastname}
              postalcode={item.postalcode}
              selected={!!selected.get(item.id)}
              onSelect={onSelect}
            />
          )}
        />
      </View>
      {/*If items selected show different buttons */}
      {findInMap(selected, true) || selected == {} ? (
        <View style={styles.buttons}>
          <View style={{width: '40%'}}>
            <Button
              color={colors.offPink}
              title="Delete selected"
              onPress={alertDeleteMultiple}
            />
          </View>
          {/*Different second button based on if showing archived or main contacts */}
          {prop === 0 ? (
            <View style={{width: '40%'}}>
              <Button
                color={colors.offPink}
                title="Archive selected"
                onPress={archiveFromMap}
              />
            </View>
          ) : (
            <View style={{width: '40%'}}>
              <Button
                color={colors.offPink}
                title="Return selected"
                onPress={returnMultiple}
              />
            </View>
          )}
        </View>
      ) : (
        <View style={styles.buttons}>
          <Text style={{fontSize: 18, color: colors.offPink}}>Sort by:</Text>
          {/* Showing 2 buttons for ordering, the third is the on selected and shown on the screen and therefore it's hidden */}
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
        </View>
      )}
    </View>
  );
};
//Styling of the elements
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
    backgroundColor: colors.offRed,
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
