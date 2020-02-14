import {StyleSheet, StatusBarProps} from 'react-native';

export const statusBackground = '#D3532C';
export const headerBackground = '#F06332';
export const COMMON_DURATION = 200;
export const DELETE_POST_DURATION = 200;

export const statusBarProps: StatusBarProps = {
  backgroundColor: statusBackground,
  barStyle: 'light-content',
};

export const commonStyles = StyleSheet.create({
  headerLogoContainer: {
    paddingLeft: 10,
    paddingRight: 6,
  },
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
    padding: 0,
    paddingTop: 2,
    paddingRight: 10,
  },

  screenContent: {paddingHorizontal: 10},

  containerStyle: {},
  inputContainerStyle: {
    alignItems: 'flex-start',
    padding: 0,
  },
  inputSelection: {},
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
