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
  pink: '#b39e98',
  lightGrey: '#B9B7BD',
  offWhite: '#F5F5F5',
};

const DataRegistry = ({navigation}) => {
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

  const renderData = item => {
    const alertDeleteItem = () => {
      Alert.alert('Attention!', 'Do you really want to delete item?', [
        {
          text: 'Delete',
          onPress: () => {
            deleteItem(item.item.id);
          },
        },
        {
          text: 'Archive',
          onPress: () => {
            archiveItem(item.item.id);
          },
        },
        {text: 'Cancel', style: 'cancel'},
      ]);
    };

    async function deleteItem(itemToDelete) {
      try {
        const dbResult = await deleteItemDb(itemToDelete);
        console.log(itemToDelete);
        readData(ordering);
      } catch (err) {
        console.log('Error: ' + err);
      } finally {
      }
    }

    async function archiveItem(itemToDelete) {
      try {
        const dbResult = await archiveItemDb(itemToDelete);
        console.log(itemToDelete);
        readData(ordering);
      } catch (err) {
        console.log('Error: ' + err);
      } finally {
      }
    }

    return (
      <Swipeable
        key={item.item.id}
        ref={ref => (swipeRow[item.item.id] = ref)}
        onSwipeableWillOpen={() => closeRow(item.item.id)}
        renderRightActions={RenderRight}
        onSwipeableRightOpen={alertDeleteItem}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() =>
            navigation.navigate('DataDetails', {person: item.item.id})
          }>
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
      </Swipeable>
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
        <Text style={{fontSize: 16}}>Sort by:</Text>
        {ordering != 'firstname' ? (
          <View style={{width: '30%'}}>
            <Button
              color={colors.pink}
              title="Firstname"
              onPress={() => orderX('firstname')}
            />
          </View>
        ) : null}
        {ordering != 'lastname' ? (
          <View style={{width: '30%'}}>
            <Button
              color={colors.pink}
              title="Lastname"
              onPress={() => orderX('lastname')}
            />
          </View>
        ) : null}
        {ordering != 'postalcode' ? (
          <View style={{width: '30%'}}>
            <Button
              color={colors.pink}
              title="Postal Code"
              onPress={() => orderX('postalcode')}
            />
          </View>
        ) : null}
      </View>
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
    backgroundColor: colors.pink,
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
});
export default DataRegistry;
