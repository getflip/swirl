import {
  autoUpdate,
  computePosition,
  ComputePositionConfig,
  ComputePositionReturn,
  flip,
  offset,
  shift,
} from "@floating-ui/dom";
import { Component, h, Host, Listen, Prop, State, Watch } from "@stencil/core";

export type SwirlTooltipPosition = "top" | "right" | "bottom" | "left";

@Component({
  shadow: true,
  styleUrl: "swirl-tooltip.css",
  tag: "swirl-tooltip",
})
export class SwirlTooltip {
  @Prop() content!: string;
  @Prop() delay?: number = 300;
  @Prop() position?: SwirlTooltipPosition = "top";

  @State() actualPosition: ComputePositionReturn;
  @State() visible = false;

  private disableAutoUpdate;
  private showTimeout: NodeJS.Timeout;
  private options: Partial<ComputePositionConfig>;
  private popperEl: HTMLSpanElement;
  private referenceEl: HTMLSpanElement;

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
    this.hide();
  }

  @Listen("resize", { target: "window" })
  onWindowResize() {
    this.reposition();
  }

  @Listen("scroll", { target: "window" })
  onWindowScroll() {
    this.reposition();
  }

  componentWillLoad() {
    this.reposition();
  }

  componentDidLoad() {
    this.updateOptions();
  }

  private onKeydown = (event: KeyboardEvent) => {
    if (event.code === "Escape") {
      this.hide();
    }
  };

  private reposition = async () => {
    if (!Boolean(this.referenceEl) || !Boolean(this.popperEl)) {
      return;
    }

    this.actualPosition = await computePosition(
      this.referenceEl,
      this.popperEl,
      this.options
    );
  };

  private show = () => {
    this.visible = true;

    requestAnimationFrame(() => {
      this.reposition();
      this.disableAutoUpdate = autoUpdate(
        this.referenceEl,
        this.popperEl,
        this.reposition.bind(this)
      );
    });
  };

  private showWithDelay = () => {
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
    const margin =
      +getComputedStyle(document.documentElement)
        .getPropertyValue("--s-space-12")
        .replace("rem", "") * 16;

    this.options = {
      middleware: [offset(margin), shift(), flip()],
      placement: this.position,
      strategy: "absolute",
    };
  };

  private getArrowStyles = () => {
    if (this.actualPosition?.placement === "top") {
      return {
        top: "100%",
        left: "50%",
        transform: "translate3d(-50%, -50%, 0) rotate(45deg)",
      };
    }

    if (this.actualPosition?.placement === "bottom") {
      return {
        bottom: "100%",
        left: "50%",
        transform: "translate3d(-50%, 50%, 0) rotate(45deg)",
      };
    }

    if (this.actualPosition?.placement === "right") {
      return {
        top: "50%",
        right: "100%",
        transform: "translate3d(50%, -50%, 0) rotate(45deg)",
      };
    }

    if (this.actualPosition?.placement === "left") {
      return {
        top: "50%",
        left: "100%",
        transform: "translate3d(-50%, -50%, 0) rotate(45deg)",
      };
    }
  };

  render() {
    const arrowStyles = this.getArrowStyles();

    return (
      <Host onKeydown={this.onKeydown}>
        <span class="tooltip">
          <span
            class="tooltip__reference"
            aria-describedby="tooltip"
            onBlur={this.hide}
            onClick={this.hide}
            onFocus={this.show}
            ref={(el) => (this.referenceEl = el)}
            tabIndex={0}
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
                <span class="tooltip__arrow" style={arrowStyles}></span>
              </span>
            )}
          </span>
        </span>
      </Host>
    );
  }
}
