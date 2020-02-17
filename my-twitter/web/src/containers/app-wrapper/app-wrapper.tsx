import React, {FC} from 'react';
import {connect} from 'react-redux';
import {Layout} from 'antd';

import {motion} from 'framer-motion';

import {IConfiguredStore} from 'store';
import authActions from 'store/auth/auth.actions';
import {Logo} from 'components/login';
import {MainMenu} from 'containers/main-menu/main-menu.container';
import {MainRouter} from 'containers/main-router/main-router.container';

const {Header, Content, Sider} = Layout;

interface IProps {
  isFetching: boolean;
}
interface IHandlers {
  onCancel(): void;
}

const thumbnailVariants = {
  initial: {opacity: 0, y: -10},
  animate: {opacity: 1, y: 0},
  transition: {duration: 0.5},
  exit: {
    scale: 0.5,
    opacity: 0,
  },
};

export const AppWrapperComponent: FC<IProps & IHandlers> = ({onCancel}) => {
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
          <button onClick={onCancel}>Sign out</button>
        </Sider>
        <Layout
          style={{
            marginLeft: 200,
          }}>
          <MainRouter />
          {/* <Header style={{background: '#fff', padding: 0}} />
          <Content style={{margin: '24px 16px 0', overflow: 'initial'}}>
            <div style={{padding: 24, background: '#fff', textAlign: 'center'}}>
              
            </div>
          </Content> */}
        </Layout>
      </Layout>
    </motion.div>
  );
};

export const AppWrapper = connect<IProps, IHandlers, {}, IConfiguredStore>(
  ({authData}) => {
    const {login} = authData;
    const {isFetching} = login;
    return {
      isFetching,
    };
  },
  {
    onCancel: authActions.signOut,
  },
)(AppWrapperComponent);
