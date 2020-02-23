import {Platform} from 'react-native';

// Simple utility to get correct testId
export const setTestId = (id?: string, pfx: string = '') => {
  if (!id) {
    return {};
  }
  return Platform.OS === 'android' ? {accessibilityLabel: id + pfx} : {testID: id + pfx};
};
