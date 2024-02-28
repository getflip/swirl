import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
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
  @Prop() icon?: string;
  @Prop() interactive?: boolean;
  @Prop() loading?: SwirlImageGridItemLoading;
  @Prop() overlay?: string;
  @Prop() src!: string;

  @State() error = false;
  @State() loaded = false;
  @State() inViewport = false;

  @Event() imageError: EventEmitter<void>;
  @Event() imageLoad: EventEmitter<void>;

  private intersectionObserver: IntersectionObserver;

  componentDidLoad() {
    this.setupIntersectionObserver();
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
    if (entries[0].isIntersecting) {
      this.inViewport = true;
    }
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

  render() {
    const Tag = this.interactive ? "button" : "div";

    const className = classnames("image-grid-item", {
      "image-grid-item--has-error": this.error,
      "image-grid-item--has-overlay": this.overlay,
    });

    return (
      <Host role="listitem">
        <Tag class={className} type={this.interactive ? "button" : undefined}>
          <div
            class="image-grid-item__background"
            style={{
              backgroundImage:
                !Boolean(this.loading) ||
                this.loading === "eager" ||
                this.loaded
                  ? `url(${this.src})`
                  : undefined,
            }}
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
              src={this.src}
            />
          ) : (
            <div class="image-grid-item__loading-placeholder"></div>
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
