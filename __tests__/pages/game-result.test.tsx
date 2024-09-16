import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { mockNextUseSession } from '@/utils/mocks';
import GameResult from '@/pages/game/game-result';

jest.mock('next-auth/react');

describe('Game result test', () => {
    const useRouter = jest.spyOn(require("next/router"), "useRouter");
    const winData = { "players": [{ "username": "winner", "score": 6, "user_id": 5 }, { "username": "looser", "score": 2, "user_id": 5 }], "time": 71674 }
    const drawData = { "players": [{ "username": "defg", "score": 4, "user_id": 5 }, { "username": "abc", "score": 4, "user_id": 5 }], "time": 71674 }
    beforeAll(() => {
        mockNextUseSession({
            data: {
                session: {
                    expires: '',
                    user: {
                        email: '',
                        image: '',
                        name: '',
                    },
                },
            },
        });

    })

    afterEach(() => {
        useRouter.mockClear();
    });

    it('Draw case', async () => {
        useRouter.mockImplementation(() => {
            return {
                route: '/',
                pathname: 'game-result',
                query: { result: (JSON.stringify(drawData)) },
                asPath: ``,
            }
        })
        render(<GameResult></GameResult>)
        expect((await screen.findAllByText("Draw! Ready for rematch?")).length === 1);
        expect((screen.queryByText("Draw! Ready for rematch?"))).not.toBeNull();
        expect((screen.queryByText('The winner is winner'))).toBeNull();
    });

    it('Winner-looser case', async () => {
        useRouter.mockImplementation(() => {
            return {
                route: '/',
                pathname: 'game-result',
                query: { result: (JSON.stringify(winData)) },
                asPath: ``,
            }
        })
        render(<GameResult></GameResult>)
        expect((await screen.findAllByText("The winner is winner")).length === 1);
        expect((screen.queryByText("The winner is winner"))).not.toBeNull();
        expect((screen.queryByText('Draw! Ready for rematch?'))).toBeNull();
    });
});
