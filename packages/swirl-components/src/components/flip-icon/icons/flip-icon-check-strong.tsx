// DO NOT EDIT. THIS FILE GETS GENERATED VIA "yarn generate".

import { Component, Fragment, h, Prop } from "@stencil/core";
import { FlipIconSize } from "../flip-icon.types";

@Component({
  shadow: true,
  styleUrl: "../flip-icon.css",
  tag: "flip-icon-check-strong",
})
export class FlipIconCheckStrong {
  @Prop() size: FlipIconSize = 24;

  render() {
    return (
      <svg
        class="flip-icon"
        fill="none"
        height={this.size}
        part="icon"
        viewBox={`0 0 ${this.size} ${this.size}`}
        width={this.size}
        xmlns="http://www.w3.org/2000/svg"
      >
        {this.size === 16 && (
          <Fragment>
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M13.0404 4.29289C13.431 4.68342 13.431 5.31658 13.0404 5.70711L6.7071 12.0404C6.31657 12.431 5.68341 12.431 5.29288 12.0404L2.95955 9.70711C2.56903 9.31658 2.56903 8.68342 2.95955 8.29289C3.35007 7.90237 3.98324 7.90237 4.37376 8.29289L5.99999 9.91912L11.6262 4.29289C12.0167 3.90237 12.6499 3.90237 13.0404 4.29289Z"
              fill="currentColor"
            />
          </Fragment>
        )}
        {this.size === 24 && (
          <Fragment>
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M19.5607 6.43934C20.1464 7.02513 20.1464 7.97487 19.5607 8.56066L10.0607 18.0607C9.47487 18.6464 8.52513 18.6464 7.93934 18.0607L4.43934 14.5607C3.85355 13.9749 3.85355 13.0251 4.43934 12.4393C5.02513 11.8536 5.97487 11.8536 6.56066 12.4393L9 14.8787L17.4393 6.43934C18.0251 5.85355 18.9749 5.85355 19.5607 6.43934Z"
              fill="currentColor"
            />
          </Fragment>
        )}
        {this.size === 28 && (
          <Fragment>
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M22.8208 7.51256C23.5042 8.19598 23.5042 9.30402 22.8208 9.98744L11.7374 21.0708C11.054 21.7542 9.94597 21.7542 9.26255 21.0708L5.17922 16.9874C4.4958 16.304 4.4958 15.196 5.17922 14.5126C5.86264 13.8291 6.97068 13.8291 7.65409 14.5126L10.5 17.3585L20.3459 7.51256C21.0293 6.82915 22.1373 6.82915 22.8208 7.51256Z"
              fill="currentColor"
            />
          </Fragment>
        )}
      </svg>
    );
  }
}
