# Swirl Icons

This package contains the Swirl icon set in different formats. **To use the
icons as Web Components or Angular/React components, please use
@getflip/swirl-components.**

## Installation

```bash
yarn add @getflip/swirl-icons
# or
npm install @getflip/swirl-icons
```

## Usage

### Use as Web Fonts

You can find different (web) font formats in the `dist` directory. Corresponding
`.css`, `.less`, `.scss` and `.styl` files include the necessary styles to use
the icon fonts.

### Use SVG symbols

The `dist` directory includes a `swirl-icons.symbol.svg` file which defines all
icons as SVG symbols. The symbols can be used as follows:

```html
<svg viewBox="0 0 16 16">
  <use xlink:href="#swirl-icons-Add16" />
</svg>

<svg viewBox="0 0 24 24">
  <use xlink:href="#swirl-icons-Add24" />
</svg>

<svg viewBox="0 0 28 28">
  <use xlink:href="#swirl-icons-Add28" />
</svg>
```

### Use the separate SVG files

The `icons` directory includes all icons as separate files, which can be used
via the `img` tag.

```html
<img src="icons/Add16.svg" alt="" />
```

## Add or update icons

All icon deliverables are generated from the svg files inside
`packages/swirl-icons/icons`. To change, add or delete icons, modify the
corresponding svg file.

**⚠️ Every icon svg file needs to come in three sizes (16, 24, 28). The files
have to be named in PascalCase followed by the size, e.g. `AddPhoto16.svg`!**

1. Modify the icon files in a new branch
   - For custom icons: Copy the svg files to the `icons` directory
   - For Material Symbols: Edit the `material-symbols.json` file in the `scripts` directory and run `yarn copy:material-symbols`
2. Run `yarn generate`, select "icons" when prompted
3. Run `yarn changeset` to create a corresponding changelog item
4. Run `yarn build`
5. Check, commit and push all changes and create a PR
