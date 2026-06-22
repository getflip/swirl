import { newSpecPage } from "@stencil/core/testing";
import { SwirlFileViewer } from "../../swirl-file-viewer";
import { SwirlFileViewerVideo } from "./swirl-file-viewer-video";

function getVideoElement(page: Awaited<ReturnType<typeof newSpecPage>>) {
  return page.root.shadowRoot.querySelector("video") as HTMLVideoElement;
}

function expectedPlaybackDetail(
  state: { currentTime: number; duration: number },
  video: HTMLVideoElement
) {
  return expect.objectContaining({
    detail: {
      ...state,
      videoEl: video,
    },
  });
}

function setVideoPlaybackState(
  video: HTMLVideoElement,
  state: {
    currentTime?: number;
    duration?: number;
    playbackRate?: number;
  }
) {
  if (state.currentTime !== undefined) {
    Object.defineProperty(video, "currentTime", {
      configurable: true,
      value: state.currentTime,
    });
  }

  if (state.duration !== undefined) {
    Object.defineProperty(video, "duration", {
      configurable: true,
      value: state.duration,
    });
  }

  if (state.playbackRate !== undefined) {
    Object.defineProperty(video, "playbackRate", {
      configurable: true,
      value: state.playbackRate,
    });
  }
}

describe("swirl-file-viewer-video", () => {
  it("emits playback events with numeric detail from native video listeners", async () => {
    const page = await newSpecPage({
      components: [SwirlFileViewerVideo],
      html: `<swirl-file-viewer-video file="/sample.mp4"></swirl-file-viewer-video>`,
    });

    const playbackPlaySpy = jest.fn();
    const playbackPauseSpy = jest.fn();
    const playbackTimeUpdateSpy = jest.fn();
    const playbackSeekedSpy = jest.fn();
    const playbackRateChangeSpy = jest.fn();
    const playbackEndedSpy = jest.fn();

    page.root.addEventListener("playbackPlay", playbackPlaySpy);
    page.root.addEventListener("playbackPause", playbackPauseSpy);
    page.root.addEventListener("playbackTimeUpdate", playbackTimeUpdateSpy);
    page.root.addEventListener("playbackSeeked", playbackSeekedSpy);
    page.root.addEventListener("playbackRateChange", playbackRateChangeSpy);
    page.root.addEventListener("playbackEnded", playbackEndedSpy);

    const video = getVideoElement(page);
    setVideoPlaybackState(video, {
      currentTime: 12.5,
      duration: 120,
      playbackRate: 1.5,
    });

    video.dispatchEvent(new Event("play"));
    video.dispatchEvent(new Event("pause"));
    video.dispatchEvent(new Event("timeupdate"));
    video.dispatchEvent(new Event("seeked"));
    video.dispatchEvent(new Event("ratechange"));
    video.dispatchEvent(new Event("ended"));

    const playbackDetail = { currentTime: 12.5, duration: 120 };

    expect(playbackPlaySpy).toHaveBeenCalledWith(
      expectedPlaybackDetail(playbackDetail, video)
    );
    expect(playbackPauseSpy).toHaveBeenCalledWith(
      expectedPlaybackDetail(playbackDetail, video)
    );
    expect(playbackTimeUpdateSpy).toHaveBeenCalledWith(
      expectedPlaybackDetail(playbackDetail, video)
    );
    expect(playbackSeekedSpy).toHaveBeenCalledWith(
      expectedPlaybackDetail(playbackDetail, video)
    );
    expect(playbackRateChangeSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        detail: {
          playbackRate: 1.5,
          ...playbackDetail,
          videoEl: video,
        },
      })
    );
    expect(playbackEndedSpy).toHaveBeenCalledWith(
      expectedPlaybackDetail(playbackDetail, video)
    );
  });

  it("emits bubbling, composed playback events", async () => {
    const page = await newSpecPage({
      components: [SwirlFileViewerVideo],
      html: `<swirl-file-viewer-video file="/sample.mp4"></swirl-file-viewer-video>`,
    });

    const hostSpy = jest.fn();
    page.doc.body.addEventListener("playbackPlay", hostSpy);

    const video = getVideoElement(page);
    setVideoPlaybackState(video, { currentTime: 0, duration: 60 });
    video.dispatchEvent(new Event("play"));

    expect(hostSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        bubbles: true,
        composed: true,
      })
    );
  });

  it("emits playbackTeardown when disconnected", async () => {
    const page = await newSpecPage({
      components: [SwirlFileViewerVideo],
      html: `<swirl-file-viewer-video file="/sample.mp4"></swirl-file-viewer-video>`,
    });

    const playbackTeardownSpy = jest.fn();
    page.root.addEventListener("playbackTeardown", playbackTeardownSpy);

    const video = getVideoElement(page);
    setVideoPlaybackState(video, { currentTime: 33, duration: 90 });

    page.root.remove();
    await page.waitForChanges();

    expect(playbackTeardownSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        detail: { currentTime: 33, duration: 90, videoEl: video },
        bubbles: true,
        composed: true,
      })
    );
  });

  it("bubbles playback events through swirl-file-viewer without duplicate emission", async () => {
    const page = await newSpecPage({
      components: [SwirlFileViewer, SwirlFileViewerVideo],
      html: `
        <swirl-file-viewer file="/sample.mp4" type="video/mp4"></swirl-file-viewer>
      `,
    });

    const playbackPlaySpy = jest.fn();
    page.root.addEventListener("playbackPlay", playbackPlaySpy);

    const video = page.root.shadowRoot
      .querySelector("swirl-file-viewer-video")
      .shadowRoot.querySelector("video") as HTMLVideoElement;

    setVideoPlaybackState(video, { currentTime: 5, duration: 50 });
    video.dispatchEvent(new Event("play"));

    expect(playbackPlaySpy).toHaveBeenCalledTimes(1);
    expect(playbackPlaySpy).toHaveBeenCalledWith(
      expect.objectContaining({
        detail: { currentTime: 5, duration: 50, videoEl: video },
        bubbles: true,
        composed: true,
      })
    );
  });
});
