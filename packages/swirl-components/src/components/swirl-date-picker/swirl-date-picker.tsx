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
import { getISODateString, removeTimezoneOffset } from "../../utils";

import "wc-datepicker";
import classnames from "classnames";

// Extend Locale interface with getWeekInfo data
// (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Locale/getWeekInfo)
interface WeekInfo {
  firstDay: number;
}

interface LocaleWithWeekInfo extends Intl.Locale {
  getWeekInfo?(): WeekInfo;
  weekInfo?: WeekInfo;
}

@Component({
  shadow: true,
  styleUrl: "swirl-date-picker.css",
  tag: "swirl-date-picker",
})
export class SwirlDatePicker {
  @Element() el: HTMLElement;

  @Prop() disableDate?: (date: Date) => boolean = () => false;
  @Prop({ mutable: true }) firstDayOfWeek?: number = 0;
  @Prop() fixedMaxWidth: boolean = true;
  @Prop() labels?: WCDatepickerLabels;
  @Prop() locale?: string = "en-US";
  @Prop() range?: boolean;
  @Prop() startDate?: Date;
  @Prop({ mutable: true }) value?: Date | Date[];

  @Event({ bubbles: false }) valueChange: EventEmitter<Date | Date[]>;

  componentWillLoad() {
    if (!this.firstDayOfWeek) {
      const locale = new Intl.Locale(this.locale) as LocaleWithWeekInfo;

      this.firstDayOfWeek =
        "getWeekInfo" in locale
          ? locale.getWeekInfo().firstDay
          : locale.weekInfo?.firstDay ?? 0;
    }
  }

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
      this.startDate instanceof Date
        ? getISODateString(this.startDate)
        : undefined;

    const className = classnames({
      "date-picker--fixed-max-width": this.fixedMaxWidth,
    });

    return (
      <Host onClick={this.onClick}>
        <wc-datepicker
          class={className}
          elementClassName="date-picker"
          disableDate={this.disableDate}
          firstDayOfWeek={this.firstDayOfWeek}
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
