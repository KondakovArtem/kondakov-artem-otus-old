import React, {FC, ReactElement, ReactNode} from 'react';
import {StyleSheet, StyleProp, ViewStyle} from 'react-native';
import {PageHeader} from 'antd';

import {headerBackground, COMMON_DURATION} from 'constants/theme';

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

// const styles = StyleSheet.create({
//   header: {
//     paddingTop: 0,
//     paddingHorizontal: 0,
//     height: 50,
//     backgroundColor: headerBackground,
//   },
//   logoImage: {
//     height: 60,
//     aspectRatio: 1,
//   },
//   leftContainerStyle: {
//     flexShrink: 1,
//   },
//   centerContainerStyle: {
//     alignItems: 'flex-start',
//     flexGrow: 10,
//   },
//   rightContainerStyle: {
//     flexShrink: 1,
//   },

//   centerText: {
//     color: 'white',
//     paddingLeft: 10,
//     fontSize: 18,
//   },
// });

// export const HeaderComponent: FC = ({children}) => <PageHeader title={children} />;

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
