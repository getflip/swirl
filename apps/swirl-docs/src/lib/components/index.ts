import { SwirlComponent } from "./src/components.model";

/**
 * Creates a flip web component tag out of the component name and returns
 * the swirl component data for that tag.
 */
function getSwirlComponentData(name: string): SwirlComponent {
  const tag = `swirl-${name.toLowerCase().replace(/ /g, "-")}`;
  const componentsJSON = require("@getflip/swirl-components/components.json");
  const component = componentsJSON.components.find(
    (c: any) => c.tag === tag
  ) as unknown as SwirlComponent;

  if (!component) {
    throw new Error(`Component ${tag} not found`);
  }
  return component;
}

export { getSwirlComponentData };
