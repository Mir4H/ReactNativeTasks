import React, {useEffect, useState } from 'react';
import { Button, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import DataRegistry from './pages/DataRegistry';
import DataDetails from './pages/DataDetails';
import AddData from './pages/AddData';
import {init} from './database/db';

const colors = {
  offPink: '#a37c7c',
  lightGrey: '#B9B7BD',
  offWhite: '#F5F5F5',
  offRed: '#d65151',
};
// Creating drawer navigation
const Drawer = createDrawerNavigator();

//initializing the database
init()
  .then(()=>{
    console.log('Database creation succeeded!');
  }).catch((err)=>{
    console.log('Database IS NOT initialized! '+err);
  });

//Defining the navigation and screens
const App=()=>{
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="DataRegistry" screenOptions={{drawerActiveBackgroundColor: colors.offPink, drawerActiveTintColor: colors.offWhite}}>
        {
        //initialParams will define if the screen shows the main contacts or archived contacts, both DataRegistry and Archive Screens use the same component
        }
        <Drawer.Screen name="DataRegistry" initialParams={{archive: 0}} component={DataRegistry} options={{ title: 'Contacts' }}/>
        <Drawer.Screen name="DataDetails" component={DataDetails} options={{ title: 'Details' }, {drawerItemStyle:{display:'none',}}}/>
        <Drawer.Screen name="AddData" component={AddData} options={{ title: 'Add Contact' }}/>
        <Drawer.Screen name="Archive" component={DataRegistry} options={{ title: 'Archive' }}/>
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default App;{}