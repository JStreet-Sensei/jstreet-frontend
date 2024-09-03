import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { useSession } from "next-auth/react";
import SelectGame from '../../pages/selectGame';
import { mockNextUseRouter, mockNextUseSession } from '../../utils/mocks';

jest.mock("next-auth/react");

describe('SelectGame', () => {
    it('renders SelectGame component', () => {
        //use mock session example
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

        render(<SelectGame />);

        screen.debug();
    });
});