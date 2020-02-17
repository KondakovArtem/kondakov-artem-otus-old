import {connect} from 'react-redux';
import {SelectParam} from 'antd/lib/menu';

import {IConfiguredStore, ThunkAction} from 'store';
import {navUtils} from 'services/navigation';
import {
  MainMenuComponent,
  IProps as IComponentProps,
  IHandlers as IComponentHandlers,
  IMenu,
} from 'components/main-menu/main-menu.component';
import {MAIN_SCREEN, EXPLORE_SCREEN, USER_PROFILE_SCREEN, FOLLOW_SCREEN} from 'models/navigation.model';
import {withRouter} from 'react-router-dom';

const menu: IMenu[] = [
  {
    icon: 'home',
    title: 'Home',
    key: MAIN_SCREEN,
    nav: MAIN_SCREEN,
  },
  {
    icon: 'search',
    title: 'Explore',
    key: EXPLORE_SCREEN,
    nav: EXPLORE_SCREEN,
  },
  {
    icon: 'user',
    title: 'Profile',
    key: USER_PROFILE_SCREEN,
    nav: USER_PROFILE_SCREEN,
  },
  {
    icon: 'usergroup-add',
    title: 'Follows',
    key: FOLLOW_SCREEN,
    nav: FOLLOW_SCREEN,
  },
];

export const MainMenu = withRouter(
  connect<IComponentProps, IComponentHandlers, {}, IConfiguredStore>(
    () => {
      return {
        selected: [navUtils.getCurrentScreen()],
        menu,
      };
    },
    {
      onSelect: ({key}: SelectParam) => () => {
        navUtils.navigate(key);
      },
    },
  )(MainMenuComponent),
);
