import {createTransform, PersistConfig} from 'redux-persist';
import localforage from 'localforage';
import {merge, set, cloneDeep, isObject, each, isArray} from 'lodash-es';

const replacer = (key: string, value: any) => (value instanceof Date ? value.toISOString() : value);
const reviver = (key: string, value: any) => {
  return typeof value === 'string' && value.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/) ? new Date(value) : value;
};

const revive = (data: any) => {
  if (isObject(data) || isArray(data)) {
    each(data, (value, key) => {
      (data as any)[key] = revive(value);
    });
  }
  return reviver('', data);
};

interface IBlackStore {
  [key: string]: string[];
}

const blackStore: IBlackStore = {
  common: ['inited'],
};

const encode = (toDeshydrate: any, key: any) => {
  const blackList = blackStore[key];
  if (blackList) {
    const mergeData = {};
    blackList.forEach(blackPath => {
      set(mergeData, blackPath, null);
    });
    toDeshydrate = merge(cloneDeep(toDeshydrate), mergeData);
  }
  return JSON.parse(JSON.stringify(toDeshydrate, replacer));
};
const decode = (toRehydrate: any) => {
  return typeof toRehydrate === 'string' ? JSON.parse(toRehydrate, reviver) : revive(toRehydrate);
};

export default {
  key: 'root',
  storage: {
    setItem: async (key: string, value: any) => {
      return await localforage.setItem(key, value);
    },
    getItem: async (key: string) => {
      const res = await localforage.getItem(key);
      return res;
    },
    removeItem: async (key: string) => {
      return await localforage.removeItem(key);
    },
  },
  transforms: [createTransform(encode, decode)],
} as PersistConfig<any>;
