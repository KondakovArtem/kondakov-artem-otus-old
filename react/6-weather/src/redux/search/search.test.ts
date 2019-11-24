import { reducer, IStore, ActionTypes} from './search.ducks';
import { Action } from 'redux-actions';
import { createMock } from 'ts-auto-mock';
import { IWeather } from 'src/models/weather.model';



describe('reducers', () => {

    describe('search', () => {
        it('should set inputVaue', () => {
            const inputValue = "someValue";
            const storeMock = createMock<IStore>();
            expect(reducer(storeMock, { type: ActionTypes.SET_INPUTVALUE, payload: inputValue } as Action<string>).inputValue)
                .toEqual(inputValue)
        })
        it('should set loading', () => {
            const storeMock = createMock<IStore>();
            const loading = true;
            expect(reducer(storeMock, { type: ActionTypes.SET_LOADING, payload: loading } as Action<boolean>).loading).toEqual(loading);
        })
        it('should set options', () => {
            const storeMock = createMock<IStore>();
            const options = [createMock<IWeather>()];
            expect(reducer(storeMock, { type: ActionTypes.SET_OPTIONS, payload: options } as Action<IWeather[]>).options).toEqual([...options]);
        })
    })
})
