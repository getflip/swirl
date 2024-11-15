export default {
  component: "swirl-tree-navigation-item",
  tags: ["autodocs"],
  title: "Admin/SwirlTreeNavigation",
  parameters: {
    docs: {
      description: {
        component:
          "This is not a component but rather an example usage of [swirl-navigation-item](/docs/admin-swirltreenavigationitem--docs). It demonstrates how to implement the navigation item in different states.",
      },
    },
  },
};

const Template = () => {
  const element2 = `
    <swirl-tree-navigation-item label="Home" icon='home' href='#home'></swirl-tree-navigation-item>
    <swirl-tree-navigation-item label="User Management" icon='person'>
      <swirl-tree-navigation-item label="Users" active='true' href='#users'></swirl-tree-navigation-item>
      <swirl-tree-navigation-item label="User groups" href='#user-groups'></swirl-tree-navigation-item>
    </swirl-tree-navigation-item>
    <swirl-tree-navigation-item href='https://getflip.com' target='__blank' label="File" icon='file' external='true'></swirl-tree-navigation-item>
  `;

  return element2;
};

export const SwirlTreeNavigationItem = Template.bind({});

SwirlTreeNavigationItem.args = {};
