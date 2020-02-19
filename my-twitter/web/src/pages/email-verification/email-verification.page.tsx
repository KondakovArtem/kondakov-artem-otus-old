import React, {FC} from 'react';
import {connect} from 'react-redux';
import {Button, Typography} from 'antd';
import styled from 'styled-components';

import {IConfiguredStore} from 'store';
import authActions from 'store/auth/auth.actions';
import {BackgroundComponent, ContainerComponent, Title, Logo} from 'components/login';

interface IProps {
  isFetching: boolean;
}
interface IHandlers {
  onCancel(): void;
  onSendVerification(): void;
}

const LogoWithBg = styled(Logo)`
  background: #df441a;
  border-radius: 50%;
  box-shadow: 1px 2px 5px 2px #00000040;
`;

const ConfirmationTitle = styled(Typography.Paragraph)`
  font-size: 20px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const EmailVerificationPageComponent: FC<IProps & IHandlers> = ({onCancel, isFetching, onSendVerification}) => {
  return (
    <BackgroundComponent>
      <ContainerComponent style={{background: 'white'}}>
        <LogoWithBg />
        <Title>Email Verification</Title>

        <ConfirmationTitle>
          Please confirm your address by clicking on the link from the letter that was sent to you
        </ConfirmationTitle>

        <ButtonWrapper>
          <Button loading={isFetching} size="large" type="ghost" onClick={onSendVerification}>
            Resend
          </Button>
          <Button onClick={onCancel} size="large">
            Cancel
          </Button>
        </ButtonWrapper>
      </ContainerComponent>
    </BackgroundComponent>
  );
};

export const EmailVerificationPage = connect<IProps, IHandlers, {}, IConfiguredStore>(
  ({authData}) => {
    const {login} = authData;
    const {isFetching} = login;
    return {
      isFetching,
    };
  },
  {
    onCancel: authActions.signOut,
    onSendVerification: authActions.sendUserVerificationEmail,
  },
)(EmailVerificationPageComponent);
