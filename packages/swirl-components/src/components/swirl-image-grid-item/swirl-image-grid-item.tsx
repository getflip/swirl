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
  private img: HTMLImageElement | undefined;

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
    this.img?.removeEventListener("load", this.onLoad);
    this.img?.removeEventListener("error", this.onError);
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
      this.inViewport = sorted.at(-1).isIntersecting;

      if (!this.inViewport) {
        this.loaded = false;
      }
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

  private onImageElementUpdate = (el: HTMLImageElement) => {
    this.img?.removeEventListener("load", this.onLoad);
    this.img?.removeEventListener("error", this.onError);

    this.img = el;

    if (this.img) {
      this.img.addEventListener("load", this.onLoad);
      this.img.addEventListener("error", this.onError);
    }
  };

  render() {
    const Tag = this.interactive ? "button" : "div";

    const showImage =
      this.gifPaused || this.loading !== "intersecting" || this.inViewport;

    const siblingCount =
      Math.min(this.el.parentElement?.children.length, 4) ?? 1;

    const className = classnames("image-grid-item", {
      "image-grid-item--has-error": this.error,
      "image-grid-item--has-overlay": this.overlay,
      "image-grid-item--loaded": this.loaded,
    });

    return (
      <Host data-sibling-count={siblingCount} role="listitem">
        <Tag class={className} type={this.interactive ? "button" : undefined}>
          <div
            class="image-grid-item__background"
            style={{
              backgroundImage: showImage
                ? `url(${this.computedSrc})`
                : undefined,
            }}
          ></div>
          {showImage ? (
            <img
              alt={this.alt}
              class="image-grid-item__image"
              loading={
                this.loading !== "intersecting" ? this.loading : undefined
              }
              ref={this.onImageElementUpdate}
              src={this.computedSrc}
            />
          ) : (
            <div class="image-grid-item__loading-placeholder">
              <swirl-visually-hidden>{this.alt}</swirl-visually-hidden>
            </div>
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
            <swirl-skeleton-box
              class="image-grid-item__skeleton"
              height="100%"
              width="100%"
              borderRadius="none"
            ></swirl-skeleton-box>
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
