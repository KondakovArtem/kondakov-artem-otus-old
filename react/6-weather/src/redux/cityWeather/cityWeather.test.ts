import { Action } from 'redux-actions';
import { createMock } from 'ts-auto-mock';

import { reducer, IStore, Actions, ActionTypes } from './cityWeather.ducks';
import { IWeather, IWeatherResponse, IForecast, IForecastResponse, IWeatherProps } from '../../models/weather.model';
import { IConfiguredStore } from '../store';
import api from '../../services/api/api.service';


describe('reducers', () => {

    describe('cityWeather', () => {
        it('should add cityWeather item', () => {
            const storeMock = createMock<IStore>();
            const cityWeather: IWeather = createMock<IWeather>();
            expect(reducer(storeMock, { type: ActionTypes.ADD, payload: cityWeather } as Action<IWeather>))
                .toEqual({ hiddenItems: [], items: [cityWeather], forecast: storeMock.forecast } as IStore);
        })
        it('should remove cityWeather from items and hiddenItems', () => {
            const cityWeather: IWeather = createMock<IWeather>();
            const storeMock = createMock<IStore>();

            storeMock.items.push(cityWeather);
            storeMock.hiddenItems.push(cityWeather);
            expect(reducer(storeMock, { type: ActionTypes.REMOVE, payload: cityWeather } as Action<IWeather>))
                .toEqual({ hiddenItems: [], items: [], forecast: storeMock.forecast } as IStore);
        })
        it('should fill items', () => {
            const cityWeather: IWeather = createMock<IWeather>();
            const storeMock = createMock<IStore>();
            expect(reducer(storeMock, { type: ActionTypes.INIT, payload: [cityWeather] } as Action<IWeather[]>))
                .toEqual({ hiddenItems: [], items: [cityWeather], forecast: storeMock.forecast } as IStore);
        })
    })

    describe('hiddenItems', () => {
        it('should add hiddenItem', () => {
            const storeMock: IStore = createMock<IStore>();
            const cityWeather: IWeather = createMock<IWeather>();
            expect(reducer(storeMock, { type: ActionTypes.HIDE, payload: cityWeather } as Action<IWeather>))
                .toEqual({ hiddenItems: [cityWeather], items: [], forecast: storeMock.forecast } as IStore);
        })
    })

    describe('forecast', () => {
        it('should set forecast data', () => {
            const storeMock: IStore = createMock<IStore>();
            const forecast: IForecast = createMock<IForecast>();
            expect(reducer(storeMock, { type: ActionTypes.SET_FORECAST, payload: forecast } as Action<IForecast>))
                .toEqual({ hiddenItems: [], items: [], forecast: forecast } as IStore);
        })

        it('should clear forecast data', () => {
            const storeMock: IStore = createMock<IStore>();
            expect(reducer(storeMock, { type: ActionTypes.SET_FORECAST, payload: null } as Action<IForecast>))
                .toEqual({ hiddenItems: [], items: [], forecast: null } as IStore);
        })
    })

})


describe('action', () => {

    const cityWeather: IWeather = createMock<IWeather>();

    describe('cityWeather', () => {
        it("handles action add a cityWeather to store", () => {
            const MockStore: IConfiguredStore = createMock<IConfiguredStore>();
            const dispatch = jest.fn();
            const getStore = () => MockStore;

            Actions.add(cityWeather)(dispatch, getStore, null);
            expect(dispatch).toBeCalledWith({ type: ActionTypes.ADD, payload: cityWeather });
        });

        it("handles action remove a cityWeather from store", (callback) => {
            const MockStore: IConfiguredStore = createMock<IConfiguredStore>();
            const dispatch = jest.fn();
            const getStore = () => MockStore;

            Actions.remove(cityWeather)(dispatch, getStore);
            setTimeout(() => {
                expect(dispatch).toBeCalledWith({ type: ActionTypes.HIDE, payload: cityWeather });
                expect(dispatch).toBeCalledWith({ type: ActionTypes.REMOVE, payload: cityWeather });
                callback();
            }, 300)
        });

        it("handles action init a cityWeather to store", (callback) => {
            const dispatch = jest.fn();

            Object.defineProperty(window, 'localStorage', {
                value: (function () {
                    return {
                        getItem: function () {
                            return '[12345]'
                        }
                    }
                })(),
            });

            const item: IWeather = createMock<IWeather>();
            api.getCityWeatherByIds = jest.fn((): Promise<IWeatherResponse> => {
                const response: IWeatherResponse = createMock<IWeatherResponse>();
                
                response.list.push(item);
                return Promise.resolve(response);
            })

            async function test() {
                await Actions.init()(dispatch);
                expect(dispatch).toBeCalledWith({ type: ActionTypes.INIT, payload: [item] });
                callback();
            }
            test();
        });


        it("handles action set forecast by id", (callback) => {
            const dispatch = jest.fn();

            const item: IWeather = createMock<IWeather>();
            api.getCityWeatherByIds = jest.fn((): Promise<IWeatherResponse> => {
                const response: IWeatherResponse = createMock<IWeatherResponse>();
                response.list.push(item);
                return Promise.resolve(response);
            })
            const forecastItem: IWeatherProps = createMock<IWeatherProps>();
            forecastItem.dt = 1574629200;
            forecastItem.main.temp = 276.36;

            api.getForecastById = jest.fn((): Promise<IForecastResponse> => {
                const response: IForecastResponse = createMock<IForecastResponse>();
                response.list.push(forecastItem);
                return Promise.resolve(response);
            })

            async function test() {
                await Actions.getForecast(1000)(dispatch);
                expect(dispatch.mock.calls).toEqual([
                    [{ type: ActionTypes.SET_FORECAST, payload: null}],
                    [{ type: ActionTypes.SET_FORECAST, payload: {
                        weather: item,
                        tempChart: [{
                            date: '25.11 00:00',
                            temp: 3.21
                        }]
                    } as IForecast }]
                ]);
                callback();
            }
            test();
        });

    })

})