import { round } from 'lodash-es';

export function getCelsius(temp: number) {
    return round((temp - 273.15), 2)
}

export function getWeatherIcon(icon: string){
    return `http://openweathermap.org/img/wn/${icon}@2x.png`;
}

export function getFlagIcon(country: string){
    return `https://www.countryflags.io/${country}/shiny/24.png`;
}