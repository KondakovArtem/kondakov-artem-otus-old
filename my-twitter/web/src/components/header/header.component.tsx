import React, {FC, ReactElement} from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import {PageHeader} from 'antd';

export interface IProps {
  children?: string;
  leftComponent?: ReactElement;
  rightComponent?: ReactElement;
  centerComponent?: ReactElement;
  rootId?: string;
  centerContainerStyle?: StyleProp<ViewStyle>;
  leftContainerStyle?: StyleProp<ViewStyle>;
  rightContainerStyle?: StyleProp<ViewStyle>;
}

const LeftComponent: FC = ({children}) => <>{children && children}</>;
const CenterComponent: FC<{component?: ReactElement}> = ({children, component}) => (
  <>
    {component && component}
    {children && <div>{children}</div>}
  </>
);

export const HeaderComponent: FC<IProps> = ({children, centerComponent, leftComponent, rightComponent}) => {
  return (
    <PageHeader
      title={
        <>
          <LeftComponent>{leftComponent}</LeftComponent>
          <CenterComponent component={centerComponent}>{children}</CenterComponent>
        </>
      }
      extra={rightComponent}></PageHeader>
  );
};
