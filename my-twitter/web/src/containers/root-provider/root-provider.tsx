import React, {FC, useEffect} from 'react';
import {connect} from 'react-redux';

import {IConfiguredStore} from 'store';
import {Actions as commonActions} from 'store/common/common.actions';
import {LoadingComponent} from 'components/loading/loading.component';

export interface IProps {
  inited: boolean;
}

export interface IHandlers {
  onInit(): void;
}

export const RootProviderComponent: FC<IProps & IHandlers> = ({inited, onInit, children}) => {
  useEffect(() => {
    onInit && onInit();
  }, [onInit]);
  return (
    <>
      {inited && children}
      {!inited && <LoadingComponent />}
    </>
  );
};

export const RootProvider = connect<IProps, IHandlers, {}, IConfiguredStore>(
  ({common}) => ({
    inited: common.inited,
  }),
  {
    onInit: commonActions.init,
  },
)(RootProviderComponent);
