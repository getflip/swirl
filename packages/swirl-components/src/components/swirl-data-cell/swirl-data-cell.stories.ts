import { generateStoryElement } from "../../utils";
import Docs from "./swirl-data-cell.mdx";

export default {
  component: "swirl-data-cell",
  tags: ["autodocs"],
  parameters: {
    docs: {
      page: Docs,
    },
  },
  title: "Components/SwirlDataCell",
};

const Template = (args) => {
  const element = generateStoryElement(
    "swirl-data-cell",
    args
  ) as HTMLSwirlDataCellElement;

  return element;
};

export const SwirlDataCell = Template.bind({});

SwirlDataCell.args = {
  label: "Name",
  value: "John Doe",
  tooltip: "This is a tooltip",
};

// Add media slot content to the default story
SwirlDataCell.decorators = [
  (story) => {
    const element = story();
    if (element) {
      element.innerHTML = `
        <swirl-avatar slot="media" label="John Doe" icon="<swirl-icon-person></swirl-icon-person>" size="s"></swirl-avatar>
      `;
    }
    return element;
  },
];

export const MultipleCells = () => {
  const stack = generateStoryElement("swirl-data-cell-stack", {});

  stack.innerHTML = `
    <!-- Basic cell -->
    <swirl-data-cell label="Name" value="John Doe"></swirl-data-cell>

    <!-- With icon avatar -->
    <swirl-data-cell label="Email" value="john.doe@example.com">
      <swirl-avatar slot="media" label="Email" icon="<swirl-icon-person></swirl-icon-person>" size="s"></swirl-avatar>
    </swirl-data-cell>

    <!-- With image avatar -->
    <swirl-data-cell label="Avatar" value="John Doe">
      <swirl-avatar slot="media" label="John Doe" src="/sample-2.jpg" size="s"></swirl-avatar>
    </swirl-data-cell>

    <!-- With avatar initials (placeholder while image loads) -->
    <swirl-data-cell label="User" value="Jane Smith">
      <swirl-avatar slot="media" label="Jane Smith" src="/sample-3.jpg" initials="JS" size="s"></swirl-avatar>
    </swirl-data-cell>

    <!-- With tooltip -->
    <swirl-data-cell label="Status" value="Active" tooltip="This indicates the current status of the user"></swirl-data-cell>

    <!-- With suffix -->
    <swirl-data-cell label="Name" value="John Doe">
      <swirl-button slot="suffix" label="Edit" variant="plain" icon="<swirl-icon-edit></swirl-icon-edit>" hide-label></swirl-button>
    </swirl-data-cell>

    <!-- Vertical layout -->
    <swirl-data-cell label="Name" value="John Doe" vertical>
      <swirl-avatar slot="media" label="John Doe" icon="<swirl-icon-person></swirl-icon-person>" size="s"></swirl-avatar>
    </swirl-data-cell>

    <!-- Label only -->
    <swirl-data-cell label="Description"></swirl-data-cell>
  `;

  return stack;
};

export const WithInput = () => {
  const stack = generateStoryElement("swirl-data-cell-stack", {});

  stack.innerHTML = `
    <!-- Text input -->
    <swirl-data-cell>
      <swirl-form-control label="Name" slot="content">
        <swirl-text-input value="John Doe" placeholder="Enter a name" clearable="true" show-character-counter="true" max-length="50"></swirl-text-input>
      </swirl-form-control>
    </swirl-data-cell>

    <!-- Text input with suffix -->
    <swirl-data-cell>
      <swirl-form-control label="Username" slot="content">
        <swirl-text-input value="John Doe" placeholder="Enter a name" clearable="true" show-character-counter="true" max-length="30"></swirl-text-input>
      </swirl-form-control>
      <swirl-button slot="suffix" label="Remove" variant="plain" icon="<swirl-icon-delete></swirl-icon-delete>" hide-label size="s"></swirl-button>
    </swirl-data-cell>

    <!-- Email input with media -->
    <swirl-data-cell >
    <swirl-avatar slot="media" label="Email" icon="<swirl-icon-person></swirl-icon-person>" size="s"></swirl-avatar>
    <swirl-form-control label="Email" slot="content">
        <swirl-text-input type="email" value="john.doe@example.com" placeholder="Enter email"></swirl-text-input>
      </swirl-form-control>
    </swirl-data-cell>

    <!-- Tel input with tooltip -->
    <swirl-data-cell>
      <swirl-form-control label="Phone number" slot="content" tooltip="Enter your phone number with country code">
        <swirl-text-input type="tel" value="+1 234 567 8900" placeholder="Enter phone"></swirl-text-input>
      </swirl-form-control>
    </swirl-data-cell>

    <!-- Number input -->
    <swirl-data-cell>
      <swirl-form-control label="Age" slot="content">
        <swirl-text-input type="number" value="25" placeholder="Enter age""></swirl-text-input>
      </swirl-form-control>
    </swirl-data-cell>

    <!-- Date input -->
    <swirl-data-cell>
      <swirl-form-control label="Start Date" slot="content">
        <swirl-date-input value="2024-01-15"></swirl-date-input>
      </swirl-form-control>
    </swirl-data-cell>
  `;

  return stack;
};

