import React from 'react';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import { hot } from "react-hot-loader/root";
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import { makeStyles, createStyles } from '@material-ui/core/styles';

import { theme } from '../../services/theme/theme.service';
import { Header } from '../header/header.component';
import { IWeather } from '../../models/weather.model';
import { CityWeatherCard } from '../weather-card/city-weather-card.component';
import { MessageComponent } from '../message/message.component';
import { IMessage } from '../../models/message.model';

const useStyles = makeStyles(() => createStyles({
    card: {
        display: 'inline-block',
        margin: '10px',
        maxWidth: 'calc(100%/2 - 20px)'
    }
}));

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
    const {
        onRemoveCityWeather,
        hiddenItems,
        messages,
        onCloseMessage,
        onAddCityWeather,
        cityWeathers
    } = props;

    return (
        <>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Header onSelectCity={onAddCityWeather} />
                <Container maxWidth="md">
                    {cityWeathers.map((cityWeather) => (
                        <CityWeatherCard key={cityWeather.id}
                            className={classes.card}
                            onClose={onRemoveCityWeather}
                            show={!hiddenItems.includes(cityWeather)}
                        >{cityWeather}</CityWeatherCard>
                    ))}
                </Container>
                {messages.map(message => (
                    <MessageComponent
                        key={message.id} {...message}
                        onCloseMessage={onCloseMessage}
                    />
                ))}
            </ThemeProvider>
        </>
    );
}

export default hot(AppComponent);
