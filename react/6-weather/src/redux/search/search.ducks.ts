//import { createActions, handleActions } from 'redux-actions';
import { createReducer, createAction, Action } from 'typesafe-actions';
import { debounce } from 'lodash-es';
import { Dispatch } from 'redux';

import { IWeather } from '../../models/weather.model';
import { findCityWeatherByName } from '../../services/api/api.service';
import { Actions as messageActions} from '../message/message.ducks';
import { Actions as cityWeatherActions} from '../cityWeather/cityWeather.ducks';
import { GetStore, SimpleThunkDispatch } from '../store';

export const ActionTypes = {
    SET_INPUTVALUE: '@search/SET_INPUTVALUE',
    SET_OPTIONS: '@search/SET_OPTIONS',
    SET_LOADING: '@search/SET_LOADING'
}

export interface IStore {
    inputValue: string;
    options: IWeather[];
    loading: boolean;
}

const initialState: IStore = {
    inputValue: '',
    options: [],
    loading: false
};

const setInputValue = createAction(ActionTypes.SET_INPUTVALUE, search => search)<string>();
const setOptions = createAction(ActionTypes.SET_OPTIONS, options => options)<IWeather[]>();
const setLoading = createAction(ActionTypes.SET_LOADING, loading => loading)<boolean>();

const fetchDelay = debounce(async (query, dispatch: Dispatch) => {
    dispatch(setLoading(true));
    try {
        const data = await findCityWeatherByName(query);
        dispatch(setOptions(data.list));
    } catch (e) {
        console.error(e)
    }
    dispatch(setLoading(false));
}, 500);


export const Actions = {
    setInputValue: (value: string) => {
        return (dispatch: Dispatch) => {
            dispatch(setInputValue(value));
            dispatch(setOptions([]));
            fetchDelay.cancel();
            if (value && value !== '') {
                fetchDelay(value, dispatch);
            }
        }
    },
    onSelect: (data: IWeather) => {
        return (dispatch: SimpleThunkDispatch, getStore: GetStore) => {
            const {cityWeather: {items}} = getStore();
            const existCityWeather = items.find((cityWeather) => cityWeather.id === data.id);
            if (existCityWeather) {
                dispatch(messageActions.showWarn('The selected city has already been added.'));
                return;
            }
            dispatch(cityWeatherActions.add(data));
        }
    }
};

export const reducer = createReducer<IStore, Action>(initialState)
    .handleAction(setInputValue, (state, { payload: inputValue }) => { return { ...state, inputValue } })
    .handleAction(setOptions, (state, { payload: options }) => { return { ...state, options } })
    .handleAction(setLoading, (state, { payload: loading }) => { return { ...state, loading } })