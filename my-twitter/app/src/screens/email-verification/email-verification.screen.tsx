import React, {FC} from 'react';
import {connect} from 'react-redux';
import {Text} from 'react-native-elements';
// @ts-ignore
import * as MagicMove from 'react-native-magic-move';
import * as Animatable from 'react-native-animatable';

import {IConfiguredStore} from '@app/redux/store';

interface IProps {}
interface IHandlers {}

export const EmailVerificationScreenComponent: FC<IProps & IHandlers> = props => {
  const {} = props;
  return (
    <MagicMove.Scene>
      <MagicMove.View
        // debug
        id="login_header"
        transition={MagicMove.Transition.morph}
        duration={200}
        style={{height: 60, backgroundColor: '#F06332', flexDirection: 'row', alignItems: 'center', paddingLeft: 10}}>
        <MagicMove.Image
          id="logo"
          transition={MagicMove.Transition.morph}
          duration={200}
          source={require('mytwitter/assets/images/logo.png')}
          style={{width: 60, aspectRatio: 1}}
          resizeMode={'contain'}
        />
        <MagicMove.Text
          id="logo_text"
          transition={MagicMove.Transition.morph}
          duration={200}
          style={{color: 'white', paddingLeft: 10}}>
          Sign Up
        </MagicMove.Text>
      </MagicMove.View>

      <Animatable.View style={{alignItems: 'center'}} animation={'zoomIn'} useNativeDriver={true} duration={500}>
        <Text>Email Verification</Text>
      </Animatable.View>
    </MagicMove.Scene>
  );
};

export const EmailVerificationScreen = connect<IProps, IHandlers, {}, IConfiguredStore>(
  () => ({}),
  {},
)(EmailVerificationScreenComponent);
