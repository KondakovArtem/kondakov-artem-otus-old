import React from "react";
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Container from "@material-ui/core/Container";

import { IWeather } from "../../models/weather.model";
import { CityWeatherCard } from "../weather-card/city-weather-card.component";

const useStyles = makeStyles(() => createStyles({
    card: {
        display: 'inline-block',
        margin: '10px',
        width: 'calc(100%/2 - 20px)'
    }
}));


export interface IProps {
    children: IWeather[];
    hiddenItems: IWeather[];
}

export interface IHandlers {
    onRemoveCityWeather: (cityWeather: IWeather) => void;
    onSelectCityWeather?: (cityWeather: IWeather) => void;
}

export const CityDashboardComponent: React.FunctionComponent<IProps & IHandlers> = (props: IProps & IHandlers) => {
    const { children, onRemoveCityWeather, onSelectCityWeather, hiddenItems } = props;
    const classes = useStyles({});

    return (
        <Container maxWidth="md">
            {children.map((cityWeather) => (
                <CityWeatherCard key={cityWeather.id}
                    className={classes.card}
                    onClose={onRemoveCityWeather}
                    onClick={onSelectCityWeather}
                    show={!hiddenItems.includes(cityWeather)}
                >{cityWeather}</CityWeatherCard>
            ))}
        </Container>
    );
}