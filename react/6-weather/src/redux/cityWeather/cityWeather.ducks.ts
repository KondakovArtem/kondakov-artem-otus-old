import { createReducer, createAction, Action } from 'typesafe-actions';
import { IWeather } from '../../models/weather.model';
import { Actions as messageActions } from '../message/message.ducks';
import { Dispatch } from 'redux';
import { GetStore, IConfiguredStore, SimpleThunkAction } from '../store';
import api from '../../services/api/api.service';
import ActionTypes from './action.types';


export type IStore = {
    items: IWeather[];
    hiddenItems: IWeather[];
}


const initialState: IStore = {
    items: [],
    hiddenItems: []
};

const STORAGE_KEY = 'cityIds';
const updateLocalStorage = (store: IConfiguredStore) => {
    const { cityWeather: { items } } = store;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items.map(cityWeather => cityWeather.id)))
}
const getLocalStorage = () => {
    return JSON.parse(window.localStorage.getItem(STORAGE_KEY));
}


const add = createAction(ActionTypes.ADD, cityWeather => cityWeather)<IWeather>();
const remove = createAction(ActionTypes.REMOVE, cityWeather => cityWeather)<IWeather>();
const hide = createAction(ActionTypes.HIDE, cityWeather => cityWeather)<IWeather>();
const init = createAction(ActionTypes.INIT, cityWeathers => cityWeathers)<IWeather[]>();

export const Actions = {
    add: (cityWeather: IWeather): SimpleThunkAction => {
        return (dispatch: Dispatch, getStore: GetStore) => {
            dispatch(add(cityWeather));
            updateLocalStorage(getStore());
        }
    },
    remove: (cityWeather: IWeather) => {
        return (dispatch: Dispatch, getStore: GetStore) => {
            dispatch(hide(cityWeather));
            setTimeout(() => {
                dispatch(remove(cityWeather));
                dispatch(messageActions.showSuccess(`${cityWeather.name} city has been successfully removed`));
                updateLocalStorage(getStore());
            }, 250)
        }
    },
    init: () => async (dispatch: Dispatch) => {
        const cityIds = getLocalStorage();
        if (cityIds && cityIds.length) {
            (async () => {
                const data = await api.getCityWeatherByIds(cityIds);
                dispatch(init(data.list || []));
            })()
        }
    }
}


export const reducer = createReducer<IStore, Action>(initialState)
    .handleAction(add, (state, action) => {
        const { payload: cityWeather } = action;
        return {
            ...state,
            items: [...state.items, cityWeather]
        }
    })
    .handleAction(remove, (state, action) => {
        const { payload: cityWeather } = action;
        const { hiddenItems, items } = state;
        return {
            ...state,
            items: items.filter(item => item !== cityWeather),
            hiddenItems: hiddenItems.filter(item => item !== cityWeather)
        }
    })
    .handleAction(hide, (state, action) => {
        const { payload: cityWeather } = action;
        return {
            ...state,
            hiddenItems: [...state.hiddenItems, cityWeather]
        }
    })
    .handleAction(init, (state, action) => {
        const { payload: cityWeathers } = action;
        return {
            ...state,
            items: [...cityWeathers]
        }
    })
