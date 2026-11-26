import { makeRequest } from "../messaging";
import { notifyAppReady } from "./app";

jest.mock("../messaging", () => ({
  makeRequest: jest.fn(),
}));

describe("app", () => {
  beforeAll(() => {
    (global as any).flipBridgeOptions = { hostAppOrigin: "http://localhost" };
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("'notifyAppReady' sends correct request", async () => {
    await notifyAppReady();

    const makeRequestMock = makeRequest as unknown as jest.Mock<
      typeof makeRequest
    >;

    expect(makeRequestMock).toHaveBeenCalledWith({
      id: makeRequestMock.mock.calls[0][0].id,
      method: "APP_READY",
    });
  });

  test("'notifyAppReady' sends correct request with 'builtWith'", async () => {
    await notifyAppReady({ builtWith: "fusion" });

    const makeRequestMock = makeRequest as unknown as jest.Mock<
      typeof makeRequest
    >;

    expect(makeRequestMock).toHaveBeenCalledWith({
      id: makeRequestMock.mock.calls[0][0].id,
      method: "APP_READY",
      params: {
        builtWith: "fusion",
      },
    });
  });
});
