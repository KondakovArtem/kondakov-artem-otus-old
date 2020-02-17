import React, {FC} from 'react';
import {connect} from 'react-redux';
import {Layout} from 'antd';
import {motion} from 'framer-motion';

import {IConfiguredStore} from 'store';
import {Logo} from 'components/login';
import {MainMenu} from 'containers/main-menu/main-menu.container';
import {MainRouter} from 'containers/main-router/main-router.container';
import {thumbnailVariants} from 'constants/theme';

const {Sider} = Layout;

interface IProps {
  isFetching: boolean;
}

export const AppWrapperComponent: FC<IProps> = () => {
  return (
    <motion.div {...thumbnailVariants} style={{width: '100%'}}>
      <Layout style={{minHeight: '100%'}}>
        <Sider
          theme="light"
          style={{
            overflow: 'auto',
            height: '100vh',
            background: 'transparent',
            position: 'fixed',
            padding: '0 20px 0 20px',
          }}>
          <div className="logo-header">
            <Logo
              size={44}
              style={{
                background: '#df441a',
                borderRadius: '50%',
              }}
            />
          </div>
          <MainMenu />
        </Sider>
        <Layout
          style={{
            marginLeft: 200,
          }}>
          <MainRouter />
        </Layout>
      </Layout>
    </motion.div>
  );
};

export const AppWrapper = connect<IProps, {}, {}, IConfiguredStore>(({authData}) => {
  const {login} = authData;
  const {isFetching} = login;
  return {
    isFetching,
  };
}, {})(AppWrapperComponent);
