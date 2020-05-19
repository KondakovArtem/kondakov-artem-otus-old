import React, {FC} from 'react';
import {Menu, Icon} from 'antd';
import {SelectParam} from 'antd/lib/menu';

export interface IMenu {
  key: string;
  icon: string;
  title: string;
  nav: string;
}

export interface IProps {
  menu: IMenu[];
  selected: string[];
}

export interface IHandlers {
  onSelect(params: SelectParam): void;
}

export const MainMenuComponent: FC<IProps & IHandlers> = ({menu, selected, onSelect}) => (
  <Menu mode="inline" selectedKeys={selected} onSelect={onSelect}>
    {menu.map(({title, key, icon}) => (
      <Menu.Item key={key}>
        <div className="menu-item-container">
          <Icon type={icon} />
          <span className="nav-text">{title}</span>
        </div>
      </Menu.Item>
    ))}
  </Menu>
);
