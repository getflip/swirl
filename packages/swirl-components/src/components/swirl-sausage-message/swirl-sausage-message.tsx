import { Component, h, Host, Prop } from "@stencil/core";

@Component({
  shadow: true,
  styleUrl: "swirl-sausage-message.css",
  tag: "swirl-sausage-message",
})
export class SwirlSausageMessage {
  @Prop() message: string;
  @Prop() author: string;
  @Prop() self: boolean = false;
  @Prop() dateTime: Date;

  formattedDate: string;

  private formatDate(date: Date): string {
    const formatter = Intl.DateTimeFormat("de-DE", { dateStyle: "short" });
    return formatter.format(new Date(date ?? new Date()));
  }

  private authorEl() {
    if (this.self) {
      return;
    }
    return <p>{this.author}</p>;
  }

  private messageClass() {
    return this.self ? "self" : "received";
  }

  render() {
    return (
      <Host>
        <div class={this.messageClass()}>
          {this.authorEl()}
          {this.message}
          <div class="message-date-time">{this.formatDate(this.dateTime)}</div>
        </div>
      </Host>
    );
  }
}
