import React, {FC} from 'react';
import styled from 'styled-components';
import {motion} from 'framer-motion';
import {Typography, Button} from 'antd';
import {ButtonProps} from 'antd/lib/button';
import {thumbnailVariants} from 'constants/theme';

interface ITitleProps {
  color?: string;
  level?: 1 | 2 | 3 | 4;
}

const StyledTitle = styled(Typography.Title)`
  color: ${({style}) => style && style.color && `${style.color} !important`};
  padding-top: 10px;
  padding-bottom: 10px;
`;

export const Title: FC<ITitleProps> = ({color, ...rest}) => (
  <StyledTitle style={{color: color && `${color}`}} {...rest} />
);

export const LogoComponent: FC<{style?: any; size?: number}> = props => <img {...props} src={'/images/logo.png'} />;

export const Logo = styled(LogoComponent)`
  width: ${({size}) => (size ? size : 150)}px;
  height: ${({size}) => (size ? size : 150)}px;
  padding: ${({size}) => (size ? size / 10 : 15)}px;
  object-fit: contain;
`;

const FullWidthButton = styled(Button)`
  width: 100%;
`;

export const FullWidthButtonComponent: FC<ButtonProps> = props => {
  const {shape = 'round', type = 'primary', size = 'large'} = props;
  return <FullWidthButton {...props} {...{shape, type, size}}></FullWidthButton>;
};

export const BackgroundComponent = styled.div`
  background-image: radial-gradient(
    circle farthest-corner at 10% 20%,
    rgba(205, 33, 42, 1) 0%,
    rgba(236, 95, 5, 1) 90%
  );
  width: 100%;
  height: 100%;
  padding: 20px;
`;

const MotionContainer = styled(motion.div)`
  padding: 20px;
  max-width: 600px;
  min-width: 310px;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #ffffff17;
  border-radius: 10px;
`;
export const ContainerComponent: FC<{style?: any}> = ({children, style}) => (
  <MotionContainer {...thumbnailVariants} style={style}>
    {children}
  </MotionContainer>
);
