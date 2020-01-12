import React, {FunctionComponent, useState} from 'react';
import {NavigationStackOptions} from 'react-navigation-stack';
import {ScrollView, StyleSheet, View} from 'react-native';
import {connect} from 'react-redux';
import {TextInput, Button} from 'react-native-paper';

//@ts-ignore;
import {Scene as MagicScene, Text as MagicText, Transition} from 'react-native-magic-move';

import {HeaderBarComponent} from '../../components/header-bar/header-bar.component';
import {IConfiguredStore} from '../../redux/store';
import {commonStyles, COMMON_DURATION} from '../../services/style/style.service';
import {IGuestMeta} from '../../model/guest.model';
import {Actions as commonActions} from '../../redux/common/common.ducks';
import {Actions as guestsActions} from '../../redux/guests/guests.ducks';
import {NavAliases} from '../../model/navigation.model';

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

export const GuestDetailScreenComponent: FunctionComponent<IProps & IHandlers> = props => {
  const {editGuest = {}, cancel, setDetails, save} = props;
  const {name, uid, details} = editGuest as IGuestMeta;
  const [magicUid] = useState(`mt_${uid}`);

  return (
    <MagicScene>
      <HeaderBarComponent
        titleComponent={() => (
          <MagicText
            style={commonStyles.appBarTitle}
            id={magicUid}
            transition={Transition.morph}
            duration={COMMON_DURATION}>
            {name}
          </MagicText>
        )}
      />
      <ScrollView style={styles.scroll}>
        <TextInput
          value={details}
          onChange={e => setDetails(e.nativeEvent.text)}
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

(GuestDetailScreen as any).navigationOptions = {
  header: null,
} as NavigationStackOptions;
