import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import { CitySearchContainer } from '../../containers/search/city-search.container';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        grow: {
            flexGrow: 1
        },
        title: {
            paddingRight: theme.spacing(2)
        }
    })
);

export const CityDashboardHeader: React.FunctionComponent = () => {
    const classes = useStyles({});
    return (
        <>
            <Typography variant="h6" className={classes.title}>
                City Weather
            </Typography>
            <CitySearchContainer className={classes.grow} />
        </>
    );
}

