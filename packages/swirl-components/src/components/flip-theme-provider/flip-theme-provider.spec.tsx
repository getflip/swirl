import { newSpecPage } from "@stencil/core/testing";

import { FlipThemeProvider } from "./flip-theme-provider";

describe("flip-theme-provider", () => {
  beforeAll(() => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: jest.fn().mockImplementation(() => ({
        matches: true,
        addEventListener: jest.fn(),
      })),
    });
  });

  it("renders its children", async () => {
    const page = await newSpecPage({
      components: [FlipThemeProvider],
      html: `<flip-theme-provider>Content</flip-theme-provider>`,
    });

    expect(page.root).toEqualHtml(`
      <flip-theme-provider>Content</flip-theme-provider>
    `);
  });

  it("detects changes to the OS theme setting", async () => {
    const page = await newSpecPage({
      components: [FlipThemeProvider],
      html: `<flip-theme-provider></flip-theme-provider>`,
    });

    expect(await page.root.getActiveTheme()).toBe("dark");
  });

  it("overrides the os theme with a preferred user theme", async () => {
    const page = await newSpecPage({
      components: [FlipThemeProvider],
      html: `<flip-theme-provider></flip-theme-provider>`,
    });

    expect(await page.root.getActiveTheme()).toBe("dark");
    expect(await page.root.getPreferredTheme()).toBeNull();

    await page.root.setPreferredTheme("light");

    expect(await page.root.getActiveTheme()).toBe("light");
    expect(await page.root.getPreferredTheme()).toBe("light");

    await page.root.resetPreferredTheme();

    expect(await page.root.getActiveTheme()).toBe("dark");
    expect(await page.root.getPreferredTheme()).toBeNull();
  });

  it("adds custom tenant color properties", async () => {
    const page = await newSpecPage({
      components: [FlipThemeProvider],
      html: `<flip-theme-provider></flip-theme-provider>`,
    });

    page.root.config = {
      tenantColors: {
        primary: "red",
        primaryContrast: "blue",
        secondary: "green",
        secondaryContrast: "orange",
        text: "purple",
      },
    };

    await page.waitForChanges();

    expect(
      page.doc.documentElement.style.getPropertyValue(
        "--s-action-primary-default"
      )
    ).toBe("red");

    expect(
      page.doc.documentElement.style.getPropertyValue(
        "--s-surface-highlight-default"
      )
    ).toBe("green");

    expect(
      page.doc.documentElement.style.getPropertyValue("--s-text-highlight")
    ).toBe("purple");
  });
});
