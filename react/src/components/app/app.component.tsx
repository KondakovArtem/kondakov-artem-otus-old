import * as React from 'react';
import { hot } from "react-hot-loader/root";
import { TodoItem, ITodoItem } from '../todo-item/todo-item.component';

const styles = {
    root: {
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    },
    wrapper: {
        display: 'block'
    },
    header: {
        marginBottom: '10px'
    }
}


const App: React.FunctionComponent = () => {

    const [items, setItems] = React.useState<ITodoItem[]>([]);
    const [newTodo, setNewTodo] = React.useState("");

    function onRemoveItem(item: ITodoItem) {
        const newItems = [...items];
        newItems.splice(newItems.indexOf(item), 1);
        setItems(newItems);
    }

    function onAddItem() {
        if (newTodo !== ''){
            setItems([...items, { content: newTodo }]);
            setNewTodo('');
        }
    }

    const onChangeNewTodo = (e: React.ChangeEvent<HTMLInputElement>) => setNewTodo(e.target.value);

    return (
        <div style={styles.root}>
            <div style={styles.wrapper}>
                <h1>TODO LIST</h1>
                <div style={styles.header}>
                    <input value={newTodo} onChange={onChangeNewTodo}></input>
                    <button onClick={onAddItem}>+ Add</button>
                </div>
                <div>
                    {items.map((item: ITodoItem, idx) => {
                        return (
                            <TodoItem key={idx} item={item} onClose={onRemoveItem}></TodoItem>
                        )
                    })}
                </div>
            </div>
        </div>
    );
}

export default hot(App);