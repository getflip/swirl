# Swirl

> Flip’s design system to help us work together to build a great experience for
> all of our customers.

| Status | Owner          | Help                                                                                             |
| ------ | -------------- | ------------------------------------------------------------------------------------------------ |
| Active | @getflip/swirl | [New issue](https://github.com/getflip/swirl/issues/new?assignees=&labels=bug&template=ISSUE.md) |

- [Swirl](#swirl)
  - [About this repo](#about-this-repo)
    - [swirl-icons](#swirl-icons)
    - [swirl-tokens](#swirl-tokens)
    - [swirl-components](#swirl-components)
    - [swirl-components-angular](#swirl-components-angular)
    - [swirl-components-react](#swirl-components-react)
    - [bridge](#bridge)
    - [error-code-generator](#error-code-generator)
    - [swirl-docs](#swirl-docs)
  - [Getting started](#getting-started)
    - [Install dependencies and build workspaces](#install-dependencies-and-build-workspaces)
    - [Run a command using Turbo](#run-a-command-using-turbo)
    - [Run commands directly](#run-commands-directly)
  - [Licenses](#licenses)

## About this repo

The Flip/swirl repository is a monorepo made up of NPM packages and websites.

```sh
packages/
├── swirl-icons                 # The Swirl icon set
├── swirl-tokens                # Collection of Swirl design tokens
├── swirl-components            # The Swirl Web Component library
├── swirl-components-angular    # Angular component wrappers of our Web Components
├── swirl-components-react      # React component wrappers of our Web Components
├── bridge                      # JS bridge to enable communication between our Web and native apps
├── error-code-generator        # Used to provide consistent error handling across our apps
apps/
├── swirl-docs                  # Documentation website for Swirl and our public APIs (getflip.dev)
```

> [!NOTE]
> Please see the README files inside the package and app directories for more information.

### swirl-icons

The package includes all icons and custom emojis used in our applications. Icons
are provided as plain SVG files and icon fonts, along with corresponding
stylesheets (CSS, Less, SCSS). Icon metadata is compiled in JS and JSON formats.

### swirl-tokens

Most visual attributes of our components are controlled by Swirl design tokens.
These tokens are exported from Figma and compiled into CSS, Less, SCSS, Dart
classes, and Tailwind configurations. JSON representations are also provided for
structured access to the design tokens.

### swirl-components

The swirl-components package includes all reusable Web Components used to build
the UI for our applications. These components are implemented using
[Stencil](https://stenciljs.com/) and compiled into standards-compliant Web
Components. We use [Storybook](https://storybook.js.org/) for developing and
documentation. See [swirl-storybook.flip-app.dev](https://swirl-storybook.flip-app.dev/)

### swirl-components-angular

To make working with our Web Components more convenient, the
swirl-components-angular package provides lightweight Angular wrapper directives
and components. These wrappers are automatically generated from the Web
Components, with manual source code modifications being rare. See
https://stenciljs.com/docs/angular for details.

### swirl-components-react

This package includes lightweight wrapper components to make our Web Components
fully compatible with React. These wrappers are automatically generated from the
Web Components, with manual source code modifications being rare. See
https://stenciljs.com/docs/react for details.

### bridge

In some cases, our apps and app integrations need to communicate with each
other. This applies, for example, when our native mobile app integrates parts of
the Flip Web app via web views or when external integrations are included in
Flip Web via iFrames. The bridge provides methods and events that enable secure
and seamless communication in these scenarios.

### error-code-generator

This package handles mapping server errors from our APIs to appropriate error
messages for users.

### swirl-docs

Our documentation website provides API specs and Swirl-related information. The
website is build using Next.js and Tailwind. API documentation is automatically
generated from our OpenAPI specs.

## Getting started

You need to have [Node.js](https://nodejs.org/en) installed on your machine. We
recommend using [nvm](https://github.com/nvm-sh/nvm) for that. You will also
need to install [yarn](https://classic.yarnpkg.com/en/).

```sh
npm install --global yarn@1
```

### Install dependencies and build workspaces

```sh
yarn && yarn build
```

### Run a command using Turbo

We are using [Turborepo](https://turbo.build/repo/docs) for our monorepo and
workflows. You can run commands for any workspace from the root directory of the
repo:

**One workspace**

Run commands from a selected workspace using
[`turbo run <command> --filter=<workspace>...`](https://turborepo.org/docs/core-concepts/filtering)
flag.

**All workspaces**

Run commands across all workspaces. This uses
[`turbo run <command>`](https://turborepo.org/docs/reference/command-line-reference#turbo-run-task).

| Command          | Runs                              |
| ---------------- | --------------------------------- |
| `yarn dev`       | Start dev environment (Storybook, Next.js website project) |
| `yarn changeset` | Adds a new changelog entry        |
| `yarn lint`      | Lints all workspaces              |
| `yarn test`      | Tests all workspaces              |
| `yarn clean`     | Remove generated files            |
| `yarn format`    | Format all files with prettier    |

### Run commands directly

You can also change to a specific package or app directory and run commands
using `yarn`. E.g.

```sh
cd packages/swirl-components
yarn dev
```

## Licenses

Source code is under a custom license based on MIT. The license restricts Swirl
usage to applications that integrate or interoperate with Flip software or
services, with additional restrictions for external, stand-alone applications.
