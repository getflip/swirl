import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Method,
  Prop,
  State,
  Watch,
} from "@stencil/core";
import classnames from "classnames";
import { debounce } from "../../utils";

export type SwirlImageGridItemLoading =
  | "lazy"
  | "auto"
  | "eager"
  | "intersecting";

@Component({
  shadow: true,
  styleUrl: "swirl-image-grid-item.css",
  tag: "swirl-image-grid-item",
})
export class SwirlImageGridItem {
  @Element() el!: HTMLElement;

  @Prop() alt!: string;
  @Prop() gifPauseLabel?: string = "Pause GIF playback";
  @Prop() gifPlayLabel?: string = "Continue GIF playback";
  @Prop() icon?: string;
  @Prop() interactive?: boolean;
  @Prop() loading?: SwirlImageGridItemLoading;
  @Prop() overlay?: string;
  @Prop() showGifControls?: boolean;
  @Prop() src!: string;

  @State() error = false;
  @State() loaded = false;
  @State() inViewport = false;
  @State() gifPaused = false;
  @State() computedSrc?: string;

  @Event() gifStarted: EventEmitter<void>;
  @Event() gifStopped: EventEmitter<void>;
  @Event() imageError: EventEmitter<void>;
  @Event() imageLoad: EventEmitter<void>;

  private intersectionObserver: IntersectionObserver;
  private img?: HTMLImageElement;

  /**
   * Start Gif playback.
   * @returns
   */
  @Method()
  async play() {
    this.playGif();
  }

  /**
   * Stop Gif playback.
   * @returns
   */
  @Method()
  async pause() {
    this.pauseGif();
  }

  @Watch("src")
  watchSrcProp() {
    this.computedSrc = this.src;
    this.gifPaused = false;
  }

  componentWillLoad() {
    this.computedSrc = this.src;
  }

  componentDidLoad() {
    this.setupIntersectionObserver();

    if (this.img?.complete) {
      this.loaded = true;
    }
  }

  componentDidRender() {
    if (this.img?.complete && !this.loaded) {
      this.loaded = true;
    }
  }

  disconnectedCallback() {
    this.intersectionObserver?.disconnect();
    this.computedSrc = "";
  }

  private setupIntersectionObserver() {
    if (this.loading !== "intersecting") {
      return;
    }

    this.intersectionObserver = new IntersectionObserver((entries) => {
      this.handleIntersectionEntries(entries);
    });

    this.intersectionObserver.observe(this.el);
  }

  private handleIntersectionEntries = debounce(
    (entries: IntersectionObserverEntry[]) => {
      const sorted = [...entries].sort((a, b) => a.time - b.time);
      this.inViewport = sorted[sorted.length - 1].isIntersecting;
    },
    250
  );

  private onLoad = () => {
    this.error = false;
    this.loaded = true;
    this.imageLoad.emit();
  };

  private onError = () => {
    this.loaded = true;
    this.error = true;
    this.imageError.emit();
  };

  private async pauseGif() {
    const imageEl = this.img;
    const staticImage = await this.readImageFromCanvas(imageEl.src);

    this.gifPaused = true;
    this.computedSrc = staticImage;
    this.gifStopped.emit();
  }

  private playGif = () => {
    this.gifPaused = false;
    this.computedSrc = this.src;
    this.gifStarted.emit();
  };

  private handleControlClick = (event: MouseEvent) => {
    event.stopImmediatePropagation();
    this.gifPaused ? this.playGif() : this.pauseGif();
  };

  private readImageFromCanvas(imageSrc: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const image: HTMLImageElement = new Image();
      image.src = imageSrc;
      image.onload = (ev) => {
        const el = ev.target as HTMLImageElement;
        const canvas = document.createElement("canvas"),
          ctx = canvas.getContext("2d");
        canvas.width = el.width;
        canvas.height = el.height;
        ctx.drawImage(el, 0, 0, el.width, el.height);
        resolve(canvas.toDataURL("image/jpeg"));
      };
      image.onerror = () => reject();
    });
  }

  render() {
    const Tag = this.interactive ? "button" : "div";

    const showBlurredBackground =
      this.gifPaused ||
      !Boolean(this.loading) ||
      this.loading === "eager" ||
      (this.loaded && (this.loading !== "intersecting" || this.inViewport));

    const siblingCount =
      Math.min(this.el.parentElement?.children.length, 4) ?? 1;

    const className = classnames("image-grid-item", {
      "image-grid-item--has-error": this.error,
      "image-grid-item--has-overlay": this.overlay,
    });

    return (
      <Host data-sibling-count={siblingCount} role="listitem">
        <Tag class={className} type={this.interactive ? "button" : undefined}>
          <div
            class="image-grid-item__background"
            style={{
              backgroundImage: showBlurredBackground
                ? `url(${this.computedSrc})`
                : undefined,
            }}
          ></div>
          {this.loading !== "intersecting" ||
          this.inViewport ||
          this.gifPaused ? (
            <img
              alt={this.alt}
              class="image-grid-item__image"
              loading={
                this.loading !== "intersecting" ? this.loading : undefined
              }
              onError={this.onError}
              onLoad={this.onLoad}
              ref={(el) => (this.img = el)}
              src={this.computedSrc}
            />
          ) : (
            <div class="image-grid-item__loading-placeholder"></div>
          )}

          {this.showGifControls && (
            <swirl-stack
              class="image-grid-item__gif-controls"
              orientation="horizontal"
              spacing="4"
            >
              <button
                class="image-grid-item__gif-controls__icon image-grid-item__gif-controls__icon--button"
                onClick={this.handleControlClick}
                type="button"
                aria-label={
                  this.gifPaused ? this.gifPlayLabel : this.gifPauseLabel
                }
              >
                {this.gifPaused ? (
                  <swirl-icon-play-arrow size={20}></swirl-icon-play-arrow>
                ) : (
                  <swirl-icon-pause size={20}></swirl-icon-pause>
                )}
              </button>
              <div class="image-grid-item__gif-controls__icon image-grid-item__gif-controls__icon--label">
                <swirl-icon-gif size={20}></swirl-icon-gif>
              </div>
            </swirl-stack>
          )}
          {this.loaded &&
            !this.error &&
            this.icon &&
            !Boolean(this.overlay) && (
              <div class="image-grid-item__icon" innerHTML={this.icon}></div>
            )}
          {this.overlay && (
            <div class="image-grid-item__overlay">{this.overlay}</div>
          )}
          {!this.loaded && (
            <div class="image-grid-item__spinner">
              <swirl-spinner></swirl-spinner>
            </div>
          )}
          {this.loaded && this.error && (
            <div class="image-grid-item__error">
              <swirl-icon-error color="critical"></swirl-icon-error>
            </div>
          )}
        </Tag>
      </Host>
    );
  }
}
