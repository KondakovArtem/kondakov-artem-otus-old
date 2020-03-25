import { connect } from 'react-redux';

import { IConfiguredStore } from '../../redux/store';
import { MessageComponent, IProps as IComponentProps, IHandlers as IComponentHandlers } from '../../components/message/message.component';
import { Actions as messageActions } from '../../redux/message/message.ducks';



export const MessageContainer = connect<IComponentProps, IComponentHandlers>(
    function mapStateToProps({messages}: IConfiguredStore): IComponentProps {
        return { messages }
    },
    {
        onCloseMessage: messageActions.remove
    }
)(MessageComponent);

