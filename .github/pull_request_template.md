## Summary

- [Ticket](#)
- [Design](#)
- [Storybook](#)

## Review Checklist

### General

- [ ] [Changeset added](https://github.com/changesets/changesets/blob/main/docs/intro-to-using-changesets.md)
- [ ] The submitted code is organized and formatted according to our [💅 Style Guide](https://swirl-storybook.flip-app.dev/?path=/docs/requirements-style-guide--docs).
  - [ ] The code is formatted with Prettier.
  - [ ] There are no linting errors.

### For new or updated components

https://swirl-storybook.flip-app.dev/?path=/docs/contributions-merge-publish--page

- [ ] The changes do not contain any breaking changes.
- [ ] The changes do not introduce new components that don't belong in the library (e.g. non-reusable components, highly specialized components, components including business logic)
- [ ] The component documentation is updated.
- [ ] The changes meet the [🤖 testing requirements](https://swirl-storybook.flip-app.dev/?path=/docs/requirements-testing--docs).
  - [ ] New features are tested.
  - [ ] In case of bug fixes, regression tests have been added.
  - [ ] All tests are 🟢.
- [ ] The changes meet the [🧏‍♀️ accessibility requirements](https://swirl-storybook.flip-app.dev/?path=/docs/requirements-accessibility--docs).
  - [ ] WCAG 2.1 Level A and Level AA requirements are met.
  - [ ] The Storybook a11y addon shows no errors.
  - [ ] The changes have been tested with a screen reader.
  - [ ] Keyboard controls have been tested, if applicable.
  - [ ] Components implementing form controls (inputs, buttons, selects, etc.) do not use Shadow DOM, and instead use Stencil's scoping mechanism
- [ ] The changes use our [🌈 theming concept](https://swirl-storybook.flip-app.dev/?path=/docs/requirements-theming--docs).
  - [ ] Design tokens have been used where appropriate.
  - [ ] The component has been visually checked in combination with the "Light" and "Dark" theme.
- [ ] The changes meet our [🌍 internationalization requirements](https://swirl-storybook.flip-app.dev/?path=/docs/requirements-internationalization--docs).
  - [ ] No static text is used.
  - [ ] The component doesn't break with longer texts or different text wrappings.
  - [ ] Number, currency and date values can be formatted appropriately.
- [ ] The changes work in all supported browsers and viewports. See [📱 Responsive Design](https://swirl-storybook.flip-app.dev/?path=/docs/requirements-responsive-design--docs)
