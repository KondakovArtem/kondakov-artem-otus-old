import AsyncStorage from '@react-native-community/async-storage';
import {createTransform} from 'redux-persist';

const replacer = (key: string, value: any) => (value instanceof Date ? value.toISOString() : value);
const reviver = (key: string, value: any) =>
  typeof value === 'string' && value.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/) ? new Date(value) : value;
const encode = (toDeshydrate: any) => JSON.stringify(toDeshydrate, replacer);
const decode = (toRehydrate: any) => {
  return typeof toRehydrate === 'string' ? JSON.parse(toRehydrate, reviver) : toRehydrate;
};

export default {
  key: 'root',
  storage: {
    setItem: async (key: string, value: any) => {
      return await AsyncStorage.setItem(key, value);
    },
    getItem: async (key: string) => {
      const res = await AsyncStorage.getItem(key);
      return res;
    },
    removeItem: async (key: string) => {
      return await AsyncStorage.removeItem(key);
    },
  },
  transforms: [createTransform(encode, decode)],
};
