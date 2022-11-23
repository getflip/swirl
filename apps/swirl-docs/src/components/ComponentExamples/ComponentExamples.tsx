import { useEffect, useState } from "react";

const exampleIframeId = "example-iframe";
const iframePadding = 192;

export type ComponentExample = {
  code: string;
  description: string;
  fileName: string;
  title: string;
};

interface ComponentExampleProps {
  examples: ComponentExample[];
}

// https://stackoverflow.com/a/60338028
function formatHTML(html: string): string {
  const tab = "  ";
  let result = "";
  let indent = "";

  html.split(/>\s*</).forEach((element) => {
    if (element.match(/^\/\w/)) {
      indent = indent.substring(tab.length);
    }
    result += indent + "<" + element + ">\r\n";

    if (element.match(/^<?\w[^>]*[^\/]$/) && !element.startsWith("input")) {
      indent += tab;
    }
  });

  return result.substring(1, result.length - 3);
}

const ComponentExamples = ({ examples }: ComponentExampleProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [htmlCode, setHTMLCode] = useState("");

  const [iframeHeight, setIframeHeight] = useState(400);

  const handleExampleLoad = () => {
    let attempts = 0;

    const waitForExampleContentToRender = setInterval(() => {
      const exampleIframe = document.getElementById(
        exampleIframeId
      ) as HTMLIFrameElement;
      const exampleIframeDOM = exampleIframe?.contentDocument;
      const exampleWrapper =
        exampleIframeDOM?.getElementById("polaris-example");

      if (exampleWrapper) {
        const newHeight = iframePadding + exampleWrapper.offsetHeight;
        setIframeHeight(newHeight);
        setHTMLCode(formatHTML(exampleWrapper.innerHTML));
        clearInterval(waitForExampleContentToRender);
      }

      attempts++;

      if (attempts > 10) {
        clearInterval(waitForExampleContentToRender);
      }
    }, 100);

    return () => clearInterval(waitForExampleContentToRender);
  };

  useEffect(() => {
    setSelectedIndex(0);
  }, [examples]);

  return <div>Hello Component Examples</div>;
};

export default ComponentExamples;

export {};
