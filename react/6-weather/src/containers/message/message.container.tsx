import { connect } from 'react-redux';

import { IConfiguredStore } from '../../redux/store';
import { IMessage } from '../../models/message.model';
import { MessageComponent } from '../../components/message/message.component';
import { Actions as messageActions } from '../../redux/message/message.ducks';


interface IProps {
    messages: IMessage[];
}

interface IHandlers {
    onCloseMessage: (message: IMessage) => void;
}

export const MessageContainer = connect<IProps, IHandlers>(
    function mapStateToProps({messages}: IConfiguredStore): IProps {
        return { messages }
    },
    {
        onCloseMessage: messageActions.remove
    }
)(MessageComponent);

