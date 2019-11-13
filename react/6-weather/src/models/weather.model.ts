export interface IWeatherItem {
    id: number;
    main: string;
    description: string;
    icon: string;
}

export interface IWeather {
    id: number;
    name: string;
    coord: {
        lat: number;
        lon: number;
    };
    main: {
        temp: number;
        pressure: number;
        humidity: number;
        temp_min: number;
        temp_max: number;
    };
    dt: number;
    wind: {
        speed: number;
        deg: number;
    };
    sys: {
        country: string;
    };
    rain: any;
    snow: any;
    clouds: {
        all: number;
    };
    weather: IWeatherItem[];
}

export interface IWeatherResponse {
    message: string;
    cod: string;
    count: number;
    list: IWeather[];
}
