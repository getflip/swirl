import { newSpecPage } from "@stencil/core/testing";

import { SwirlButton } from "../swirl-button/swirl-button";
import { SwirlToolbar } from "./swirl-toolbar";

describe("swirl-toolbar", () => {
  it("renders content", async () => {
    const page = await newSpecPage({
      components: [SwirlToolbar],
      html: `
        <swirl-toolbar>
          <swirl-chip label="Remove" pressed="true"></swirl-chip>
          <swirl-button icon="<swirl-icon-add></swirl-icon-add>" label="Add"></swirl-button>
        </swirl-toolbar>
      `,
    });

    expect(page.root).toEqualHtml(`
      <swirl-toolbar>
        <mock:shadow-root>
          <swirl-stack align="center" aria-orientation="horizontal" orientation="horizontal" role="toolbar" spacing="8" wrap="">
            <slot></slot>
          </swirl-stack>
        </mock:shadow-root>
        <swirl-chip label="Remove" pressed="true"></swirl-chip>
        <swirl-button icon="<swirl-icon-add></swirl-icon-add>" label="Add"></swirl-button>
      </swirl-toolbar>
    `);
  });

  it("implements keyboard controls", async () => {
    const page = await newSpecPage({
      components: [SwirlToolbar, SwirlButton],
      html: `
        <swirl-toolbar>
          <swirl-button id="1" label="1"></swirl-button>
          <swirl-button id="2" label="2"></swirl-button>
          <swirl-button id="3" label="3"></swirl-button>
        </swirl-toolbar>
      `,
    });

    const container = page.root.shadowRoot.children[0];

    const button1 = page.root.querySelector<HTMLButtonElement>("#1 button");
    const button2 = page.root.querySelector<HTMLButtonElement>("#2 button");
    const button3 = page.root.querySelector<HTMLButtonElement>("#3 button");

    expect(button1.getAttribute("tabindex")).toBe("0");
    expect(button2.getAttribute("tabindex")).toBe("-1");
    expect(button3.getAttribute("tabindex")).toBe("-1");

    (page.doc as any).activeElement = button1;
    container.dispatchEvent(
      new KeyboardEvent("keydown", { code: "ArrowRight" })
    );

    expect(button1.getAttribute("tabindex")).toBe("-1");
    expect(button2.getAttribute("tabindex")).toBe("0");
    expect(button3.getAttribute("tabindex")).toBe("-1");

    (page.doc as any).activeElement = button2;
    container.dispatchEvent(
      new KeyboardEvent("keydown", { code: "ArrowDown" })
    );

    expect(button1.getAttribute("tabindex")).toBe("-1");
    expect(button2.getAttribute("tabindex")).toBe("-1");
    expect(button3.getAttribute("tabindex")).toBe("0");

    (page.doc as any).activeElement = button3;
    container.dispatchEvent(new KeyboardEvent("keydown", { code: "ArrowUp" }));

    expect(button1.getAttribute("tabindex")).toBe("-1");
    expect(button2.getAttribute("tabindex")).toBe("0");
    expect(button3.getAttribute("tabindex")).toBe("-1");

    (page.doc as any).activeElement = button2;
    container.dispatchEvent(
      new KeyboardEvent("keydown", { code: "ArrowLeft" })
    );

    expect(button1.getAttribute("tabindex")).toBe("0");
    expect(button2.getAttribute("tabindex")).toBe("-1");
    expect(button3.getAttribute("tabindex")).toBe("-1");
  });
});
