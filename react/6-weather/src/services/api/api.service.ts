import { IWeatherResponse } from "../../models/weather.model";

function queryParams(params) {
    return Object.keys(params)
        .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
        .join('&');
}

const COMMON_OPTIONS: RequestInit = {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, cors, *same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
        'Content-Type': 'application/json',
    },
    redirect: 'follow', // manual, *follow, error
    referrer: 'no-referrer', // no-referrer, *client
}


export async function findCityWeatherByName(q: string){
    const response = await fetch(`/api/city/find?${queryParams({q})}`, COMMON_OPTIONS);
    const data: IWeatherResponse = await response.json();
    return data;
}


export async function getCityWeatherByIds(ids: number[]) {
    const response = await fetch(`/api/city/group?${queryParams({id: ids})}`, COMMON_OPTIONS);
    const data: IWeatherResponse = await response.json();
    return data;
}