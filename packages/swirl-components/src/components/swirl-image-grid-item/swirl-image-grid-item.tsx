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
} from "@stencil/core";
import classnames from "classnames";

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

  @Event() gifStarted: EventEmitter<void>;
  @Event() gifStopped: EventEmitter<void>;
  @Event() imageError: EventEmitter<void>;
  @Event() imageLoad: EventEmitter<void>;

  private intersectionObserver: IntersectionObserver;
  private img?: HTMLImageElement;
  private backgroundImg?: HTMLDivElement;

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
  }

  private setupIntersectionObserver() {
    if (this.loading !== "intersecting") {
      return;
    }

    this.intersectionObserver = new IntersectionObserver(
      this.onVisibilityChange.bind(this),
      {
        threshold: 0,
      }
    );

    this.intersectionObserver.observe(this.el);
  }

  private onVisibilityChange(entries: IntersectionObserverEntry[]) {
    this.inViewport = entries.some((entry) => entry.isIntersecting);
  }

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
    imageEl.src = staticImage;
    this.backgroundImg.attributeStyleMap.set(
      "background-image",
      `url(${staticImage})`
    );
    this.gifStopped.emit();
  }

  private playGif = () => {
    this.gifPaused = false;
    const imageEl = this.img;
    imageEl.src = this.src;
    this.backgroundImg.attributeStyleMap.set(
      "background-image",
      `url(${this.src})`
    );
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
                ? `url(${this.src})`
                : undefined,
            }}
            ref={(el) => (this.backgroundImg = el)}
          ></div>
          {this.loading !== "intersecting" || this.inViewport ? (
            <img
              alt={this.alt}
              class="image-grid-item__image"
              loading={
                this.loading !== "intersecting" ? this.loading : undefined
              }
              onError={this.onError}
              onLoad={this.onLoad}
              ref={(el) => (this.img = el)}
              src={this.src}
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
                aria-label={
                  this.gifPaused ? this.gifPlayLabel : this.gifPauseLabel
                }
              >
                {this.gifPaused ? (
                  <swirl-icon-play-arrow></swirl-icon-play-arrow>
                ) : (
                  <swirl-icon-pause></swirl-icon-pause>
                )}
              </button>
              <div class="image-grid-item__gif-controls__icon image-grid-item__gif-controls__icon--label">
                <swirl-icon-gif></swirl-icon-gif>
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
