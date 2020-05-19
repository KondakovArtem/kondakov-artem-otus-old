import React from 'react';
import {Spin, Icon} from 'antd';
import styled from 'styled-components';

import {statusBackground} from 'constants/theme';

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SpinSize = styled(Spin)`
  font-size: 56;
  color: ${statusBackground};
`;

export const LoadingComponent = () => {
  return (
    <Container>
      <SpinSize indicator={<Icon type="loading" spin />} />
    </Container>
  );
};
