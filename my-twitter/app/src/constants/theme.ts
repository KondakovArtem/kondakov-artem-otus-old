// import {DefaultTheme, Theme} from 'react-native-paper';
import {StyleSheet} from 'react-native';

// export const theme: Theme = {
//   ...DefaultTheme,
//   roundness: 2,
//   colors: {
//     ...DefaultTheme.colors,
//     primary: '#2089dc',
//     accent: '#f1c40f',
//     // background: '#E75527',
//     // text: 'white',
//   },
// };

export const commonStyles = {
  textColor: 'white',
};

const styles = StyleSheet.create({
  input: {
    fontWeight: '100',
    paddingLeft: 10,
    minHeight: 50,
  },
  inputLabel: {
    fontWeight: '100',
    textTransform: 'uppercase',
  },
  leftIconContainerStyle: {
    marginLeft: 0,
    marginTop: 0,
    marginBottom: 0,
    height: 32,
    padding: 0,
  },
  containerStyle: {
    // paddingBottom: 20,
  },
  inputContainerStyle: {
    alignItems: 'flex-start',
    height: 38,
    padding: 0,
  },
  inputSelection: {
    //color: '#ffffffa0',
  },
  errorStyle: {
    color: 'red',
  },
  errorContainer: {
    height: 20,
    paddingHorizontal: 15,
  },
});

export const inputStyleProps = {
  leftIconContainerStyle: styles.leftIconContainerStyle,
  containerStyle: styles.containerStyle,
  inputContainerStyle: styles.inputContainerStyle,
  inputStyle: styles.input,
  labelStyle: styles.inputLabel,
  errorStyle: styles.errorStyle,
  errorContainer: styles.errorContainer,
};
