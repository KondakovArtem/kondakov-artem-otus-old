import {useRef, useEffect} from 'react';
import {isArray, isObject, each} from 'lodash-es';
import firestore from '@react-native-firebase/firestore';

export const usePrevious = <T extends {}>(value: T) => {
  const ref = useRef<T>();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

export const delay = async (count: number) => {
  return new Promise(resolve => {
    setTimeout(resolve, count);
  });
};

export const timeStampToDate = (timeStamp: any): Date | undefined => {
  if (timeStamp) {
    return timeStamp.toDate();
  }
  return undefined;
};

export const convertRawtoObject = (data: any) => {
  if (data instanceof firestore.Timestamp) {
    return timeStampToDate(data);
  }
  if (isArray(data)) {
    data.forEach((item, idx) => {
      data[idx] = convertRawtoObject(item);
    });
  } else if (isObject(data)) {
    each(data, (item: any, key: string) => {
      (data as any)[key] = convertRawtoObject(item);
    });
  }
  return data;
};
