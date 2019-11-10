import React from 'react';
import { FunctionComponent } from "react"
import Snackbar from "@material-ui/core/Snackbar"

import { MessageContent } from "./message-content.component"
import { variantIcon } from '../../models/message.model';


interface IProps {
    onCloseMessage: (id: string) => void;
    variant: keyof typeof variantIcon;
    text: string;
    id: string;
}

export const MessageComponent: FunctionComponent<IProps> = (props: IProps) => {
    
    function onCloseMessage(){
        props.onCloseMessage(props.id);
    }
    
    
    return (
        <Snackbar
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={true}
            onClose={onCloseMessage}
        >
            <MessageContent
                onClose={onCloseMessage}
                variant={props.variant}
            >
                {props.text}
            </MessageContent>
        </Snackbar>
    )
};
