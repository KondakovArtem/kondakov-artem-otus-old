import React, {FC} from 'react';
import LottieView from 'lottie-react-native';
import styled from 'styled-components/native';

import triangleLoading from '@app/../assets/animations/triangle-loading.json';

const Wrapper = styled.View`
  flex: 1;
  width: 100%;
  height: 100%;
`;

const LoadingText = styled.Text`
  font-size: 22;
  margin-top: 100;
  color: #29ccea;
`;

const TextContainer = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  justify-content: center;
  align-items: center;
`;

export const LoadingScreenComponent: FC = () => (
  <Wrapper>
    <LottieView source={triangleLoading} autoPlay loop />
    <TextContainer>
      <LoadingText>Loading</LoadingText>
    </TextContainer>
  </Wrapper>
);
