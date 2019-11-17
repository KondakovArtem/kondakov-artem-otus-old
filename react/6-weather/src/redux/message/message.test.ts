import { Action } from 'redux-actions';
import { createMock } from 'ts-auto-mock';

import { reducer, IStore, Actions } from './message.ducks';
import { IMessage } from '../../models/message.model';
import ActionsTypes from './action.types';

jest.mock('lodash-es', () => {
    return {
        uniqueId: jest.fn(() => 'uid')
    };
});

describe('reducers', () => {
    describe('message', () => {
        it('should add message', () => {
            const message: IMessage = createMock<IMessage>();
            const storeMock = createMock<IStore>();
            expect(reducer(storeMock, { type: ActionsTypes.ADD, payload: message } as Action<IMessage>))
                .toEqual([message])
        })
        it('should remove message', () => {
            const message: IMessage = createMock<IMessage>();
            const storeMock = createMock<IStore>();
            storeMock.push(message);
            expect(reducer(storeMock, { type: ActionsTypes.REMOVE, payload: message } as Action<IMessage>)).toHaveLength(0);
        })
    })
})



describe('actions', () => {
    describe('message', () => {
        it('should Actions.showSuccess return payload with success message', () => {
            const text = 'success message';
            expect(Actions.showSuccess(text))
                .toEqual({
                    type: Actions.add.toString(),
                    payload: {
                        text,
                        id: 'uid',
                        variant: 'success'
                    } as IMessage
                })
        })
        it('should Actions.showWarn return payload with warning message', () => {
            const text = 'warning message';
            expect(Actions.showWarn(text))
                .toEqual({
                    type: Actions.add.toString(),
                    payload: {
                        id: 'uid',
                        text,
                        variant: 'warning'
                    } as IMessage
                })
        })
        it('should Actions.showError return payload with error message', () => {
            const text = 'error message';
            expect(Actions.showError(text))
                .toEqual({
                    type: Actions.add.toString(),
                    payload: {
                        id: 'uid',
                        text,
                        variant: 'error'
                    } as IMessage
                })
        })
        it('should Actions.add return payload with new message', () => {
            const text = 'new message';
            expect(Actions.add({
                text,
                variant: 'info'
            }))
                .toEqual({
                    type: Actions.add.toString(),
                    payload: {
                        id: 'uid',
                        text,
                        variant: 'info'
                    } as IMessage
                })
        })
        it('should Actions.remove return payload with removed message', () => {
            const text = 'remove message';
            const message: IMessage = {
                text,
                variant: 'info',
                id: 'uid'
            }
            expect(Actions.remove(message))
                .toEqual({
                    type: Actions.remove.toString(),
                    payload: message
                })
        })

    })
})