import React from 'react';
import { fade, makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import { IWeather } from '../../models/weather.model';
import { CitySearchContainer } from '../../containers/search/city-search.container';

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
    onSelectCity?: (data: IWeather) => void;
}

export const Header: React.FunctionComponent<IProps> = (props: IProps) => {
    const classes = useStyles(props);
    const {onSelectCity} = props;

    return (
        <AppBar  position="static">
            <Toolbar className={classes.flex}>
                <Typography variant="h6" className={classes.title}>
                    City Weather
                </Typography>
                <CitySearchContainer 
                    className={classes.grow} 
                    onSelect={onSelectCity} 
                    placeholder={'Search city...'}
                />
            </Toolbar>
        </AppBar>
    );
}

