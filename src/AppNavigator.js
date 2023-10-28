import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import AllNotes from './screens/AllNotes';
import AddNotes from './screens/AddNotes';
const Stack = createStackNavigator();
const AppNavigator = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen
            name="AllNotes"
            component={AllNotes}
            options={{headerShown:false}}/>
             <Stack.Screen
            name="AddNotes"
            component={AddNotes}
            options={{headerShown:true}}/>
        </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
