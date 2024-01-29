import { Component, Element, h, Host, Prop, State } from "@stencil/core";
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

  @State() loaded = false;
  @State() inViewport = false;

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
    this.loaded = true;
    console.log(this.loaded);
  };

  render() {
    const Tag = this.interactive ? "button" : "div";

    const className = classnames("image-grid-item", {
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
          {(this.loading !== "intersecting" || this.inViewport) && (
            <img
              alt={this.alt}
              class="image-grid-item__image"
              loading={
                this.loading !== "intersecting" ? this.loading : undefined
              }
              onLoad={this.onLoad}
              src={this.src}
            />
          )}
          {this.loaded && this.icon && !Boolean(this.overlay) && (
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
        </Tag>
      </Host>
    );
  }
}
