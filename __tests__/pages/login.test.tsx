import * as React from "react";
import { render, screen } from "@testing-library/react";
import { useSession } from "next-auth/react";
import Login from "../../pages/login";
import { mockNextUseRouter, mockNextUseSession } from "../../utils/mocks";

jest.mock("next-auth/react");

describe("Login", () => {
  it("renders Login component", () => {
    //use mock router example
    mockNextUseRouter({
      route: "/",
      pathname: "/",
      query: "",
      asPath: `/`,
    });
    mockNextUseSession({
      data: {
        session: {
          expires: "2024-10-02T05:32:22.302Z",
          user: {
            email: "testuser@gmail.com",
            image: "https://lh3.googleusercontent.com/.....",
            name: "Test User",
          },
        },
      },
    });

    render(<Login />);

    screen.debug();
  });
});
