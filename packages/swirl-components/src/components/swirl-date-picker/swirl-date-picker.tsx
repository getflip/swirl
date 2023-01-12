import {
  Component,
  Event,
  EventEmitter,
  h,
  Host,
  Prop,
  Watch,
} from "@stencil/core";
import AirDatepicker, {
  AirDatepickerDate,
  AirDatepickerLocale,
} from "air-datepicker";

import localeEn from "air-datepicker/locale/en";

@Component({
  shadow: true,
  styleUrl: "swirl-date-picker.css",
  tag: "swirl-date-picker",
})
export class SwirlDatePicker {
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

    let selectedDates: AirDatepickerDate[];

    if (this.value === undefined) {
      selectedDates = undefined;
    } else if (Array.isArray(this.value)) {
      selectedDates = this.value;
    } else {
      selectedDates = [this.value];
    }

    this.picker = new AirDatepicker(this.containerEl, {
      classes: "date-picker",
      inline: true,
      locale: this.locale,
      maxDate: this.maxDate,
      minDate: this.minDate,
      minView: "days",
      nextHtml: "<swirl-icon-chevron-right></swirl-icon-chevron-right>",
      onSelect: ({ date }) => {
        this.valueChange.emit(date);
      },
      prevHtml: "<swirl-icon-chevron-left></swirl-icon-chevron-left>",
      range: this.range,
      selectedDates,
      startDate: this.startDate,
      toggleSelected: !this.range,
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
