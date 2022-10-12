import {
  Component,
  Event,
  EventEmitter,
  h,
  Host,
  Prop,
  Watch,
} from "@stencil/core";
import AirDatepicker, { AirDatepickerLocale } from "air-datepicker";

import localeEn from "air-datepicker/locale/en";

@Component({
  shadow: true,
  styleUrl: "flip-date-picker.css",
  tag: "flip-date-picker",
})
export class FlipDatePicker {
  @Prop() locale?: Partial<AirDatepickerLocale> = localeEn;
  @Prop() maxDate?: Date;
  @Prop() minDate?: Date;
  @Prop() range?: boolean;
  @Prop() startDate?: Date;
  @Prop({ mutable: true }) value?: Date | Date[];

  @Event({ bubbles: false }) valueChange: EventEmitter<Date | Date[]>;

  private containerEl: HTMLDivElement;
  private picker: AirDatepicker<HTMLElement>;

  @Watch("locale")
  @Watch("maxDate")
  @Watch("minDate")
  @Watch("range")
  @Watch("startDate")
  @Watch("value")
  watchProps() {
    this.init();
  }

  componentDidLoad() {
    this.init();
  }

  disconnectedCallback() {
    this.picker?.destroy();
  }

  private init() {
    this.picker?.destroy();

    this.picker = new AirDatepicker(this.containerEl, {
      classes: "date-picker",
      inline: true,
      locale: this.locale,
      maxDate: this.maxDate,
      minDate: this.minDate,
      minView: "days",
      nextHtml: "",
      onSelect: ({ date }) => {
        this.valueChange.emit(date);
      },
      prevHtml: "",
      range: this.range,
      selectedDates:
        this.value === undefined
          ? undefined
          : Array.isArray(this.value)
          ? this.value
          : [this.value],
      startDate: this.startDate,
      view: "days",
    });
  }

  private onClick = (event: MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
  };

  render() {
    return (
      <Host onClick={this.onClick}>
        <div ref={(el) => (this.containerEl = el)}></div>
      </Host>
    );
  }
}
