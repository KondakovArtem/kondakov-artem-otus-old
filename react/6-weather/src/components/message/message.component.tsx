import React from 'react';
import { FunctionComponent } from "react";
import Snackbar from "@material-ui/core/Snackbar"

import { MessageContent } from "./message-content.component"
import { IMessage } from '../../models/message.model';
interface IProps {
    onCloseMessage: (message: IMessage) => void;
    messages: IMessage[];
}

export const MessageComponent: FunctionComponent<IProps> = (props: IProps) => {
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
