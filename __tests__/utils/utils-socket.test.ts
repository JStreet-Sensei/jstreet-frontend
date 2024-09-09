import { extractDataFromQuery } from "@/utils/utils-socket";
import { ParsedUrlQuery } from "querystring";

describe("utils-socket", () => {
  it("should parse the data", () => {
    const query = {
      user_id: "2",
      username: "Player",
      lobby_id: "2",
    } as ParsedUrlQuery;

    const { player, lobby_id } = extractDataFromQuery(query);

    expect(player.user_id === 1);
    expect(player.username === "Player");
    expect(lobby_id === 2);
  });

  it("should throw an error if value user_id is invalid", () => {
    const query = {
      user_id: "not_number",
      username: "Player",
      lobby_id: "2",
    } as ParsedUrlQuery;

    expect(() => {
      extractDataFromQuery(query);
    }).toThrow("Invalid user_id: must be a valid number.");
  });
});
