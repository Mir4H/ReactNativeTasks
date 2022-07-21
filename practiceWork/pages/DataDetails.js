import * as React from 'react';
import { Button, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

const DataDetails = ({ navigation }) => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Button onPress={() => navigation.navigate('DataRegistry')} title="Data Registry" />
          <Button onPress={() => navigation.goBack()} title="Cancel" />
        </View>
      );
  }

  export default DataDetails;