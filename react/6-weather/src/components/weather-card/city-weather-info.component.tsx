import React from 'react';
import { IWeather } from "../../models/weather.model"
import { makeStyles, createStyles, Theme } from '@material-ui/core';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import {round} from 'lodash-es';

interface IProps {
    data: IWeather
}


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            display: 'inline-flex',
            alignItems: 'center'
        },
        weatherIcon: {
            background: 'white',
            borderRadius: '50%',
            boxShadow: '0px 0px 3px #00000033'
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


const NoBrake = (props: {children: any}) =>{
    const classes = useStyles(props);
    return (<span className={classes.nobr}>{props.children}</span>);
}

export const CityWeatherInfo: React.FunctionComponent<IProps> = (props: IProps) => {
    
    const classes = useStyles(props);
    
    function getCelsius(temp: number){
        return round((temp - 273.15),2)
    }

    
    return (
        <div className={classes.root}>
            <img className={classes.weatherIcon} 
                src={`http://openweathermap.org/img/wn/${props.data.weather[0].icon}@2x.png`} width="50" height="50" 
            />
            <div className={classes.body}>
                <div>
                    <div className={classes.name}>
                        <Typography>{props.data.name}, {props.data.sys.country}</Typography>
                        <img className={classes.flag} src={`https://www.countryflags.io/${props.data.sys.country}/shiny/24.png`} />
                        <Typography className={classes.description} variant="caption">{props.data.weather[0].description}</Typography>
                    </div>
                </div>
                <div>
                    <div className={classes.telemetry}>
                        
                        <Typography component={'div'}> 
                            <Chip color="primary" size="small" label={`${getCelsius(props.data.main.temp)} °С`}></Chip> temperature 
                            <NoBrake> from {getCelsius(props.data.main.temp_max)} °С</NoBrake>
                            <NoBrake> to {getCelsius(props.data.main.temp_max)} °С,</NoBrake>
                            <NoBrake>wind {props.data.wind.speed} m/s,</NoBrake>
                            <NoBrake>clouds {props.data.clouds.all} %,</NoBrake>
                            <NoBrake>{props.data.main.pressure} hpa</NoBrake>
                        </Typography>
                    </div>
                </div>
            </div>
            
        </div>
    );
}