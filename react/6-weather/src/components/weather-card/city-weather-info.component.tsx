import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';

import { IWeather } from "../../models/weather.model"
import { getCelsius, getFlagIcon, getWeatherIcon } from '../../services/utils/utils.service';

interface IProps {
    children: IWeather;
    onClick?: () => void;
}


const useStyles = makeStyles(() =>
    createStyles({
        root: {
            width: '100%',
            display: 'inline-flex',
            alignItems: 'center'
        },
        weatherIcon: {
            background: 'white',
            borderRadius: '50%',
            boxShadow: '0px 0px 3px #00000033',
            width: "50px",
            height: "50px"
        },
        body: {
            flexGrow: 1,
            paddingLeft: '10px'
        },
        name: {
            display: 'inline-flex',
            alignItems: 'center'
        },
        telemetry: {
            clear: 'both',
            display: 'inline-flex',
        },
        flag: {
            paddingLeft: '5px'
        },
        description: {
            paddingLeft: '5px'
        },
        nobr: {
            whiteSpace: 'nowrap'
        }
    })
);


const NoBrake = (props: { children: any }) => {
    const { children } = props;
    const classes = useStyles(props);
    return (<span className={classes.nobr}>{children}</span>);
}

export const CityWeatherInfo: React.FunctionComponent<IProps> = (props: IProps) => {

    const classes = useStyles(props);
    const { children: weather, onClick } = props;

    // create skeleton if not data
    if (!weather) {
        return (
            <div className={classes.root}>
                <Skeleton variant="circle" width={50} height={50}></Skeleton>
                <div className={classes.body}>
                    <div>
                        <div className={classes.name} style={{ width: 'calc(100% - 20px)' }}>
                            <Skeleton variant="rect" width="100%" height={24} />
                        </div>
                    </div>
                    <div>
                        <div className={classes.telemetry} style={{ width: 'calc(100% - 20px)' }}>
                            <Skeleton variant="rect" width="100%" height={40} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    const {
        main: { temp, temp_max, temp_min, pressure },
        clouds: { all: cloudsAll },
        wind: { speed },
        name,
        sys: { country },
        weather: [{ description, icon }]
    } = weather;

    return (
        <div className={classes.root} onClick={() => (onClick && onClick())}>
            <img className={classes.weatherIcon}
                src={getWeatherIcon(icon)}
            />
            <div className={classes.body}>
                <div>
                    <div className={classes.name}>
                        <Typography>{name}, {country}</Typography>
                        <img className={classes.flag} src={getFlagIcon(country)} />
                        <Typography className={classes.description} variant="caption">{description}</Typography>
                    </div>
                </div>
                <div>
                    <div className={classes.telemetry}>

                        <Typography component={'div'}>
                            <Chip color="primary" size="small" label={`${getCelsius(temp)} °С`}></Chip> temperature
                            <NoBrake> from {getCelsius(temp_min)} °С</NoBrake>
                            <NoBrake> to {getCelsius(temp_max)} °С,</NoBrake>
                            <NoBrake>wind {speed} m/s,</NoBrake>
                            <NoBrake>clouds {cloudsAll} %,</NoBrake>
                            <NoBrake>{pressure} hpa</NoBrake>
                        </Typography>
                    </div>
                </div>
            </div>

        </div>
    );
}