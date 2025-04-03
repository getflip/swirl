import { makeRequest } from "../messaging";
import { download } from "./download";

jest.mock("../messaging", () => ({
  makeRequest: jest.fn(),
}));

describe("download", () => {
  beforeAll(() => {
    (global as any).flipBridgeOptions = { hostAppOrigin: "http://localhost" };
  });

  test("sends correct url download request", async () => {
    await download(
      "example.pdf",
      "application/pdf",
      "http://example.com/file.pdf"
    );

    const makeRequestMock = makeRequest as unknown as jest.Mock<
      typeof makeRequest
    >;

    expect(makeRequestMock).toHaveBeenCalledWith({
      id: makeRequestMock.mock.calls[0][0].id,
      method: "DOWNLOAD",
      params: {
        fileName: "example.pdf",
        fileType: "application/pdf",
        url: "http://example.com/file.pdf",
        dataUrl: undefined,
      },
    });
  });

  test("sends correct dataUrl download request", async () => {
    await download(
      "example.pdf",
      "application/pdf",
      undefined,
      "data:text/plain;base64,SGVsbG8sIFdvcmxkIQ=="
    );

    const makeRequestMock = makeRequest as unknown as jest.Mock<
      typeof makeRequest
    >;

    expect(makeRequestMock).toHaveBeenCalledWith({
      id: makeRequestMock.mock.calls[0][0].id,
      method: "DOWNLOAD",
      params: {
        fileName: "example.pdf",
        fileType: "application/pdf",
        url: undefined,
        dataUrl: "data:text/plain;base64,SGVsbG8sIFdvcmxkIQ==",
      },
    });
  });
});
