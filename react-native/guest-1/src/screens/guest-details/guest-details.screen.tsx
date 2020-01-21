import React, {useState, FC} from 'react';
import {ScrollView, StyleSheet, View, NativeSyntheticEvent, TextInputChangeEventData} from 'react-native';
import {connect} from 'react-redux';
import {TextInput, Button} from 'react-native-paper';
//@ts-ignore;
import {Scene as MagicScene, Text as MagicText, View as MagicView, Transition} from 'react-native-magic-move';

import {HeaderBarComponent} from '@app/components/header-bar/header-bar.component';
import {IConfiguredStore} from '@app/redux/store';
import {commonStyles, COMMON_DURATION} from '@app/services/style/style.service';
import {IGuestMeta} from '@app/model/guest.model';
import {Actions as commonActions} from '@app/redux/common/common.ducks';
import {Actions as guestsActions} from '@app/redux/guests/guests.ducks';
import {NavAliases} from '@app/model/navigation.model';

interface IProps {
  editGuest: IGuestMeta;
}

interface IHandlers {
  cancel: () => void;
  save: () => void;
  setDetails: (details: string) => void;
}

const styles = StyleSheet.create({
  details: {},
  scroll: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
  buttonGroup: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
});

export const GuestDetailScreenComponent: FC<IProps & IHandlers> = props => {
  const {editGuest = {}, cancel, setDetails, save} = props;
  const {name, uid, details} = editGuest as IGuestMeta;
  const [magicUid] = useState(`mt_${uid}`);
  const [magicUid2] = useState(`mv_${uid}`);

  const TitleComponent = () => (
    <MagicView id={magicUid2} transition={Transition.morph} duration={COMMON_DURATION}>
      <MagicText
        style={commonStyles.appBarTitle}
        id={magicUid}
        transition={Transition.morph}
        duration={COMMON_DURATION}>
        {name}
      </MagicText>
    </MagicView>
  );

  function onChange(e: NativeSyntheticEvent<TextInputChangeEventData>) {
    setDetails(e.nativeEvent.text);
  }

  return (
    <MagicScene>
      <HeaderBarComponent titleComponent={TitleComponent} />
      <ScrollView style={styles.scroll}>
        <TextInput
          value={details}
          onChange={onChange}
          mode={'outlined'}
          numberOfLines={10}
          label={'Details'}
          multiline={true}
          style={styles.details}
        />
        <View style={styles.buttonGroup}>
          <Button mode={'contained'} onPress={save}>
            Save
          </Button>
          <Button mode={'text'} onPress={cancel}>
            Cancel
          </Button>
        </View>
      </ScrollView>
    </MagicScene>
  );
};

export const GuestDetailScreen = connect<IProps, IHandlers, {}, IConfiguredStore>(
  ({guests}) => {
    const {editGuest} = guests;
    return {editGuest: editGuest as IGuestMeta};
  },
  {
    save: guestsActions.updateGuest,
    cancel: () => commonActions.navigate(NavAliases.MAIN_SCREEN),
    setDetails: guestsActions.setEditDetails,
  },
)(GuestDetailScreenComponent);
