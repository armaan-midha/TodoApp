import * as React from 'react';
import {AppRegistry} from 'react-native';
import {PaperProvider, DarkTheme, DefaultTheme} from 'react-native-paper';
import {name as appName} from './app.json';

import {Provider} from 'react-redux';
import store from './src/store/store';
import App from './App';

export default function Main() {
  const [isDarkTheme, setIsDarkTheme] = React.useState(true);

  // const theme = isDarkTheme ? DarkTheme : DefaultTheme;

  const theme = {
    ...DefaultTheme,
    dark: isDarkTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: '#C8ACD6',
      accent: '#f1c40f',
      background: '#000',
      surface: '#C8ACD6',
      text: '#fff',
      error: '#e74c3c',
      disabled: '#7f8c8d',
    },
  };

  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <App />
      </PaperProvider>
    </Provider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
