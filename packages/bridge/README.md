# Flip Bridge

The Flip Bridge handles communication between your embeddable apps and the Flip
App or Flip Admin Console.

**Contents**

- [Installation](#installation)
- [Usage](#usage)
  - [Internationalization](#internationalization)
  - [Navigation](#navigation)
  - [Theming](#theming)
- [Development](#development)

## Installation

```sh
npm install --save @getflip/bridge
# or
yarn add @getflip/bridge
```

## Usage

The library exposes a set of functions and listeners you can use to communicate
with the Flip App and Flip Admin Console (host app for short).

**Before using the provided functions, you have to call the `initFlipBridge`
function to set up the Flip Bridge.**

```js
import { initFlipBridge } from "@getflip/bridge";

initFlipBridge({
  debug: true,
  hostAppOrigin: "http://localhost:4200", // has to be the origin of the targetted host app
});
```

### Internationalization

#### `getAvailableLangs`

Get all available languages of the host app.

**Returns** `string[]`

**Example**

```js
import { getAvailableLangs } from "@getflip/bridge";

const availableLanguages = await getAvailableLangs(); // e.g. ['de', 'en', 'fr', …]
```

#### `getLang`

Get the current language of the host app.

**Returns** `string`

**Example**

```js
import { getLang } from "@getflip/bridge";

const currentLanguage = await getLang(); // e.g. 'en'
```

### Navigation

#### `navigate`

Navigate to a specific route.

**Returns** `boolean`

**Example**

```js
import { navigate } from "@getflip/bridge";

await navigate("/my-app/settings");
```

### Theming

#### `getTheme`

Get the current theme.

**Returns** `'light' | 'dark'`

**Example**

```js
import { getTheme } from "@getflip/bridge";

const currentTheme = await getTheme(); // e.g. 'light'
```

## Development

Start the compiler in watch mode for local development:

```
yarn
yarn dev
```

Production builds and releases are managed via our Github workflows. Make sure
to create a Changeset using `yarn changeset` if you want to trigger a new
release.
