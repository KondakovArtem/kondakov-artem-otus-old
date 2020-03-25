import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        flex: {
            display: 'flex'
        },
        grow: {
            flexGrow: 1
        },
        title: {
            paddingRight: theme.spacing(2)
        }
    })
);

interface IProps {
    children?: any;
}

export const Header: React.FunctionComponent<IProps> = (props: IProps) => {
    const classes = useStyles({});
    const {children} = props;
    return (
        <AppBar position="static">
            <Toolbar className={classes.flex}>
                {children}
            </Toolbar>
        </AppBar>
    );
}

