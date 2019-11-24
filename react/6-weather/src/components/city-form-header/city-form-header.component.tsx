import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ArrowBack from '@material-ui/icons/ArrowBack';
import IconButton from '@material-ui/core/IconButton';
import Skeleton from '@material-ui/lab/Skeleton';

import { IForecast } from '../../models/weather.model';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        title: {
            paddingRight: theme.spacing(2)
        }
    })
);

export interface IProps {
    children: IForecast;
}

export interface IHandlers {
    onBackClick: () => void;
}


export const CityFormHeaderComponent: React.FunctionComponent<IProps & IHandlers> = (props: IProps & IHandlers) => {
    const classes = useStyles({});
    const { children: forecast, onBackClick } = props;

    if (!forecast){
        return (<Skeleton variant="rect" width={200} height={32} className={classes.title} />)
    }
    const { weather: {name, sys: {country}}} = forecast;

    return (
        <>
            <IconButton key="back" aria-label="back" color="inherit" onClick={onBackClick}>
                <ArrowBack />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
                {name}, {country}
            </Typography>
        </>
    );
}

