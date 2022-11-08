import { generateStoryElement } from "../../utils";
import Docs from "./flip-lightbox.mdx";

export default {
  component: "flip-lightbox",
  parameters: {
    docs: {
      page: Docs,
      source: {
        code: `<flip-lightbox id="lightbox" label="Lightbox">
  <flip-file-viewer description="Cute dog in a blaket." file="/sample.jpg" type="image/jpeg"></flip-file-viewer>
  <flip-file-viewer description="Another cute dog in a blanket." file="/sample-2.jpg" type="image/jpeg"></flip-file-viewer>
  <flip-file-viewer description="Black puppy." file="/sample-3.jpg" type="image/jpeg"></flip-file-viewer>
  <flip-file-viewer autoplay file="/sample.mp4" type="video/mp4"></flip-file-viewer>
</flip-lightbox>

<script>
  const lightbox = document.body.querySelector('#lightbox');
  lightbox.open();
</script>`,
      },
    },
  },
  title: "Components/FlipLightbox",
};

const Template = (args) => {
  const container = document.createElement("div");
  const trigger = document.createElement("flip-button");
  const element = generateStoryElement(
    "flip-lightbox",
    args
  ) as HTMLFlipLightboxElement;

  trigger.label = "Open lightbox";
  trigger.addEventListener("click", () => element.open());

  element.innerHTML = `
    <flip-file-viewer description="Cute dog in a blanket." file="/sample.jpg" type="image/jpeg"></flip-file-viewer>
    <flip-file-viewer description="Another cute dog in a blanket." file="/sample-2.jpg" type="image/jpeg"></flip-file-viewer>
    <flip-file-viewer description="Black puppy." file="/sample-3.jpg" type="image/jpeg"></flip-file-viewer>
    <flip-file-viewer autoplay file="/sample.mp4" type="video/mp4"></flip-file-viewer>
  `;

  container.append(trigger, element);

  return container;
};

export const FlipLightbox = Template.bind({});

FlipLightbox.args = {
  label: "Lightbox",
};
