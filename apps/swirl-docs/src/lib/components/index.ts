import componentsJSON from "@getflip/swirl-components/components.json";

/**
 * Creates a flip web component tag out of the component name and returns
 * the swirl component data for that tag. For better DX you have to cast the return where you invoke this function.
 * eg. `const component = getComponentData("Button") as SwirlComponent;`
 */
function getSwirlComponentData(name: string): any {
  const tag = `flip-${name.toLowerCase().replace(/ /g, "-")}`;

  const component = componentsJSON.components.find((c: any) => c.tag === tag);
  if (!component) {
    throw new Error(`Component ${tag} not found`);
  }
  return component;
}

export { getSwirlComponentData };
