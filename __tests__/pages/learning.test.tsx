import * as React from "react";
import { screen } from "@testing-library/react";
import { mockNextUseSession } from "../../utils/mocks";
import userEvent from "@testing-library/user-event";
import underTopicPhraseContextRender from "../../utils/mocks-tsx";
import Learning from "../../pages/game/learning";

jest.mock("next-auth/react");

describe("PhraseList", () => {
  it("renders PhraseList component", async () => {
    mockNextUseSession({
      data: {
        session: {
          expires: "",
          user: {
            email: "",
            image: "",
            name: "",
          },
        },
      },
    });

    underTopicPhraseContextRender(<Learning />);

    //check the difference of rendered page before and after example
    // screen.debug();
    expect((await screen.findAllByText("Playing together")).length === 1);
    expect((await screen.findAllByText("First Contact")).length !== 1);
    const phraseList = await screen.findAllByText("Playing together");
    await userEvent.click(phraseList[0]);
    expect((await screen.findAllByText("Playing together")).length !== 1);
    expect((await screen.findAllByText("First Contact")).length === 1);
    // screen.debug();
  });
});
