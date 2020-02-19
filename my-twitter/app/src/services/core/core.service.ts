import {useRef, useEffect} from 'react';
import {isArray, isObject, each} from 'lodash-es';
import firestore from '@react-native-firebase/firestore';
import {differenceInSeconds} from 'date-fns';
import {round} from 'lodash-es';
import {Platform} from 'react-native';

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

// Simple utility to get correct testId
export const setTestId = (id?: string, pfx: string = '') => {
  if (!id) {
    return {};
  }
  return Platform.OS === 'android' ? {accessibilityLabel: id + pfx} : {testID: id + pfx};
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

export const getDateAgo = (date: Date) => {
  if (!date) {
    return '...';
  }
  const diffSec = differenceInSeconds(Date.now(), date);
  if (diffSec < 60) {
    return 'less 1 min';
  } else if (diffSec < 3600) {
    return `${round(diffSec / 60)}m`;
  } else if (diffSec < 3600 * 24) {
    return `${round(diffSec / 3600)}h`;
  }
  return `${round(diffSec / (3600 * 24))}d`;
};
