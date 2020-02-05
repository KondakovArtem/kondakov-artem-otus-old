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

export const statusBackground = '#D3532C';
export const headerBackground = '#F06332';
export const COMMON_DURATION = 200;

export const commonStyles = StyleSheet.create({
  input: {
    fontWeight: '100',
    paddingLeft: 0,
    textAlignVertical: 'top',
  },
  inputLabel: {
    fontWeight: '100',
    textTransform: 'uppercase',
  },
  leftIconContainerStyle: {
    marginLeft: 0,
    marginTop: 0,
    marginBottom: 0,
    // height: 32,
    padding: 0,
    paddingTop: 2,
    paddingRight: 10,
  },


  
  containerStyle: {
    // paddingBottom: 20,
  },
  inputContainerStyle: {
    alignItems: 'flex-start',
    // height: 38,
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

  inputContainer: {
    alignItems: 'stretch',
    width: '100%',
    minWidth: 350,
    maxWidth: 400,
    paddingHorizontal: 30,
  },

  fullWidthContainer: {
    width: '100%',
  },
  fullWidthButton: {
    marginTop: 20,
    borderRadius: 0,
    height: 60,
    backgroundColor: '#E75527',
  },
  fullWidthButtonTitle: {
    fontSize: 20,
  },
});

export const inputStyleProps = {
  leftIconContainerStyle: commonStyles.leftIconContainerStyle,
  containerStyle: commonStyles.containerStyle,
  inputContainerStyle: commonStyles.inputContainerStyle,
  inputStyle: commonStyles.input,
  labelStyle: commonStyles.inputLabel,
  errorStyle: commonStyles.errorStyle,
  errorContainer: commonStyles.errorContainer,
};

export const fullWidthButtonProps = {
  buttonStyle: commonStyles.fullWidthButton,
  titleStyle: commonStyles.fullWidthButtonTitle,
};
