import * as React from 'react';
import { findAllByText, render, screen } from '@testing-library/react';
import { useSession } from "next-auth/react";
import PhraseList from '../../components/game/newExpression/phraseList';
import { mockNextUseRouter, mockNextUseSession } from '../../utils/mocks';
import userEvent from '@testing-library/user-event';
import { createContext, useState } from 'react';
import { learningContextType, phraseType } from '../../types/types';
import {underTopicPhraseContextRender} from "../../utils/mocks-tsx"

jest.mock("next-auth/react");

describe('PhraseList', () => {
    it('renders PhraseList component', async () => {
        mockNextUseSession({
            data: {
                session: {
                    expires: "",
                    user: {
                        email: "",
                        image: "",
                        name: ""
                    }
                }
            }
        });

        underTopicPhraseContextRender(<PhraseList></PhraseList>);

        screen.debug();
        expect(await screen.findAllByText("practice")).toBeNull();
        expect(await screen.findAllByText("newExpression")).not.toBeNull();
        const phraseList = await screen.findAllByText(/topic is/g)
        screen.debug(phraseList)
        await userEvent.click(phraseList[0])
        expect(await screen.findAllByText("practice")).not.toBeNull();
        screen.debug();

    });
});