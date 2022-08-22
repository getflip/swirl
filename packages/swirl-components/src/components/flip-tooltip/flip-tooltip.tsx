import { Component, h, Host, Listen, Prop, State, Watch } from "@stencil/core";
import { NanoPopOptions, PositionMatch, reposition } from "nanopop";

export type FlipTooltipPosition = "top" | "right" | "bottom" | "left";

@Component({
  shadow: true,
  styleUrl: "flip-tooltip.css",
  tag: "flip-tooltip",
})
export class FlipTooltip {
  @Prop() delay: number = 300;
  @Prop() position: FlipTooltipPosition = "top";
  @Prop() tooltip!: string;
  @Prop() tooltipId!: string;

  @State() actualPosition: PositionMatch;
  @State() visible = false;

  private showTimeout: NodeJS.Timeout;
  private options: Partial<NanoPopOptions>;
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

  private reposition = () => {
    if (!this.referenceEl || !this.popperEl) {
      return;
    }

    this.actualPosition = reposition(
      this.referenceEl,
      this.popperEl,
      this.options
    );
  };

  private show = () => {
    this.visible = true;

    requestAnimationFrame(() => {
      this.reposition();
    });
  };

  private showWithDelay = () => {
    if (this.showTimeout) {
      clearTimeout(this.showTimeout);
      this.showTimeout = undefined;
    }

    this.showTimeout = setTimeout(() => {
      this.show();
    }, this.delay);
  };

  private hide = () => {
    if (this.showTimeout) {
      clearTimeout(this.showTimeout);
      this.showTimeout = undefined;
    }

    this.visible = false;
  };

  private updateOptions = () => {
    const margin =
      +getComputedStyle(document.documentElement)
        .getPropertyValue("--s-space-3")
        .replace("rem", "") * 16;

    this.options = {
      margin,
      position: this.position,
    };
  };

  private getArrowStyles = () => {
    if (this.actualPosition === "tm") {
      return {
        top: "100%",
        left: "50%",
        transform: "translate3d(-50%, -50%, 0) rotate(45deg)",
      };
    }

    if (this.actualPosition === "bm") {
      return {
        bottom: "100%",
        left: "50%",
        transform: "translate3d(-50%, 50%, 0) rotate(45deg)",
      };
    }

    if (this.actualPosition === "rm") {
      return {
        top: "50%",
        right: "100%",
        transform: "translate3d(50%, -50%, 0) rotate(45deg)",
      };
    }

    if (this.actualPosition === "lm") {
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
            aria-describedby={this.tooltipId}
            onBlur={this.hide}
            onClick={this.hide}
            onFocus={this.show}
            ref={(el) => (this.referenceEl = el)}
            tabIndex={0}
          >
            <slot></slot>
          </span>
          <span class="tooltip__popper" ref={(el) => (this.popperEl = el)}>
            {this.visible && (
              <span class="tooltip__bubble" id={this.tooltipId} role="tooltip">
                <span class="tooltip__content" innerHTML={this.tooltip}></span>
                <span class="tooltip__arrow" style={arrowStyles}></span>
              </span>
            )}
          </span>
        </span>
      </Host>
    );
  }
}
