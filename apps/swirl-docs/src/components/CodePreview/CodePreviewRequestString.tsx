import { useCodePreviewContext } from "./CodePreviewContext";

export function APIEndpointHeader() {
  const { request } = useCodePreviewContext();

  return (
    <span>
      {request && (
        <>
          <span className="text-[#A6CAFF] font-semibold text-font-size-base mr-1 uppercase">
            {request?.method}
          </span>
          <span className="text-white font-normal">{request?.url}</span>
        </>
      )}
    </span>
  );
}
