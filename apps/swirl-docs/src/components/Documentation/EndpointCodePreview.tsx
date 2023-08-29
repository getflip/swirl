import { FunctionComponent } from "react";
import { CodePreview } from "../CodePreview";
import {
  EndpointUrl,
  HttpMethod,
  RequestLanguage,
  ResponseIndicator,
  ResponseSelector,
} from "../CodePreview/CodePreviewHeader";
import { ApiEndpoint } from "@swirl/lib/docs";

interface EndpointCodePreview {
  endpoint: ApiEndpoint;
  initialResponseExampleStatus: string;
}

export const EndpointCodePreview: FunctionComponent<EndpointCodePreview> = ({
  endpoint,
  initialResponseExampleStatus,
}) => {
  return (
    <div className="min-w-0 max-w-[37.5rem]">
      <CodePreview
        className="mb-4"
        hasCopyButton
        codeExample={{
          code: endpoint.request.snippets["shell"],
          selectOptions: endpoint.request.snippets,
          isLongCode: false,
          selectedId: "shell",
          request: endpoint.request.request,
        }}
        PreviewIndicator={<HttpMethod />}
        MainHeaderContent={<EndpointUrl />}
        ActionItems={<RequestLanguage />}
      />
      <div>
        {initialResponseExampleStatus && (
          <CodePreview
            isLightTheme
            PreviewIndicator={<ResponseIndicator />}
            ActionItems={<ResponseSelector />}
            codeExample={{
              code: endpoint.responseExamples[initialResponseExampleStatus],
              selectOptions: endpoint.responseExamples,
              isLongCode: true,
              selectedId: Object.keys(endpoint.responseExamples)[0],
            }}
          />
        )}
      </div>
    </div>
  );
};
