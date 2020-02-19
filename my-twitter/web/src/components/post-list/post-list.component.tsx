import React, {FC} from 'react';
// import VirtualScroller from 'virtual-scroller/react';

import {IPost} from 'models/post.model';
import {Post} from 'containers/post/post.container';
import styled from 'styled-components';
import {Empty} from 'antd';
import {isEmpty} from 'lodash-es';

export interface IProps {
  list?: IPost[];
  style?: any;
  emptyText?: string;
}

export interface IHandlers {
  onSelectItem?(item: IPost): void;
}

const renderItem = (item: IPost) => {
  return <Post key={item.id}>{item}</Post>;
};

const EmptyContainer = styled.div`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const EmptyComponent: FC = () => (
  <EmptyContainer>
    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
  </EmptyContainer>
);

export const PostListComponent: FC<IProps & IHandlers> = ({list = [], emptyText}) => {
  const renderItemWithHandlers = ({children}: {children: IPost}) => renderItem(children);

  return (
    <>
      {!isEmpty(list) && <>{list.map(item => renderItemWithHandlers({children: item}))}</>}
      {(!list || !list.length) && <EmptyComponent>{emptyText}</EmptyComponent>}
    </>
    // TODO при обновлении данных (например, like поставить) через раз происходит ререндер всех элементов, непонятно почему
    // из-за этого слетает scrollTop, если останется время - разобраться
    // <VirtualScroller
    //   preserveScrollPositionOnPrependItems={true}
    //   preserveScrollPositionAtBottomOnMount={true}
    //   items={list}
    //   itemComponent={renderItemWithHandlers}
    // />
  );
};
