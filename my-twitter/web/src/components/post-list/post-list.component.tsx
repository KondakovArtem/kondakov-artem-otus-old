import React, {FC} from 'react';
import VirtualScroller from 'virtual-scroller/react';

import {IPost} from 'models/post.model';
import {Post} from 'containers/post/post.container';

export interface IProps {
  list?: IPost[];
  style?: any;
  emptyText?: string;
}

export interface IHandlers {
  onSelectItem?(item: IPost): void;
}

const renderItem = (item: IPost, {onSelectItem}: IHandlers) => {
  return <Post key={item.id}>{item}</Post>;
};

const EmptyComponent: FC = ({children}) => (
  <div style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
    <span style={{color: '#e0e0e0', fontSize: 40}}>{children}</span>
  </div>
);

export const PostListComponent: FC<IProps & IHandlers> = ({list = [], onSelectItem, emptyText, style}) => {
  const renderItemWithHandlers = ({children}: {children: IPost}) => renderItem(children, {onSelectItem});
  return (
    // <>{list.map(item => renderItemWithHandlers({children: item}))}</>

    <VirtualScroller
      preserveScrollPositionOnPrependItems={true}
      preserveScrollPositionAtBottomOnMount={true}
      items={list}
      itemComponent={renderItemWithHandlers}
    />
  );
};