export const WithSelect = () => {
  const stack = generateStoryElement("swirl-data-cell-stack", {});

  stack.innerHTML = `
    <!-- Basic select -->
    <swirl-data-cell>
      <swirl-form-control slot="content" label="Status">
        <swirl-select label="Status" value="2" search-placeholder="Search …" with-search="true">
          <swirl-option-list-section label="Section 1">
            <swirl-option-list-item label="This is an option 1" value="1"></swirl-option-list-item>
            <swirl-option-list-item label="This is an option 2" value="2"></swirl-option-list-item>
            <swirl-option-list-item label="This is an option 3" value="3"></swirl-option-list-item>
          </swirl-option-list-section>
          <swirl-option-list-section label="Section 2">
            <swirl-option-list-item label="This is an option 4" value="4"></swirl-option-list-item>
          </swirl-option-list-section>
        </swirl-select>
      </swirl-form-control>
    </swirl-data-cell>

    <!-- Select with media and suffix -->
    <swirl-data-cell>
      <swirl-avatar slot="media" label="Category" icon="<swirl-icon-person></swirl-icon-person>" size="s"></swirl-avatar>
      <swirl-form-control slot="content" label="Category">
        <swirl-select label="Category" value="design" search-placeholder="Search …" with-search="true">
          <swirl-option-list-section label="Departments">
            <swirl-option-list-item label="Design" value="design"></swirl-option-list-item>
            <swirl-option-list-item label="Engineering" value="engineering"></swirl-option-list-item>
            <swirl-option-list-item label="Marketing" value="marketing"></swirl-option-list-item>
            <swirl-option-list-item label="Sales" value="sales"></swirl-option-list-item>
          </swirl-option-list-section>
        </swirl-select>
      </swirl-form-control>
      <swirl-button slot="suffix" label="Delete" variant="plain" icon="<swirl-icon-delete></swirl-icon-delete>" hide-label size="s"></swirl-button>
    </swirl-data-cell>
  `;

  return stack;
};

export const WithCheckbox = () => {
  const stack = generateStoryElement("swirl-data-cell-stack", {});

  stack.innerHTML = `
    <!-- Basic checkbox -->
    <swirl-data-cell>
      <swirl-checkbox slot="content" label="Subscribe to newsletter" input-id="checkbox-1" input-name="newsletter" checked="true"></swirl-checkbox>
    </swirl-data-cell>

    <!-- Checkbox with description -->
    <swirl-data-cell>
      <swirl-checkbox slot="content" label="Enable notifications" description="Receive updates about your account" input-id="checkbox-2" input-name="notifications" checked="false"></swirl-checkbox>
    </swirl-data-cell>

    <!-- Checkbox with media -->
    <swirl-data-cell>
      <swirl-avatar slot="media" label="Settings" icon="<swirl-icon-person></swirl-icon-person>" size="s"></swirl-avatar>
      <swirl-checkbox slot="content" label="Enable 2FA" description="Enable two-factor authentication" input-id="checkbox-3" input-name="2fa" checked="true"></swirl-checkbox>
    </swirl-data-cell>

    <!-- Checkbox with suffix -->
    <swirl-data-cell>
      <swirl-checkbox slot="content" label="Accept terms and conditions" input-id="checkbox-4" input-name="terms" checked="false"></swirl-checkbox>
      <swirl-button slot="suffix" label="View" variant="plain" size="s"></swirl-button>
    </swirl-data-cell>
  `;

  return stack;
};

export const WithRadioButton = () => {
  const stack = generateStoryElement("swirl-data-cell-stack", {});

  stack.innerHTML = `
    <!-- Radio button group with each radio in its own data cell -->
    <swirl-radio-group value="premium">
      <swirl-data-cell>
        <swirl-avatar slot="media" label="Standard plan" icon="<swirl-icon-person></swirl-icon-person>" size="s"></swirl-avatar>
        <swirl-radio slot="content" label="Standard plan" description="Basic features included" input-id="radio-1" input-name="plan" value="standard"></swirl-radio>
      </swirl-data-cell>

      <swirl-data-cell>
        <swirl-avatar slot="media" label="Premium plan" icon="<swirl-icon-person></swirl-icon-person>" size="s"></swirl-avatar>
        <swirl-radio slot="content" label="Premium plan" description="All features included" input-id="radio-2" input-name="plan" value="premium"></swirl-radio>
      </swirl-data-cell>

      <swirl-data-cell>
        <swirl-avatar slot="media" label="Enterprise plan" icon="<swirl-icon-person></swirl-icon-person>" size="s"></swirl-avatar>
        <swirl-radio slot="content" label="Enterprise plan" description="Custom solutions" tooltip="Contact sales for pricing" input-id="radio-3" input-name="plan" value="enterprise"></swirl-radio>
      </swirl-data-cell>
    </swirl-radio-group>
  `;

  return stack;
};
