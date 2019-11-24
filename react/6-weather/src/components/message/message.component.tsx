import React from 'react';
import { FunctionComponent } from "react";
import Snackbar from "@material-ui/core/Snackbar"

import { MessageContent } from "./message-content.component"
import { IMessage } from '../../models/message.model';

export interface IProps {
    messages: IMessage[];
}

export interface IHandlers {
    onCloseMessage: (message: IMessage) => void;
}


export const MessageComponent: FunctionComponent<IProps & IHandlers> = (props: IProps & IHandlers) => {
    const { onCloseMessage, messages } = props;
    return (
        <>
            {messages.map(message => {
                const { id, variant, text } = message;
                const onClose = () => onCloseMessage(message);
                return (
                    <Snackbar
                        key={id}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={true}
                        onClose={onClose}
                    >
                        <MessageContent
                            onClose={onClose}
                            variant={variant}
                        >{text}</MessageContent>
                    </Snackbar>
                )
            })}
        </>
    )
};
