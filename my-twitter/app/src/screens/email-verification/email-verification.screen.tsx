import React, {FC} from 'react';
import {connect} from 'react-redux';
import {Text, Card, Button} from 'react-native-elements';
// @ts-ignore
import * as MagicMove from 'react-native-magic-move';
import * as Animatable from 'react-native-animatable';

import {IConfiguredStore} from '@app/redux/store';
import {View, StyleSheet} from 'react-native';
import {Actions} from '@app/redux/auth/auth.ducks';
import {HeaderComponent} from '@app/components/header/header.component';
import {COMMON_DURATION} from '@app/constants/theme';

interface IProps {
  isFetching: boolean;
}
interface IHandlers {
  onCancel(): void;
  onSendVerification(): void;
}

const styles = StyleSheet.create({
  cardContainer: {
    alignItems: 'center',
  },
  message: {
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    elevation: 4,
  },
});

export const EmailVerificationScreenComponent: FC<IProps & IHandlers> = ({
  onCancel,
  isFetching,
  onSendVerification,
}) => {
  return (
    <MagicMove.Scene>
      <HeaderComponent>Email Verification</HeaderComponent>
      <Animatable.View style={styles.cardContainer} animation={'fadeInDown'} useNativeDriver duration={COMMON_DURATION}>
        <Card title="Email Verification" containerStyle={styles.card}>
          <Text style={styles.message}>
            <Text>Please confirm your address by clicking on the link from the letter that was sent to you</Text>
          </Text>
          <View style={styles.buttonContainer}>
            <Button loading={isFetching} type="outline" title="Resend" onPress={onSendVerification} />
            <Button title="Cancel" onPress={onCancel} />
          </View>
        </Card>
      </Animatable.View>
    </MagicMove.Scene>
  );
};

export const EmailVerificationScreen = connect<IProps, IHandlers, {}, IConfiguredStore>(
  ({authData}) => {
    const {login} = authData;
    const {isFetching} = login;
    return {
      isFetching,
    };
  },
  {
    onCancel: Actions.signOut,
    onSendVerification: Actions.sendUserVerificationEmail,
  },
)(EmailVerificationScreenComponent);
