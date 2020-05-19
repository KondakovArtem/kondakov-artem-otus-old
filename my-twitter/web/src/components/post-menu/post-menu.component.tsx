import React, {FC, CSSProperties} from 'react';
import {Icon, Dropdown, Menu} from 'antd';

import {IPost} from 'models/post.model';

interface IPostMenu {
  title: string;
  key: string;
}

export interface IProps {
  children: IPost;
  menu: IPostMenu[];
  style?: CSSProperties;
}

export interface IHandlers {
  action(key: string): void;
}

export const PostMenuComponent: FC<IProps & IHandlers> = ({style, menu, action}) => {
  return (
    <Dropdown
      overlay={
        <Menu>
          {menu.map(({title, key}) => (
            <Menu.Item key={key} onClick={() => action(key)}>
              {title}
            </Menu.Item>
          ))}
        </Menu>
      }
      trigger={['click']}>
      <Icon style={style} type="down" />
    </Dropdown>
  );
};
