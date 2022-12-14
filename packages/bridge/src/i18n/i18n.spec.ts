import { makeRequest } from "../messaging";
import { getAvailableLangs, getLang } from "./i18n";

jest.mock("../messaging", () => ({
  makeRequest: jest.fn(),
}));

describe("i18n", () => {
  beforeAll(() => {
    (global as any).flipBridgeOptions = { hostAppOrigin: "http://localhost" };
  });

  test("'getAvailableLangs' sends correct request", async () => {
    await getAvailableLangs();

    const makeRequestMock = makeRequest as unknown as jest.Mock<
      typeof makeRequest
    >;

    expect(makeRequestMock).toHaveBeenCalledWith({
      id: makeRequestMock.mock.calls[0][0].id,
      method: "GET_AVAILABLE_LANGS",
    });
  });

  test("'getLang' sends correct request", async () => {
    await getLang();

    const makeRequestMock = makeRequest as unknown as jest.Mock<
      typeof makeRequest
    >;

    expect(makeRequestMock).toHaveBeenCalledWith({
      id: makeRequestMock.mock.calls[0][0].id,
      method: "GET_LANG",
    });
  });
});
