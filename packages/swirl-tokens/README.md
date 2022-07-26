# Swirl Tokens

When using design systems colors, you would usually start with a color palette consisting of values from 100 to 900, like green600. These values are static and are not themable. In Swirl, we intentionally skip this core layer and instead work with the semantic color tokens.

Semantic color tokens represent not just a color value but also a semantic role it's used for. By assigning semantic roles to colors, we achieve predictable theming and dark mode support.

We use generic names for the color tokens, which means that color names don't rely on our component inventory. So you can build your custom components using the same color tokens, and they will still automatically support theming and dark mode.

## Installation

```bash
npm install @getflip/swirl-tokens
```

## Usage

#### Javascript

Accessing all of the available token groups

```js
import { tokens } from "@getflip/swirl-tokens";

console.log(tokens.colors);
```

#### CSS

Importing all of the css variables. CSS variables are prefixed with `--s`

```js
import '@getflip/swirl-tokens/css/styles.css';

div {
  background: var(--s-background/default);
}
```

#### JSON

Accessing a specific token group file via the dist folder

```js
const spacing = require("@getflip/swirl-tokens/json/spacing.json");
```
