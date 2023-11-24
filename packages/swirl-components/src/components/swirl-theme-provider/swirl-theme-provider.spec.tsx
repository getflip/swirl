import { newSpecPage } from "@stencil/core/testing";

import { SwirlThemeProvider } from "./swirl-theme-provider";

describe("swirl-theme-provider", () => {
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
      components: [SwirlThemeProvider],
      html: `<swirl-theme-provider>Content</swirl-theme-provider>`,
    });

    expect(page.root).toEqualHtml(`
      <swirl-theme-provider>Content</swirl-theme-provider>
    `);
  });

  it("detects changes to the OS theme setting", async () => {
    const page = await newSpecPage({
      components: [SwirlThemeProvider],
      html: `<swirl-theme-provider></swirl-theme-provider>`,
    });

    expect(await page.root.getActiveOSTheme()).toBe("dark");
  });

  it("overrides the os theme with a preferred user theme", async () => {
    const page = await newSpecPage({
      components: [SwirlThemeProvider],
      html: `<swirl-theme-provider></swirl-theme-provider>`,
    });

    expect(await page.root.getActiveOSTheme()).toBe("dark");
    expect(await page.root.getPreferredOSTheme()).toBeNull();

    await page.root.setPreferredOSTheme("light");

    expect(await page.root.getActiveOSTheme()).toBe("light");
    expect(await page.root.getPreferredOSTheme()).toBe("light");

    await page.root.resetPreferredOSTheme();

    expect(await page.root.getActiveOSTheme()).toBe("dark");
    expect(await page.root.getPreferredOSTheme()).toBeNull();
  });

  it("adds custom tenant color properties", async () => {
    const page = await newSpecPage({
      components: [SwirlThemeProvider],
      html: `<swirl-theme-provider></swirl-theme-provider>`,
    });

    page.root.config = {
      themes: {
        dark: {
          favicon: {
            id: "d3458010-97c6-40a7-896d-804ab6c33496",
            link: "https://master.flip-app.dev/media/themes/d3458010-97c6-40a7-896d-804ab6c33496",
            file_name: "dark-favIcon.png",
          },
          company_icon: {
            id: "6d1c1da4-fa4b-4d77-b44d-b1fa58ed6337",
            link: "https://master.flip-app.dev/media/themes/6d1c1da4-fa4b-4d77-b44d-b1fa58ed6337",
            file_name: "dark-companyIcon.png",
          },
          company_logo: {
            id: "618f411b-eaad-4c06-8834-54fce38fcbad",
            link: "https://master.flip-app.dev/media/themes/618f411b-eaad-4c06-8834-54fce38fcbad",
            file_name: "dark-companyLogo.png",
          },
          design_tokens: [
            {
              id: "text-highlight",
              color: {
                r: 255,
                g: 0,
                b: 0,
                a: 255,
              },
            },
          ],
        },
        light: {
          favicon: {
            id: "49ab1bb9-17d9-45c0-87b4-2247bb8c3648",
            link: "https://master.flip-app.dev/media/themes/49ab1bb9-17d9-45c0-87b4-2247bb8c3648",
            file_name: "light-favIcon.png",
          },
          company_icon: {
            id: "0eaddd17-3468-4243-bdd8-6fae1222e032",
            link: "https://master.flip-app.dev/media/themes/0eaddd17-3468-4243-bdd8-6fae1222e032",
            file_name: "light-companyIcon.png",
          },
          company_logo: {
            id: "b39cb0c9-9097-48c8-900b-6e24686aac5e",
            link: "https://master.flip-app.dev/media/themes/b39cb0c9-9097-48c8-900b-6e24686aac5e",
            file_name: "light-companyLogo.png",
          },
          design_tokens: [
            {
              id: "text-highlight",
              color: {
                r: 0,
                g: 255,
                b: 0,
                a: 255,
              },
            },
          ],
        },
      },
    };

    await page.waitForChanges();

    expect(
      page.doc.documentElement.style.getPropertyValue("--s-text-highlight")
    ).toBe("rgba(255, 0, 0, 255)");
  });
});
