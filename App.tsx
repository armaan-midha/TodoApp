import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TaskConfig, TaskList, Tasks } from './src/screens';

const Stack = createStackNavigator();

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#000',
            borderBottomWidth: 0,
            elevation: 0,
            shadowOpacity: 0,
          },
          headerTintColor: '#C8ACD6',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen name="List" component={TaskList}  />
        <Stack.Screen name="Tasks" component={Tasks} options={{ headerTitle: () => null }} />
        <Stack.Screen name="TaskConfig" component={TaskConfig} options={{ headerTitle: () => null }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
