import classNames from "classnames";
import { useCodePreviewContext } from "./CodePreviewContext";
import { CopyButton } from "./CodePreviewCopyButton";
import { SupportedTargets } from "@readme/oas-to-snippet";
import { Select, SelectItemProps, SelectProps } from "./Select";

export function CodePreviewHeader() {
  const {
    isLightTheme,
    hasCopyButton,
    PreviewIndicator,
    MainHeaderContent,
    ActionItems,
  } = useCodePreviewContext();
  return (
    <div
      className={classNames(
        "box-border flex items-baseline gap-1",
        "w-full max-h-full h-auto min-h-[2.25rem] rounded-lg",
        "p-2",
        {
          "bg-[#21201E]": !isLightTheme,
          "bg-surface-overlay-default": isLightTheme,
        }
      )}
    >
      <span className="shrink-0 basis-0">{PreviewIndicator}</span>
      <span className="grow min-w-0" style={{ overflowWrap: "anywhere" }}>
        {MainHeaderContent}
      </span>
      <div className="shrink-0 basis-0 flex items-center">
        {ActionItems}
        {hasCopyButton && <CopyButton />}
      </div>
    </div>
  );
}

// Main Header Content Components
export function HttpMethod() {
  const { codeExample } = useCodePreviewContext();
  return (
    <span className="text-[#A6CAFF] font-semibold text-font-size-sm uppercase leading-5">
      {codeExample.request?.method}
    </span>
  );
}

export function ResponseIndicator() {
  return <span className="text-font-size-sm max-h-5">Response</span>;
}

export function EndpointUrl() {
  const { codeExample } = useCodePreviewContext();
  return (
    <span className="text-font-size-sm text-text-on-image leading-5 font-font-weight-normal break-words h-full">
      {codeExample.request?.url}
    </span>
  );
}

// Select Field Components
export function RequestLanguage() {
  const keys: SupportedTargets[] = ["shell", "node", "python"];
  const { options, handleSelection, selectedId } =
    useSelectOptionsAndHandler(keys);

  return (
    <Select
      options={options}
      selectedId={selectedId}
      onItemClick={handleSelection}
    />
  );
}

export function ResponseSelector() {
  const { codeExample } = useCodePreviewContext();
  const keys = codeExample.selectOptions
    ? Object.keys(codeExample.selectOptions)
    : [];
  const { options, handleSelection, selectedId } =
    useSelectOptionsAndHandler(keys);

  return (
    <Select
      options={options}
      selectedId={selectedId}
      onItemClick={handleSelection}
    />
  );
}

function useSelectOptionsAndHandler(keys: string[]) {
  const { codeExample, handleSelect } = useCodePreviewContext();

  const options: SelectProps["options"] = keys.map((key) => ({
    label: key,
    value: key,
  }));
  const handleSelection = (
    option: Pick<SelectItemProps, "label" | "value">
  ) => {
    handleSelect?.(option.label);
  };

  return {
    options,
    handleSelection,
    selectedId: codeExample.selectedId as string,
  };
}
