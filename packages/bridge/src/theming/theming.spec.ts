import { makeRequest } from "../messaging";
import { getTheme, setTheme } from "./theming";

jest.mock("../messaging", () => ({
  makeRequest: jest.fn(),
}));

describe("theming", () => {
  beforeAll(() => {
    (global as any).flipBridgeOptions = { hostAppOrigin: "http://localhost" };
  });

  test("'getTheme' sends correct request", async () => {
    await getTheme();

    const makeRequestMock = makeRequest as unknown as jest.Mock<
      typeof makeRequest
    >;

    expect(makeRequestMock).toHaveBeenCalledWith({
      id: makeRequestMock.mock.calls[0][0].id,
      method: "GET_THEME",
    });
  });

  test("'setTheme' sends correct request", async () => {
    await setTheme("dark");

    const makeRequestMock = makeRequest as unknown as jest.Mock<
      typeof makeRequest
    >;

    expect(makeRequestMock).toHaveBeenCalledWith({
      id: makeRequestMock.mock.calls[0][0].id,
      method: "SET_THEME",
      params: {
        theme: "dark",
      },
    });
  });
});
