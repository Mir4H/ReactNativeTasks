import React, {useEffect, useState } from 'react';
import { Button, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import DataRegistry from './pages/DataRegistry';
import DataDetails from './pages/DataDetails';
import AddData from './pages/AddData';
import Archive from './pages/Archive';
import {init} from './database/db';

const Drawer = createDrawerNavigator();

init()
  .then(()=>{
    console.log('Database creation succeeded!');
  }).catch((err)=>{
    console.log('Database IS NOT initialized! '+err);
  });

const App=()=>{
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="DataRegistry">
        <Drawer.Screen name="DataRegistry" initialParams={{archive: 0}} component={DataRegistry} options={{ title: 'Contacts' }}/>
        <Drawer.Screen name="DataDetails" component={DataDetails} options={{ title: 'Details' }, {drawerItemStyle:{display:'none',}}}/>
        <Drawer.Screen name="AddData" component={AddData} options={{ title: 'Add Contact' }}/>
        <Drawer.Screen name="Archive" component={DataRegistry} options={{ title: 'Archive' }}/>
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default App;{}