import {useRef, useEffect} from 'react';
import {isArray, isObject, each} from 'lodash-es';
import {Timestamp} from 'services/firebase';
import {differenceInSeconds} from 'date-fns';
import {round} from 'lodash-es';

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

export const uuidv4 = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export const convertRawtoObject = (data: any) => {
  if (data instanceof Timestamp) {
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
