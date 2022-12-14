# Flip Bridge

The Flip Bridge handles communication between your embeddable apps and the Flip
App or Flip Admin Console.

**Contents**

- [Installation](#installation)
- [Usage](#usage)
- [Methods](#methods)
  - [Internationalization](#internationalization)
  - [Navigation](#navigation)
  - [Theming](#theming)
- [Events](#events)
- [Error Handling](#error-handling)
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
  hostAppOrigin: "http://localhost:4200", // has to be the origin of the targeted host app
});
```

## Methods

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

**Returns**

```js
{
  activeTheme: "light" | "dark";
  preferredTheme: "light" | "dark" | undefined;
}
```

**Example**

```js
import { getTheme } from "@getflip/bridge";

const theme = await getTheme();
```

## Events

Use the `subscribe` functions to subscribe to events.

```js
import { subscribe, BridgeEventType } from "@getflip/bridge";

const unsubscribe = await subscribe(BridgeEventType.THEME_CHANGE, (event) => {
  console.log(event.data);
});

// …

await unsubscribe();
```

### `LANG_CHANGE`

Fires when the user selected language changes.

**Event**

```js
{
  data: string; // e.g. 'en'
  type: BridgeEventType.LANG_CHANGE;
}
```

### `THEME_CHANGE`

Fires when the user theme changes.

**Event**

```js
{
  data: {
    activeTheme: "light" | "dark";
    preferredTheme: "light" | "dark" | undefined;
  }
  type: BridgeEventType.THEME_CHANGE;
}
```

## Error Handling

All provided functions return promises that throw an error if the execution
failed. The errors have the following format.

```js
{
  code: BridgeErrorCode; // e.g. 'FORBIDDEN_ORIGIN'
}
```

### `FORBIDDEN_ORIGIN`

Thrown when the origin of the requesting app is not allowed by the host app.
Please check if your app is correctly registered in the Flip Partner Dashboard
and the `hostAppOrigin` option is set (see [Usage](#usage)).

### `INVALID_REQUEST`

The host app identified the request as invalid. This typically occurs when the
provided parameters are invalid.

## Development

Start the compiler in watch mode for local development:

```
yarn dev
```

Production builds and releases are managed via our Github workflows. Make sure
to create a Changeset using `yarn changeset` if you want to trigger a new
release.
