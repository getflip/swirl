import { makeRequest } from "../messaging";
import { navigate } from "./navigation";

jest.mock("../messaging", () => ({
  makeRequest: jest.fn(),
}));

describe("navigation", () => {
  beforeAll(() => {
    (global as any).flipBridgeOptions = { hostAppOrigin: "http://localhost" };
  });

  test("'navigate' sends correct request", async () => {
    await navigate("/route");

    const makeRequestMock = makeRequest as unknown as jest.Mock<
      typeof makeRequest
    >;

    expect(makeRequestMock).toHaveBeenCalledWith({
      id: makeRequestMock.mock.calls[0][0].id,
      method: "NAVIGATE",
      params: {
        path: "/route",
      },
    });
  });
});
