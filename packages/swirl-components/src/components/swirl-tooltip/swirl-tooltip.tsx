import {
  arrow,
  autoUpdate,
  computePosition,
  ComputePositionConfig,
  ComputePositionReturn,
  flip,
  offset,
  shift,
  Strategy,
} from "@floating-ui/dom";
import {
  Component,
  Element,
  h,
  Host,
  Listen,
  Prop,
  State,
  Watch,
} from "@stencil/core";
import classnames from "classnames";
import { getPixelsFromRemToken } from "../../utils";

export type SwirlTooltipPosition = "top" | "right" | "bottom" | "left";

@Component({
  shadow: true,
  styleUrl: "swirl-tooltip.css",
  tag: "swirl-tooltip",
})
export class SwirlTooltip {
  @Element() el: HTMLElement;

  @Prop() active = true;
  @Prop() content!: string;
  @Prop() delay?: number = 200;
  @Prop() position?: SwirlTooltipPosition = "top";
  @Prop() positioning?: Strategy = "absolute";
  @Prop() initiallyVisible = false;

  @State() actualPosition: ComputePositionReturn;
  @State() arrowStyles: { [key: string]: string };
  @State() visible = false;
  @State() canShow = true;

  private disableAutoUpdate: () => void;

  private arrowElement: HTMLElement;
  private showTimeout: NodeJS.Timeout;
  private options: Partial<ComputePositionConfig>;
  private popperEl: HTMLSpanElement;

  @Watch("position")
  watchPosition() {
    this.updateOptions();
  }

  @Listen("mouseenter")
  onMouseEnter() {
    this.showWithDelay();
  }

  @Listen("mouseleave")
  onMouseLeave() {
    if (!this.initiallyVisible) {
      this.hide();
    }
  }

  @Listen("resize", { target: "window" })
  onWindowResize() {
    if (!this.active) {
      return;
    }

    this.reposition();
  }

  @Listen("scroll", { target: "window" })
  onWindowScroll() {
    if (!this.active || !this.visible) {
      return;
    }

    this.reposition();
  }

  componentWillLoad() {
    this.reposition();
  }

  componentDidLoad() {
    this.updateOptions();

    if (this.initiallyVisible) {
      this.show();
      this.canShow = false;
    }
  }

  private onKeydown = (event: KeyboardEvent) => {
    if (event.code === "Escape" && !this.initiallyVisible) {
      this.hide();
    }
  };

  private reposition = async () => {
    const referenceElement = this.el.children[0] as HTMLElement;

    if (!Boolean(referenceElement) || !Boolean(this.popperEl)) {
      return;
    }

    const middleware = [
      ...this.options.middleware.filter(
        (middleware) => middleware.name !== "arrow"
      ),
      arrow({ element: this.arrowElement, padding: 12 }),
    ];

    this.actualPosition = await computePosition(
      referenceElement,
      this.popperEl,
      { ...this.options, middleware }
    );

    const arrowX = this.actualPosition.middlewareData.arrow?.x;
    const arrowY = this.actualPosition.middlewareData.arrow?.y;

    this.arrowStyles = {
      left: Boolean(arrowX) ? arrowX + "px" : undefined,
      top: Boolean(arrowY) ? arrowY + "px" : undefined,
    };
  };

  private show = () => {
    if (!this.active || !this.canShow) {
      return;
    }

    this.visible = true;

    requestAnimationFrame(() => {
      const referenceElement = this.el.children[0] as HTMLElement;

      if (!Boolean(referenceElement)) {
        return;
      }

      this.reposition();
      this.disableAutoUpdate = autoUpdate(
        referenceElement,
        this.popperEl,
        this.reposition.bind(this)
      );
    });
  };

  private showWithDelay = () => {
    if (!this.active) {
      return;
    }

    if (Boolean(this.showTimeout)) {
      clearTimeout(this.showTimeout);
      this.showTimeout = undefined;
    }

    this.showTimeout = setTimeout(() => {
      this.show();
    }, this.delay);
  };

  private hide = () => {
    if (Boolean(this.showTimeout)) {
      clearTimeout(this.showTimeout);
      this.showTimeout = undefined;
    }

    this.visible = false;
    this.disableAutoUpdate?.();
  };

  private updateOptions = () => {
    const margin = getPixelsFromRemToken("--s-space-12");
    const shiftPaddingY = getPixelsFromRemToken("--s-space-8");
    const shiftPaddingX = getPixelsFromRemToken("--s-space-16");

    this.options = {
      middleware: [
        offset(margin),
        shift({
          padding: {
            top: shiftPaddingY,
            bottom: shiftPaddingY,
            left: shiftPaddingX,
            right: shiftPaddingX,
          },
        }),
        flip(),
      ],
      placement: this.position,
      strategy: this.positioning,
    };
  };

  render() {
    const className = classnames(
      "tooltip",
      `tooltip--actual-placement-${this.actualPosition?.placement}`,
      {
        "tooltip--active": this.active,
        "tooltip--visible": this.visible,
      }
    );

    return (
      <Host onKeydown={this.onKeydown}>
        <span class={className}>
          <span
            class="tooltip__reference"
            aria-describedby="tooltip"
            onFocusout={!this.initiallyVisible && this.hide}
            onClick={this.hide}
            onFocusin={this.show}
          >
            <slot></slot>
          </span>
          <span
            class="tooltip__popper"
            ref={(el) => (this.popperEl = el)}
            style={{
              top: Boolean(this.actualPosition)
                ? `${this.actualPosition?.y}px`
                : "",
              left: Boolean(this.actualPosition)
                ? `${this.actualPosition?.x}px`
                : "",
              position: this.positioning,
            }}
          >
            {this.visible && (
              <span
                class="tooltip__bubble"
                id="tooltip"
                part="tooltip__bubble"
                role="tooltip"
              >
                <span class="tooltip__content" innerHTML={this.content}></span>
              </span>
            )}
            <span
              class="tooltip__arrow"
              ref={(el) => (this.arrowElement = el)}
              style={{
                ...this.arrowStyles,
                visibility: this.visible ? "visible" : "hidden",
              }}
            ></span>
          </span>
        </span>
      </Host>
    );
  }
}
