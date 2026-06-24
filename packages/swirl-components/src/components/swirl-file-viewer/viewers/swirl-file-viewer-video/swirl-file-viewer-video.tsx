import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Prop,
  Watch,
} from "@stencil/core";

export type SwirlFileViewerVideoPlaybackDetail = {
  currentTime: number;
  duration: number;
  videoEl: HTMLVideoElement;
};

export type SwirlFileViewerVideoPlaybackRateChangeDetail =
  SwirlFileViewerVideoPlaybackDetail & {
    playbackRate: number;
  };

@Component({
  shadow: true,
  styleUrl: "swirl-file-viewer-video.css",
  tag: "swirl-file-viewer-video",
})
export class SwirlFileViewerVideo {
  @Element() el: HTMLElement;

  @Prop() autoplay?: boolean;
  @Prop() disableDownload?: boolean;
  @Prop() file!: string;

  @Event() activate: EventEmitter<HTMLElement>;
  @Event({ bubbles: true, composed: true })
  playbackPlay: EventEmitter<SwirlFileViewerVideoPlaybackDetail>;
  @Event({ bubbles: true, composed: true })
  playbackPause: EventEmitter<SwirlFileViewerVideoPlaybackDetail>;
  @Event({ bubbles: true, composed: true })
  playbackTimeUpdate: EventEmitter<SwirlFileViewerVideoPlaybackDetail>;
  @Event({ bubbles: true, composed: true })
  playbackSeeked: EventEmitter<SwirlFileViewerVideoPlaybackDetail>;
  @Event({ bubbles: true, composed: true })
  playbackSeeking: EventEmitter<SwirlFileViewerVideoPlaybackDetail>;
  @Event({ bubbles: true, composed: true })
  playbackRateChange: EventEmitter<SwirlFileViewerVideoPlaybackRateChangeDetail>;
  @Event({ bubbles: true, composed: true })
  playbackEnded: EventEmitter<SwirlFileViewerVideoPlaybackDetail>;
  @Event({ bubbles: true, composed: true })
  playbackTeardown: EventEmitter<SwirlFileViewerVideoPlaybackDetail>;

  private videoEl: HTMLVideoElement;

  componentDidLoad() {
    this.activate.emit(this.el);

    if (this.disableDownload) {
      this.videoEl.setAttribute("controlsList", "nodownload");
    }
  }

  disconnectedCallback() {
    if (this.videoEl) {
      /**
       * Cannot call this.playbackTeardown.emit() here because the host is by
       * definition already detached, so Stencil throws a warning (in tests and
       * in real dev builds). Keeping the @Event for type safety.
       */
      this.el.dispatchEvent(
        new CustomEvent("playbackTeardown", {
          bubbles: true,
          composed: true,
          detail: this.getPlaybackDetail(),
        })
      );
    }
  }

  @Watch("disableDownload")
  watchDisableDownload() {
    if (this.disableDownload) {
      this.videoEl.setAttribute("controlsList", "nodownload");
    } else {
      this.videoEl.removeAttribute("controlsList");
    }
  }

  private getPlaybackDetail(): SwirlFileViewerVideoPlaybackDetail {
    return {
      currentTime: this.videoEl.currentTime,
      duration: this.videoEl.duration,
      videoEl: this.videoEl,
    };
  }

  private getPlaybackRateChangeDetail(): SwirlFileViewerVideoPlaybackRateChangeDetail {
    return {
      playbackRate: this.videoEl.playbackRate,
      ...this.getPlaybackDetail(),
    };
  }

  private onNativePlay = () => {
    this.playbackPlay.emit(this.getPlaybackDetail());
  };

  private onNativePause = () => {
    this.playbackPause.emit(this.getPlaybackDetail());
  };

  private onNativeTimeUpdate = () => {
    this.playbackTimeUpdate.emit(this.getPlaybackDetail());
  };

  private onNativeSeeked = () => {
    this.playbackSeeked.emit(this.getPlaybackDetail());
  };

  private onNativeSeeking = () => {
    this.playbackSeeking.emit(this.getPlaybackDetail());
  };

  private onNativeRateChange = () => {
    this.playbackRateChange.emit(this.getPlaybackRateChangeDetail());
  };

  private onNativeEnded = () => {
    this.playbackEnded.emit(this.getPlaybackDetail());
  };

  render() {
    return (
      <Host class="file-viewer-video">
        <video
          autoplay={this.autoplay}
          class="file-viewer-video__video"
          controls
          onEnded={this.onNativeEnded}
          onPause={this.onNativePause}
          onPlay={this.onNativePlay}
          onRateChange={this.onNativeRateChange}
          onSeeked={this.onNativeSeeked}
          onSeeking={this.onNativeSeeking}
          onTimeUpdate={this.onNativeTimeUpdate}
          src={this.file}
          ref={(el) => (this.videoEl = el)}
        ></video>
      </Host>
    );
  }
}
