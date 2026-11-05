---
name: autonomous-ticket-workflow
description:
  End-to-end workflow for working a Linear ticket on Swirl autonomously — ticket
  context, implementation, specs, docs, generated files, lint, changeset and
  pull request. Use when running unattended on a ticket, typically a Cursor
  Cloud agent started from the Linear integration, or whenever a ticket has to
  be taken from branch to review-ready without asking the user.
---

# Autonomous ticket workflow

Follow this when running unattended on a ticket — typically a Cursor Cloud agent
started from the Linear integration. Work the steps in order. Lint and the
changeset are never skipped. The rest are conditional, so name any step you skip
and why. You cannot ask the user mid-run, so decide, proceed, and report every
judgement call in the final summary.

## Environment

The Cursor Cloud environment is configured in the Cursor dashboard. Its install
step runs `yarn` and `yarn build --filter=@getflip/swirl-tokens`. If
`packages/swirl-tokens/dist/` is missing, run that build yourself before any
Stencil command. `swirl-components` needs no secrets. `swirl-docs` tests need
GitLab secrets — skip them and say so.

## Before implementation

### 1. Read the ticket

Fetch the Linear issue via the Linear MCP server: description, comments, and
attachments. If the issue has a parent, read the parent too — acceptance
criteria often live there.

Tickets handed over from a Flip app name the component, the bug, and the
consuming call site. Reproduce that call site in a spec.

### 2. Plan, then implement

Write an implementation plan before editing. Follow
[AGENTS.md](../../../AGENTS.md) and
[packages/swirl-components/AGENTS.md](../../../packages/swirl-components/AGENTS.md).

If the ticket can only be solved with a breaking change, do not make it.
Implement a non-breaking alternative (e.g. a new optional prop) or stop, and
explain in the summary.

## After implementation

### 3. Specs

New props and features get specs, bug fixes get a regression spec. Run the
touched component's specs first, then the whole suite, from
`packages/swirl-components/`:

```bash
npx stencil test --spec -- src/components/<tag>
yarn test
```

### 4. Docs, stories, generated files

Update the component's `.mdx` and `.stories.ts` for the change. If the API
changed, regenerate and commit the API files as
[packages/swirl-components/AGENTS.md](../../../packages/swirl-components/AGENTS.md)
describes. Revert changed Dart files unless the ticket is about icons or tokens.

### 5. Lint and format

From the repository root:

```bash
yarn turbo run lint --filter=@getflip/swirl-components
yarn prettier --write <changed files>
```

### 6. Changeset

Rules in [AGENTS.md](../../../AGENTS.md). Check before you write — the branch
may already have one:

```bash
git diff --name-only origin/main -- .changeset/
```

One covering the ticket exists → keep it, note it in the summary. Otherwise add
exactly one.

### 7. Pull request

Fill in [the PR template](../../../.github/pull_request_template.md): the Linear
ticket, and the Figma link if the ticket has one. The Storybook preview URL is
commented on the PR by the deploy workflow — link it once it appears.

## Final summary

Report, in this order: the ticket, the PR link, specs run with results, lint
result, the changeset and whether you wrote it or it was already there, skipped
steps with reasons, and the review checklist items a human still has to check:
screen reader and keyboard behaviour, Light and Dark themes, and the Storybook
accessibility panel on the preview.
