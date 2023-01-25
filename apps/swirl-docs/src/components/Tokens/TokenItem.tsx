import {
  autoUpdate,
  flip,
  FloatingFocusManager,
  offset,
  shift,
  useDismiss,
  useFloating,
  useFocus,
  useHover,
  useInteractions,
  useRole,
} from "@floating-ui/react";
import {
  SwirlIconCheckStrong,
  SwirlIconCopy,
} from "@getflip/swirl-components-react";
import { Token } from "@swirl/lib/tokens";
import {
  isBorderToken,
  isColorIndex,
  isSpacingToken,
  isTypographyToken,
  isZindexToken,
} from "@swirl/lib/tokens/src/utils";
import classNames from "classnames";
import { useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import TokenPreview from "./TokenPreview";

export type TokenItemProps = {
  token: Token;
};

const TokenItem = ({ token }: TokenItemProps) => {
  const [open, setOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const { x, y, strategy, refs, context } = useFloating({
    open,
    onOpenChange: setOpen,
    middleware: [offset(4), flip(), shift()],
    whileElementsMounted: autoUpdate,
  });

  const hover = useHover(context, {
    restMs: 500,
  });
  const focus = useFocus(context);
  const dismiss = useDismiss(context);
  const role = useRole(context);

  // Merge all the interactions into prop getters
  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    focus,
    dismiss,
    role,
  ]);

  return (
    <tr
      className={classNames(
        `grid gap-3 grid-cols-1 md:grid-cols-typography-token-list items-center py-4 border-b-1`,
        {
          "md:grid-cols-color-token-list":
            isColorIndex(token.type) || isBorderToken(token.type),
          "md:grid-cols-typography-token-list": isTypographyToken(token.type),
          "md:grid-cols-spacing-token-list": isSpacingToken(token.type),
          "md:grid-cols-z-index-token-list": isZindexToken(token.type),
        }
      )}
    >
      <td>
        <TokenPreview token={token} />
      </td>
      <td className="flex flex-col mb-2 md:mb-0">
        <div className="inline-flex mb-2 md:mb-0">
          <div
            className={classNames(
              "relative flex items-center max-w-[100%]",
              "bg-surface-pressed rounded-border-radius-s p-1 text-sm text-text-default font-font-family-code"
            )}
          >
            <code
              className="w-full whitespace-pre overflow-hidden text-ellipsis "
              ref={refs.setReference}
              {...getReferenceProps()}
            >
              {token.name}
            </code>
            <CopyToClipboard
              text={token.name}
              onCopy={() => {
                setIsCopied(true);
                setTimeout(() => {
                  setIsCopied(false);
                }, 2000);
              }}
            >
              <button className="inline-flex items-center text-icon-default">
                {isCopied ? (
                  <SwirlIconCheckStrong size={16} className="ml-1" />
                ) : (
                  <SwirlIconCopy size={16} className="ml-1" />
                )}
              </button>
            </CopyToClipboard>
            {open && (
              <FloatingFocusManager
                closeOnFocusOut={false}
                context={context}
                modal={false}
              >
                <div
                  className={classNames(
                    "Popover inline-flex items-center opacity-50 text-font-size-sm px-2 py-1 rounded-border-radius-s outline-none",
                    "text-white border border-border-default bg-surface-neutral-default"
                  )}
                  ref={refs.setFloating}
                  tabIndex={-1}
                  style={{
                    position: strategy,
                    top: y ?? 0,
                    left: x ?? 0,
                    width: "max-content",
                  }}
                  {...getFloatingProps()}
                >
                  {token.name}
                </div>
              </FloatingFocusManager>
            )}
          </div>
        </div>
      </td>
      <td className="mb-2 md:mb-0 text-sm">
        <code>{token.valueAsString}</code>
      </td>
      {token.description && (
        <td className="text-font-size-sm">{token.description}</td>
      )}
    </tr>
  );
};

export default TokenItem;
