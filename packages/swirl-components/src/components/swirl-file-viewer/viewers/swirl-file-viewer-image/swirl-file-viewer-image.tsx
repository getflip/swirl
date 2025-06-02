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

@Component({
  shadow: true,
  styleUrl: "swirl-file-viewer-image.css",
  tag: "swirl-file-viewer-image",
})
export class SwirlFileViewerImage {
  @Element() el: HTMLElement;

  @Prop() description?: string = "";
  @Prop() errorMessage?: string = "File could not be loaded.";
  @Prop() file!: string;
  @Prop() maxZoom?: number = 3;

  @State() error: boolean;
  @State() loading: boolean = true;

  @Event() activate: EventEmitter<HTMLElement>;

  private imageEl: HTMLImageElement | undefined;
  private panning: boolean;
  private panX: number = 0;
  private panY: number = 0;
  private pinching: boolean;
  private pinchDistance: number;
  private previousScreenX: number;
  private previousScreenY: number;
  private transformOriginX: number;
  private transformOriginY: number;
  private zoom: number = 1;

  componentDidLoad() {
    this.activate.emit(this.el);
  }

  disconnectedCallback() {
    this.imageEl?.removeEventListener("load", this.onLoad);
    this.imageEl?.removeEventListener("error", this.onError);
  }

  @Watch("file")
  watchFile() {
    this.error = false;
    this.loading = true;
  }

  /**
   * Get the current zoom.
   * @returns
   */
  @Method()
  async getZoom() {
    return this.zoom;
  }

  /**
   * Resets the zoom.
   * @returns
   */
  @Method()
  async resetZoom() {
    return this.updateZoomAndPan(1);
  }

  private onError = () => {
    this.error = true;
    this.loading = false;
  };

  private onLoad = () => {
    this.error = false;
    this.loading = false;
  };

  private onDblClick = (event: MouseEvent) => {
    this.clickToZoom(event);
  };

  private onWheel = (event: WheelEvent) => {
    event.preventDefault();

    const zoom = Math.min(
      Math.max(1, this.zoom + (-1 * event.deltaY) / 100),
      this.maxZoom
    );

    if (zoom === this.zoom) {
      return;
    }

    const centerX = event.offsetX;
    const centerY = event.offsetY;

    this.updateTransformOrigin(centerX, centerY);

    this.updateZoomAndPan(zoom, 0, 0);
  };

  private onPointerDown = (event: PointerEvent) => {
    this.startPan(event);
  };

  private onPointerMove = (event: PointerEvent) => {
    this.pan(event);
  };

  private onPointerUp = () => {
    this.endPan();
  };

  private onTouchStart = (event: TouchEvent) => {
    event.preventDefault();

    if (event.touches.length === 2) {
      this.startPinchToZoom(event);
    }
  };

  private onTouchMove = (event: TouchEvent) => {
    event.preventDefault();

    if (this.pinching) {
      this.pinchToZoom(event);
    }
  };

  private onTouchEnd = (event: TouchEvent) => {
    event.preventDefault();

    if (this.pinching) {
      this.endPinchToZoom();
    }
  };

  private startPinchToZoom = (event: TouchEvent) => {
    if (!Boolean(this.imageEl)) {
      return;
    }

    this.pinchDistance = this.getPinchDistance(event);
    this.pinching = true;
  };

  private pinchToZoom = (event: TouchEvent) => {
    const distance = this.getPinchDistance(event) - this.pinchDistance;

    const zoom = Math.min(
      Math.max(1, this.zoom + distance / 100),
      this.maxZoom
    );

    if (this.zoom === zoom) {
      return;
    }

    this.pinchDistance = this.getPinchDistance(event);
    this.updateZoomAndPan(zoom);
  };

  private endPinchToZoom = () => {
    this.pinching = false;

    if (Math.abs(this.zoom - 1) < 0.2) {
      this.zoom = 1;
      this.imageEl.style.transform = "";
    }
  };

  private getPinchDistance = (event: TouchEvent) => {
    return Math.hypot(
      event.touches[0].pageX - event.touches[1].pageX,
      event.touches[0].pageY - event.touches[1].pageY
    );
  };

