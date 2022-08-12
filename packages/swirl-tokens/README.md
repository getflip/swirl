# Swirl Tokens

When using design systems colors, you would usually start with a color palette
consisting of values from 100 to 900, like green600. These values are static and
are not themable. In Swirl, we intentionally skip this core layer and instead
work with the semantic color tokens.

Semantic color tokens represent not just a color value but also a semantic role
it's used for. By assigning semantic roles to colors, we achieve predictable
theming and dark mode support.

We use generic names for the color tokens, which means that color names don't
rely on our component inventory. So you can build your custom components using
the same color tokens, and they will still automatically support theming and
dark mode.

## Installation

```bash
npm install @getflip/swirl-tokens
```

## Usage

#### JSON

Accessing all of the available token groups

- [List of JSON tokens](https://unpkg.com/browse/@getflip/swirl-tokens/dist/styles.json)

```js
import styles from "@getflip/swirl-tokens/dist/styles.json";

console.log("background-default", styles["background-default"]);
```

#### CSS

Importing all of the css variables. CSS variables are prefixed with `--s`

- [List of CSS-Custom-Properties](https://unpkg.com/browse/@getflip/swirl-tokens/dist/css/styles.custom-properties.css)

```css
@import "@getflip/swirl-tokens/dist/css/styles.custom-properties.css";

div {
  background-color: var(--s-background-default);
}
```

#### SCSS

- [List of SCSS variables](https://unpkg.com/browse/@getflip/swirl-tokens/dist/scss/styles.scss)

#### LESS

- [List of Less variables](https://unpkg.com/browse/@getflip/swirl-tokens/dist/less/styles.less)

#### SASS

- [List of SASS Variables](https://unpkg.com/browse/@getflip/swirl-tokens/dist/sass/styles.sass)
