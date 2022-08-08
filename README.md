# Swirl

> Flips’s design system to help us work together to build a great experience for all of our customers.



| Status | Owner          | Help                                                     |
| ------ |----------------|----------------------------------------------------------|
| Active | @getflip/swirl | [New issue](https://github.com/getflip/swirl/issues/new?assignees=&labels=bug&template=ISSUE.md) |

## About this repo

The Flip/swirl repository is a monorepo made up of NPM packages and websites.

```sh
swirl/
├── swirl-tokens                # Design tokens for Swirl
```

## Commands

### Install dependencies and build workspaces

```sh
yarn && yarn build
```

### Run a command

**One workspace**

Run commands from a selected workspace using [`turbo run <command> --filter=<workspace>...`](https://turborepo.org/docs/core-concepts/filtering) flag.

**All workspaces**

Run commands across all workspaces. This uses [`turbo run <command>`](https://turborepo.org/docs/reference/command-line-reference#turbo-run-task).

| Command           | Runs                                                                                                                 |
| ----------------- | -------------------------------------------------------------------------------------------------------------------- |
| `yarn changeset`  | Adds a new changelog entry |
| `yarn lint`       | Lints all workspaces                                                                                                 |
| `yarn test`       | Tests all workspaces                                                                                                 |
| `yarn type-check` | Build types and check for type errors                                                                                |
| `yarn clean`      | Remove generated files                                                                                               |
| `yarn format`     | Format files with prettier                                                                                           |

## Licenses

Source code is under a custom license based on MIT. The license restricts Swirl usage to applications that integrate or interoperate with Flip software or services, with additional restrictions for external, stand-alone applications.
