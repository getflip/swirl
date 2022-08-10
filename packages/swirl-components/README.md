# Swirl Components

## Install and use components

The Swirl Web Components Library is made up of multiple components which you can import separately. All you need to do is install the @getflip/swirl-components package:

```bash
yarn add @getflip/swirl-components
# or
npm install --save @getflip/swirl-components
```

Then you can import and use the components:

```js
import { defineCustomElements } from "@getflip/swirl-components/loader";

defineCustomElements();
```

## Contributing

### Setup the dev environment

`Node.js v16+`, `Git` and `Yarn v1` must be installed on your machine.

1. **Clone this repository**

```bash
git clone git@github.com:flip-corp/swirl.git
```

The Swirl Web Components Library is located at `packages/swirl-components`.

2. **Install dependencies**

```bash
yarn
```

3. **Get Stencil.js and Storybook up and running**

```bash
cd packages/swirl-components
yarn start
```

Storybook will open in your default browser. Visit http://localhost:6006 if it doesn't.

### Create a new component

tbd.

### Publish changes

tbd.
