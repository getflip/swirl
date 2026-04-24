import {
  Component,
  Element,
  Event,
  EventEmitter,
  Fragment,
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

/**
 * @slot watermark - Optional watermark image to be displayed in the bottom left corner of the image.
 */
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

  @State() computedSrc?: string;
  @State() error = false;
  @State() loaded = false;
  @State() hasTransparency = false;
  @State() inViewport = false;
  @State() gifPaused = false;

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
    this.hasTransparency = false;
  }

  componentWillLoad() {
    this.computedSrc = this.src;
  }

  componentDidLoad() {
    this.setupIntersectionObserver();

    if (this.img?.complete) {
      this.loaded = true;

      if (this.isCurrentImageInSync() && this.img) {
        this.hasTransparency = this.detectTransparency(this.img);
      }
    }
  }

  componentDidRender() {
    if (this.img?.complete && !this.loaded) {
      this.loaded = true;

      if (this.isCurrentImageInSync() && this.img) {
        this.hasTransparency = this.detectTransparency(this.img);
      }
    }
  }

  disconnectedCallback() {
    this.intersectionObserver?.disconnect();
    this.computedSrc = "";
    this.hasTransparency = false;
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

    if (this.img && this.isCurrentImageInSync()) {
      this.hasTransparency = this.detectTransparency(this.img);
    } else {
      this.hasTransparency = false;
    }

    this.imageLoad.emit();
  };

  private onError = () => {
    this.loaded = true;
    this.error = true;
    this.hasTransparency = false;
    this.imageError.emit();
  };

  private isCurrentImageInSync(): boolean {
    if (!this.img || this.computedSrc == null) {
      return false;
    }

    try {
      return (
        new URL(this.computedSrc, document.baseURI).href === this.img.currentSrc
      );
    } catch {
      return false;
    }
  }

  private isLikelyOpaqueJpegSource(src: string): boolean {
    if (src.startsWith("data:image/jpeg")) {
      return true;
    }

    try {
      const pathname = new URL(src).pathname.toLowerCase();

      return pathname.endsWith(".jpg") || pathname.endsWith(".jpeg");
    } catch {
      return false;
    }
  }

  private detectTransparency(img: HTMLImageElement): boolean {
    try {
      if (this.isLikelyOpaqueJpegSource(img.currentSrc)) {
        return false;
      }

      if (!img.naturalWidth || !img.naturalHeight) {
        return false;
      }

      const w = Math.min(img.naturalWidth, 64);
      const h = Math.min(img.naturalHeight, 64);
      const canvas = document.createElement("canvas");

      canvas.width = w;
      canvas.height = h;

      const ctx = canvas.getContext("2d");

      if (!ctx) {
        return false;
      }

      ctx.drawImage(img, 0, 0, w, h);

      const { data } = ctx.getImageData(0, 0, w, h);

      for (let i = 3; i < data.length; i += 4) {
        if (data[i] < 255) {
          return true;
        }
      }

      return false;
    } catch {
      return false;
    }
  }

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

    const hasWatermark = !!this.el.querySelector('[slot="watermark"]');

    const className = classnames("image-grid-item", {
      "image-grid-item--has-error": this.error,
      "image-grid-item--has-overlay": this.overlay,
      "image-grid-item--has-watermark": hasWatermark,
      "image-grid-item--loaded": this.loaded,
      "image-grid-item--gif-paused": this.gifPaused,
    });

    return (
      <Host data-sibling-count={siblingCount} role="listitem">
        <Tag class={className} type={this.interactive ? "button" : undefined}>
          <div
            class="image-grid-item__background"
            style={{
              backgroundImage:
                showImage && !this.hasTransparency
                  ? `url(${this.computedSrc})`
                  : undefined,
            }}
          ></div>
          {showImage ? (
            <Fragment>
              <img
                alt={this.alt}
                class="image-grid-item__image"
                loading={
                  this.loading !== "intersecting" ? this.loading : undefined
                }
                ref={this.onImageElementUpdate}
                src={this.computedSrc}
              />
              <span class="image-grid-item__watermark">
                <slot name="watermark"></slot>
              </span>
            </Fragment>
          ) : (
            <div class="image-grid-item__loading-placeholder">
              <swirl-visually-hidden>{this.alt}</swirl-visually-hidden>
            </div>
          )}

          {this.showGifControls && (
            <swirl-button
              class="image-grid-item__gif-control-button"
              label={this.gifPaused ? this.gifPlayLabel : this.gifPauseLabel}
              icon="<swirl-icon-gif></swirl-icon-gif>"
              variant="on-image"
              pill
              hideLabel
              swirlAriaLabel={
                this.gifPaused ? this.gifPlayLabel : this.gifPauseLabel
              }
              onClick={this.handleControlClick}
            ></swirl-button>
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
