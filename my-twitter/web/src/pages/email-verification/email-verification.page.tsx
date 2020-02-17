import React, {FC} from 'react';
import {connect} from 'react-redux';
import {Button, Typography} from 'antd';

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

export const EmailVerificationPageComponent: FC<IProps & IHandlers> = ({onCancel, isFetching, onSendVerification}) => {
  return (
    <BackgroundComponent>
      <ContainerComponent style={{background: 'white'}}>
        <Logo
          style={{
            background: '#df441a',
            borderRadius: '50%',
            boxShadow: '1px 2px 5px 2px #00000040',
          }}
        />
        <Title>Email Verification</Title>

        <Typography.Paragraph style={{fontSize: '20px'}}>
          Please confirm your address by clicking on the link from the letter that was sent to you
        </Typography.Paragraph>

        <div style={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
          <Button loading={isFetching} size="large" type="ghost" onClick={onSendVerification}>
            Resend
          </Button>
          <Button onClick={onCancel} size="large">
            Cancel
          </Button>
        </div>
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
