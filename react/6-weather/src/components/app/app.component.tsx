import React from 'react';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import { hot } from "react-hot-loader/root";
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import {makeStyles, Theme, createStyles } from '@material-ui/core/styles';

import { theme } from '../../services/theme/theme.service';
import { Header } from '../header/header.component';
import { IWeather } from '../../models/weather.model';
import { CityWeatherCard } from '../weather-card/city-weather-card.component';
import { MessageComponent } from '../message/message.component';
import { IMessage } from '../../models/message.model';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        card: {
            display: 'inline-block',
            margin: '10px',
            maxWidth: 'calc(100%/2 - 20px)'
        }
    })
);

export interface IProps {
    cityWeathers: IWeather[];
    hiddenItems: IWeather[];
    messages: IMessage[];
    onAddCityWeather: (newCityWeathers: IWeather) => void;
    onRemoveCityWeather: (cityWeather: IWeather) => void;
    onCloseMessage: (id: string) => void;
}


const AppComponent: React.FunctionComponent<IProps> = (props: IProps) => {
    const classes = useStyles({});
    return (
        <>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Header onSelectCity={props.onAddCityWeather}></Header>
                <Container maxWidth="md">
                    {
                        props.cityWeathers.map((cityWeather) => (
                            <CityWeatherCard
                                key={cityWeather.id}
                                className={classes.card}
                                data={cityWeather}
                                onClose={props.onRemoveCityWeather}
                                show={!props.hiddenItems.includes(cityWeather)}
                            ></CityWeatherCard>
                        ))
                    }
                </Container>
                {props.messages.map(message => (
                    <MessageComponent 
                        key={message.id} 
                        {...message}
                        onCloseMessage={props.onCloseMessage} 
                    />
                ))}
            </ThemeProvider>
        </>
    );
}

export default hot(AppComponent);
