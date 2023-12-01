import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Prop,
} from "@stencil/core";
import { WcDatepickerCustomEvent } from "wc-datepicker/dist/types/components";
import { WCDatepickerLabels } from "wc-datepicker/dist/types/components/wc-datepicker/wc-datepicker";

import "wc-datepicker";
import { removeTimezoneOffset } from "../../utils";

@Component({
  shadow: true,
  styleUrl: "swirl-date-picker.css",
  tag: "swirl-date-picker",
})
export class SwirlDatePicker {
  @Element() el: HTMLElement;

  @Prop() labels?: WCDatepickerLabels;
  @Prop() locale?: string = "en-US";
  @Prop() range?: boolean;
  @Prop() startDate?: Date;
  @Prop({ mutable: true }) value?: Date | Date[];

  @Event({ bubbles: false }) valueChange: EventEmitter<Date | Date[]>;

  private onClick = (event: MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
  };

  private onSelectDate = (
    event: WcDatepickerCustomEvent<string | string[]>
  ) => {
    if (typeof event.detail === "string") {
      this.valueChange.emit(removeTimezoneOffset(new Date(event.detail)));
    } else {
      this.valueChange.emit(
        event.detail.map((date) => removeTimezoneOffset(new Date(date)))
      );
    }
  };

  render() {
    const startDate =
      this.startDate instanceof Date ? this.startDate.toISOString() : undefined;

    return (
      <Host onClick={this.onClick}>
        <wc-datepicker
          elementClassName="date-picker"
          labels={this.labels}
          locale={this.locale}
          onSelectDate={this.onSelectDate}
          range={this.range}
          startDate={startDate}
          value={this.value}
        ></wc-datepicker>
      </Host>
    );
  }
}
