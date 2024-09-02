import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { useSession } from "next-auth/react";
import Login from '../../pages/login';
import { mockNextUseRouter } from '../../utils/mocks';

jest.mock("next-auth/react");

describe('Login', () => {
    it('renders Login component', () => {
        mockNextUseRouter({
            route: "/",
            pathname: "/",
            query: "",
            asPath: `/`,
        });
        (useSession as jest.Mock).mockReturnValue({
            data: {
                session: {
                    expires: "2024-10-02T05:32:22.302Z",
                    user: {
                        email: "testuser@gmail.com",
                        image: "https://lh3.googleusercontent.com/.....",
                        name: "Test User"
                    }
                }
            }
        });

        render(<Login />);

        screen.debug();
    });
});