  private clickToZoom = (event: MouseEvent) => {
    const supportsMultiTouch = navigator.maxTouchPoints > 1;

    if (supportsMultiTouch) {
      return;
    }

    if (this.zoom === 1) {
      const centerX = event.pageX - this.el.getBoundingClientRect().x;
      const centerY = event.pageY - this.el.getBoundingClientRect().y;

      this.updateTransformOrigin(centerX, centerY);
      this.updateZoomAndPan(2);
    } else {
      this.updateZoomAndPan(1);
    }
  };

  private updateZoomAndPan = (zoom?: number, panX?: number, panY?: number) => {
    const newZoom = zoom === undefined ? this.zoom : zoom;
    const zoomDiff = newZoom - this.zoom;

    const newPanX =
      panX === undefined ? this.panX + this.panX * zoomDiff : panX;
    const newPanY =
      panX === undefined ? this.panY + this.panY * zoomDiff : panY;

    const previousPanX = this.panX;
    const previousPanY = this.panY;

    this.zoom = newZoom;
    this.panX = newPanX;
    this.panY = newPanY;

    const parentRect = (
      this.el.parentElement || this.el
    ).getBoundingClientRect();

    const imageRect = this.imageEl.getBoundingClientRect();

    const outOfBoundsX =
      (imageRect.right < parentRect.right && newPanX < previousPanX) ||
      (imageRect.left > parentRect.left && newPanX > previousPanX);

    const outOfBoundsY =
      (imageRect.bottom < parentRect.bottom && newPanY < previousPanY) ||
      (imageRect.top > parentRect.top && newPanY > previousPanY);

    if (outOfBoundsX) {
      this.panX = previousPanX;
    }

    if (outOfBoundsY) {
      this.panY = previousPanY;
    }

    if (this.zoom === 1) {
      this.panX = 0;
      this.panY = 0;
    }

    this.imageEl.style.transform = `matrix(${this.zoom}, 0, 0, ${this.zoom}, ${this.panX}, ${this.panY})`;
  };

  private updateTransformOrigin = (x: number, y: number) => {
    this.transformOriginX = x;
    this.transformOriginY = y;

    this.imageEl.style.transformOrigin = `${this.transformOriginX}px ${this.transformOriginY}px`;
  };

  private startPan = (event: PointerEvent) => {
    this.panning = true;

    this.previousScreenX = event.screenX;
    this.previousScreenY = event.screenY;
  };

  private pan = (event: PointerEvent) => {
    const previousScreenX = this.previousScreenX || 0;
    const previousScreenY = this.previousScreenY || 0;

    this.previousScreenX = event.screenX;
    this.previousScreenY = event.screenY;

    if (!this.panning || this.pinching) {
      return;
    }

    event.preventDefault();

    const panX = this.panX + event.screenX - previousScreenX;
    const panY = this.panY + event.screenY - previousScreenY;

    this.updateZoomAndPan(this.zoom, panX, panY);
  };

  private endPan = () => {
    this.panning = false;
  };

  private onImageElementUpdate = (el: HTMLImageElement) => {
    this.imageEl?.removeEventListener("load", this.onLoad);
    this.imageEl?.removeEventListener("error", this.onError);

    this.imageEl = el;

    if (this.imageEl) {
      this.imageEl.addEventListener("load", this.onLoad);
      this.imageEl.addEventListener("error", this.onError);
    }
  };

  render() {
    return (
      <Host
        onDblClick={this.onDblClick}
        onWheel={this.onWheel}
        onPointerDown={this.onPointerDown}
        onPointerMove={this.onPointerMove}
        onPointerUp={this.onPointerUp}
        onTouchStart={this.onTouchStart}
        onTouchMove={this.onTouchMove}
        onTouchEnd={this.onTouchEnd}
      >
        {this.error && (
          <swirl-inline-error
            class="file-viewer-image__error"
            message={this.errorMessage}
          ></swirl-inline-error>
        )}
        <figure class="file-viewer-image">
          <img
            alt={this.description}
            class="file-viewer-image__image"
            ref={this.onImageElementUpdate}
            src={this.file}
          />
          {this.loading && (
            <div class="file-viewer-image__spinner">
              <swirl-spinner></swirl-spinner>
            </div>
          )}
        </figure>
      </Host>
    );
  }
}
