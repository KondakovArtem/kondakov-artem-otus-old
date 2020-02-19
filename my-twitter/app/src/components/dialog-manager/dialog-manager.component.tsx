import React, {FC} from 'react';
import {Overlay, Button} from 'react-native-elements';
import {Text, View, StyleSheet} from 'react-native';

import {IModalDialog, IDialogButtonAction} from 'models/dialog.model';

export interface IProps {
  children?: IModalDialog;
}

export interface IHandlers {
  onBackdropPress?(dialog: IModalDialog): void;
  onClose(dialog: IModalDialog): void;
  onPressButton(buttonAction: IDialogButtonAction): void;
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  title: {fontSize: 20, paddingBottom: 30},
  buttonContainer: {flexDirection: 'row', justifyContent: 'space-between'},
});

export const DialogManagerComponent: FC<IProps & IHandlers> = ({children, onClose, onPressButton}) => {
  if (!children) {
    return <></>;
  }
  const {buttons, title, uid} = children;

  const onRequestClose = () => onClose(children);
  const onBackdropPress = () => onClose(children);
  const pressButton = (key: string) => {
    onPressButton && onPressButton({key, dialog: children});
  };

  return (
    <>
      {children && (
        <Overlay
          key={uid}
          isVisible={true}
          onBackdropPress={onBackdropPress}
          onRequestClose={onRequestClose}
          animationType="slide"
          width="auto"
          height="auto">
          <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.buttonContainer}>
              {buttons.map(button => {
                return <Button {...button} onPress={() => pressButton(button.key)} />;
              })}
            </View>
          </View>
        </Overlay>
      )}
    </>
  );
};
