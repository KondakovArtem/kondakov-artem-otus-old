import React, {FC} from 'react';
import {connect} from 'react-redux';
import {Layout} from 'antd';
import {createUseStyles} from 'react-jss';

import {IConfiguredStore} from 'store';
import {Logo} from 'components/login';
import {MainMenu} from 'containers/main-menu/main-menu.container';
import {MainRouter} from 'navigation/main-router/main-router.container';
import {thumbnailVariants} from 'constants/theme';
import {MotionWrapperComponent} from 'components/motion-wrapper/motion-wrapper.component';

const {Sider} = Layout;

const useStyles = createUseStyles({
  motion: {
    width: '100%',
    maxWidth: '800px',
    display: 'block',
  },
  sider: {
    overflow: 'auto',
    height: '100vh',
    background: 'transparent',
    position: 'fixed',
    padding: '0 20px 0 20px',
  },
  logo: {
    background: '#df441a',
    borderRadius: '50%',
  },
  layout: {minHeight: '100%'},
  logoHeader: {
    display: 'flex',
    alignItems: 'center',
    height: '64px',
  },
});

interface IProps {
  isFetching: boolean;
}

export const AppWrapperComponent: FC<IProps> = () => {
  const classes = useStyles();

  return (
    <MotionWrapperComponent {...thumbnailVariants} className={classes.motion}>
      <Layout className={classes.layout}>
        <Sider theme="light" className={classes.sider}>
          <div className={classes.logoHeader}>
            <Logo size={44} className={classes.logo} />
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
    </MotionWrapperComponent>
  );
};

export const AppWrapper = connect<IProps, {}, {}, IConfiguredStore>(({authData}) => {
  const {login} = authData;
  const {isFetching} = login;
  return {
    isFetching,
  };
}, {})(AppWrapperComponent);
