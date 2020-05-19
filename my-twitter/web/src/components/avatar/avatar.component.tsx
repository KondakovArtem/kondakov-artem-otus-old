import React, {FC} from 'react';
import {Avatar, Badge, Icon} from 'antd';
import {StyleSheet, css} from 'aphrodite/no-important';

const styles = StyleSheet.create({
  icon: {
    color: 'white',
    background: 'grey',
    borderRadius: '50%',
    padding: 4,
    bottom: 0,
    top: 'inherit !important',
  },
});

export interface IProps {
  label?: string;
  imageUri?: string;
  size?: number;
  showEditButton?: boolean;
}

export interface IHandlers {
  onPress?: () => void;
  onLongPress?: () => void;
}

const WithEditButton: FC<{showEditButton?: boolean}> = ({children, showEditButton}) => {
  return !showEditButton ? (
    <>{children}</>
  ) : (
    <Badge count={<Icon type="edit" className={css(styles.icon)} />}>{children}</Badge>
  );
};

export const AvatarComponent: FC<IProps & IHandlers> = ({label, imageUri, onPress, size = 34, showEditButton}) => {
  const uri = imageUri;

  return (
    <div onClick={onPress} style={{cursor: onPress ? 'pointer' : 'inherit'}}>
      <WithEditButton showEditButton={showEditButton}>
        <Avatar size={size} src={uri}>
          {label}
        </Avatar>
      </WithEditButton>
    </div>
  );
};
