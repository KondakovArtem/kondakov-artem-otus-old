import { Action } from 'redux-actions';
import { createMock } from 'ts-auto-mock';

import { reducer, IStore, Actions } from './cityWeather.ducks';
import ActionsTypes from './action.types';
import { IWeather, IWeatherResponse } from '../../models/weather.model';
import { IConfiguredStore } from '../store';
import api from '../../services/api/api.service';


describe('reducers', () => {

    describe('cityWeather', () => {
        it('should add cityWeather item', () => {
            const storeMock = createMock<IStore>();
            const cityWeather: IWeather = createMock<IWeather>();
            expect(reducer(storeMock, { type: ActionsTypes.ADD, payload: cityWeather } as Action<IWeather>))
                .toEqual({ hiddenItems: [], items: [cityWeather] } as IStore);
        })
        it('should remove cityWeather from items and hiddenItems', () => {
            const cityWeather: IWeather = createMock<IWeather>();
            const storeMock = createMock<IStore>();

            storeMock.items.push(cityWeather);
            storeMock.hiddenItems.push(cityWeather);
            expect(reducer(storeMock, { type: ActionsTypes.REMOVE, payload: cityWeather } as Action<IWeather>))
                .toEqual({ hiddenItems: [], items: [] } as IStore);
        })
        it('should fill items', () => {
            const cityWeather: IWeather = createMock<IWeather>();
            const storeMock = createMock<IStore>();
            expect(reducer(storeMock, { type: ActionsTypes.INIT, payload: [cityWeather] } as Action<IWeather[]>))
                .toEqual({ hiddenItems: [], items: [cityWeather] } as IStore);
        })
    })

    describe('hiddenItems', () => {
        it('should add hiddenItem', () => {
            const store: IStore = createMock<IStore>();
            const cityWeather: IWeather = createMock<IWeather>();
            expect(reducer(store, { type: ActionsTypes.HIDE, payload: cityWeather } as Action<IWeather>))
                .toEqual({ hiddenItems: [cityWeather], items: [] } as IStore);
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
            expect(dispatch).toBeCalledWith({ type: ActionsTypes.ADD, payload: cityWeather });
        });

        it("handles action remove a cityWeather from store", (callback) => {
            const MockStore: IConfiguredStore = createMock<IConfiguredStore>();
            const dispatch = jest.fn();
            const getStore = () => MockStore;

            Actions.remove(cityWeather)(dispatch, getStore);
            setTimeout(() => {
                expect(dispatch).toBeCalledWith({ type: ActionsTypes.HIDE, payload: cityWeather });
                expect(dispatch).toBeCalledWith({ type: ActionsTypes.REMOVE, payload: cityWeather });
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
                expect(dispatch).toBeCalledWith({ type: ActionsTypes.INIT, payload: [item] });
                callback();
            }
            test();
        });

    })

})