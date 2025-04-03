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
  - [Dialogs](#dialogs)
  - [Modals](#modals)
  - [Toasts](#toasts)
  - [Downloads](#download)
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

**Returns** `Promise<string[]>`

**Example**

```js
import { getAvailableLangs } from "@getflip/bridge";

const availableLanguages = await getAvailableLangs(); // e.g. ['de', 'en', 'fr', …]
```

#### `getLang`

Get the current language of the host app.

**Returns** `Promise<string>`

**Example**

```js
import { getLang } from "@getflip/bridge";

const currentLanguage = await getLang(); // e.g. 'en'
```

### Navigation

#### `navigate`

Navigate to a specific route.

**Param** `string`

**Returns** `Promise<boolean>`

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
Promise<{
  activeTheme: "light" | "dark";
  preferredTheme: "light" | "dark" | undefined;
}>
```

**Example**

```js
import { getTheme } from "@getflip/bridge";

const theme = await getTheme();
```

#### `setTheme`

Set the theme. Pass `undefined` to reset to the user's system theme.

**Param** `"light" | "dark" | undefined`

**Returns** `Promise<"light" | "dark" | undefined>`

**Example**

```js
import { setTheme } from "@getflip/bridge";

const newTheme = await setTheme("dark");
```

### Dialogs

#### `createDialog`

Creates a modal dialog rendered by the host app.

**Param**

```js
{
  hideLabel?: boolean;
  id: string;
  intent?: 'primary' | 'critical';
  label: string;
  text: string;
  primaryAction?: {
    label: string;
  };
  secondaryAction?: {
    label: string;
  };
}
```

**Returns**

```js
Promise<{
  id: string;
  open: () => Promise<boolean>;
  close: () => Promise<boolean>;
  destroy: () => Promise<boolean>;
}>
```

**Example**

```js
import { createDialog } from "@getflip/bridge";

const dialog = await createDialog({
  id: "my-dialog",
  label: "My Dialog",
  text: "Lorem ipsum",
  primaryAction: {
    label: "Close",
  },
});

await dialog.open();
```

#### `openDialog`

Opens a dialog.

**Param**

```js
{
  id: string; // the dialog id
}
```

**Returns** `Promise<boolean>`

**Example**

```js
import { createDialog, openDialog } from "@getflip/bridge";

await createDialog({
  id: "my-dialog",
  label: "My Dialog",
  text: "Lorem ipsum",
});

await openDialog({ id: "my-dialog" });
```

#### `closeDialog`

Closes a dialog.

**Param**

```js
{
  id: string; // the dialog id
}
```

**Returns** `Promise<boolean>`

**Example**

```js
import { closeDialog } from "@getflip/bridge";

await closeDialog({ id: "my-dialog" });
```

#### `destroyDialog`

Destroys a dialog, removing it from the DOM.

**Param**

```js
{
  id: string; // the dialog id
}
```

**Returns** `Promise<boolean>`

**Example**

```js
import { destroyDialog } from "@getflip/bridge";

await destroyDialog({ id: "my-dialog" });
```

### Modals

#### `createModal`

Creates a modal rendered by the host app. The modal will show the passed URL as
an iFrame.

**Param**

```js
{
  id: string;
  label: string;
  primaryAction?: {
    label: string;
  };
  secondaryAction?: {
    label: string;
  };
  url: string;
}
```

**Returns**

```js
Promise<{
  id: string;
  open: () => Promise<boolean>;
  close: () => Promise<boolean>;
  destroy: () => Promise<boolean>;
}>
```

**Example**

```js
import { createModal } from "@getflip/bridge";

const modal = await createModal({
  id: "my-moadl",
  label: "My Modal",
  primaryAction: {
    label: "Close",
  },
  url: "https://google.com",
});

await modal.open();
```

#### `openModal`

Opens a modal.

**Param**

```js
{
  id: string; // the modal id
}
```

**Returns** `Promise<boolean>`

**Example**

```js
import { createModal, openModal } from "@getflip/bridge";

await createModal({
  id: "my-modal",
  label: "My Modal",
  url: "https://google.com",
});

await openModal({ id: "my-modal" });
```

#### `closeModal`

Closes a modal.

**Param**

```js
{
  id: string; // the modal id
}
```

**Returns** `Promise<boolean>`

**Example**

```js
import { closeModal } from "@getflip/bridge";

await closeModal({ id: "my-modal" });
```

#### `destroyModal`

Destroys a modal, removing it from the DOM.

**Param**

```js
{
  id: string; // the modal id
}
```

**Returns** `Promise<boolean>`

**Example**

```js
import { destroyModal } from "@getflip/bridge";

await destroyModal({ id: "my-modal" });
```

### Toasts

#### `showToast`

Shows a toast by the host app.

**Param**

```js
{
  text: string;
  duration?: number;
  icon?: string;
  intent?: SwirlToastIntent;
}
```

**Returns** `Promise<boolean>`

**Example**

```js
import { showToast } from "@getflip/bridge";

await showToast({
  text: "My toast",
  duration: 5000,
  icon: "icon",
  intent: "success",
});
```

### Downloads

#### `download`

Downloads a file via the host app.

**Param**

```js
{
  fileName: string; // filename
  fileType: string; // file type
  url?: string; // optional file URL
  dataUrl?: string; // optional base64 encoded file data
}
```

**Returns** `Promise<boolean>`

**Example**

```js
import { download } from "@getflip/bridge";

await download({
  fileName: "my-file.txt",
  fileType: "text/plain",
  url: "https://example.com/my-file.txt",
});
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

### `NAVIGATION_END`

Fires when the application successfully navigated to a different route.

**Event**

```js
{
  data: {
    route: string; // e.g. '/notifications'
  }
  type: BridgeEventType.NAVIGATION_END;
}
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

### `PRIMARY_ACTION_CLICK`

Fires when the primary action button of a dialog or modal is clicked.

**Event**

```js
{
  data: {
    parentId: string; // id of the action's dialog or modal
  }
  type: BridgeEventType.PRIMARY_ACTION_CLICK;
}
```

### `SECONDARY_ACTION_CLICK`

Fires when the secondary action button of a dialog or modal is clicked.

**Event**

```js
{
  data: {
    parentId: string; // id of the action's dialog or modal
  }
  type: BridgeEventType.SECONDARY_ACTION_CLICK;
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

### `TITLE_CHANGE`

Fires when the HTML title tag value of the app changes.

**Event**

```js
{
  data: {
    title: string;
  }
  type: BridgeEventType.TITLE_CHANGE;
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
