import { useCodePreviewContext } from "./CodePreviewContext";

export function APIEndpointHeader() {
  const { codeExample } = useCodePreviewContext();

  return (
    <span>
      {codeExample.request && (
        <>
          <span className="text-[#A6CAFF] font-semibold text-font-size-base mr-1 uppercase">
            {codeExample.request?.method}
          </span>
          <span className="text-white font-normal">
            {codeExample.request?.url}
          </span>
        </>
      )}
    </span>
  );
}
