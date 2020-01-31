import {DefaultTheme, Theme} from 'react-native-paper';

export const theme: Theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#2089dc',
    accent: '#f1c40f',
    // text: 'white',
  },
};
