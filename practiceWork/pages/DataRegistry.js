import * as React from 'react';
import { Button, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

const DataRegistry = ({ navigation }) => {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button onPress={() => navigation.navigate('DataDetails')} title="Details" />
        <Button onPress={() => navigation.navigate('AddData')} title="Add Data" />
      </View>
    );
  }

  export default DataRegistry;