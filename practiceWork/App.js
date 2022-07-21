import * as React from 'react';
import { Button, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import DataRegistry from './pages/DataRegistry';
import DataDetails from './pages/DataDetails';
import AddData from './pages/AddData';
import Archive from './pages/Archive';

const Drawer = createDrawerNavigator();

const App=()=>{
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="DataRegistry">
        <Drawer.Screen name="DataRegistry" component={DataRegistry} options={{ title: 'Data Registry' }}/>
        <Drawer.Screen name="DataDetails" component={DataDetails} options={{ title: 'Details' }, {drawerItemStyle:{display:'none',}}}/>
        <Drawer.Screen name="AddData" component={AddData} options={{ title: 'Add a person to registry' }}/>
        <Drawer.Screen name="Archive" component={Archive} options={{ title: 'Archive' }}/>
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default App;