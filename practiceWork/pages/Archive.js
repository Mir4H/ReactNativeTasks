import React, {useEffect, useState } from 'react';
import { Button, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

const Archive = ({ navigation }) => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Button onPress={() => navigation.navigate('DataRegistry')} title="Data Registry" />
          <Button onPress={() => navigation.navigate('DataDetails')} title="Details" />
          <Button onPress={() => navigation.goBack()} title="Cancel" />
        </View>
      );
  }

  export default Archive;