import * as React from 'react';
import { checkPropTypes } from "prop-types"


export interface ITodoItem {
    content?: string;
}

type Props = {
    onClose: (item: ITodoItem) => void,
    item: ITodoItem;
}

const styles = {
    root: {
        display: 'flex',
        border: '1px solid grey'
    },
    content: {
        flexGrow: 1
    }

} 

export const TodoItem: React.FunctionComponent<Props> = (props: Props) => {
    
    function onClose(){
        props.onClose(props.item);
    }

    return (
        <div style={styles.root}>
            <div style={styles.content}>{props.item.content}</div>
            <button onClick={onClose} title="remove">X</button>
        </div>
    )
}

