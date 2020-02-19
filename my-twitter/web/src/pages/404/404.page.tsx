import React from 'react';
import {Result, Button} from 'antd';
import {navUtils} from 'services/navigation';
import {MAIN_SCREEN} from 'models/navigation.model';

export const Page404 = () => {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button type="primary" onClick={() => navUtils.navigate(MAIN_SCREEN)}>
          Back Home
        </Button>
      }
    />
  );
};
