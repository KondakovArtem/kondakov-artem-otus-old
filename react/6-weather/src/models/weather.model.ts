
export type IWeatherItem = {
    id: number;
    main: string;
    description: string;
    icon: string;
}


export type IWeatherProps = {
    dt: number;
    main: {
        temp: number;
        temp_min: number;
        temp_max: number;
        pressure: number;
        sea_level: number;
        grnd_level: number;
        humidity: number;
        temp_kf: number;
    };
    weather: IWeatherItem[];
    clouds: {
        all: number;
    };
    wind: {
        speed: number;
        deg: number;
    };
    sys: {
        country?: string;
        pod?: string;
    };
    rain?: {
        "3h": number;
    };
    snow?: {
        "3h": number;
    };
}

export type ICity = {
    id: number;
    name: string;
    coord: {
        lat: number;
        lon: number;
    };
    country: string;
    timezone: number;
    sunrise: number;
    sunset: number;
}


export type IWeather = IWeatherProps & {
    id: number;
    name: string;
    coord: {
        lat: number;
        lon: number;
    };
}


export type IWeatherResponse = {
    message: string;
    cod: string;
    count: number;
    list: IWeather[];
}


export type ITempChartItem = {
    date: string;
    temp: number;
}

export type IForecastResponse = {
    message: string;
    cod: string;
    cnt: number;
    city: ICity;
    list: IWeatherProps[];
}

export type IForecast = {
    weather: IWeather;
    tempChart?: ITempChartItem[];
}