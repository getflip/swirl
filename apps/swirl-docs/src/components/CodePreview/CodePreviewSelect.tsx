import {
  SwirlIconCheck,
  SwirlIconChevronRight,
} from "@getflip/swirl-components-react";
import { ComponentProps, useState } from "react";
import { autoUpdate, flip, shift } from "@floating-ui/dom";
import {
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
} from "@floating-ui/react";
import classnames from "classnames";
import { motion } from "framer-motion";

export type SelectItemProps = ComponentProps<"button"> & {
  label: string;
  isSelected: boolean;
};

export type SelectOption = {
  label: string;
  value: string;
};

export type SelectProps = {
  options: SelectOption[];
  selectId: string;
  onItemClick?: (option: SelectOption) => void;
};

export function Select({ options, selectId, onItemClick }: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);

  const { refs, context, x, y } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: "top-start",
    middleware: [flip({ fallbackAxisSideDirection: "start" }), shift()],
    whileElementsMounted: autoUpdate,
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);
  const role = useRole(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
    role,
  ]);

  const selectedLabel = options.find(
    (option) => option.value === selectId
  )?.label;

  return (
    <div className="relative">
      <button
        ref={refs.setReference}
        className={classnames(
          "relative flex items-center justify-center",
          "bg-transparent max-h-5 text-interactive-neutral-default text-font-size-sm",
          "pr-2",
          "after:block after:absolute after:h-full after:bg-border-default after:w-[1px] after:opacity-20 after:right-0"
        )}
        id="requestlanguage-trigger"
        onClick={() => setIsOpen(!isOpen)}
        {...getReferenceProps()}
      >
        {selectedLabel}
        <span className="rotate-90 max-h-[1.25rem] max-w-[1.25rem]">
          <SwirlIconChevronRight size={20} />
        </span>
      </button>
      {isOpen && (
        <motion.div
          initial={{ scale: 0 }}
          animate={isOpen ? { scale: 1 } : { scale: 0 }}
          transition={{ duration: 0.125, type: "tween" }}
          exit={{ scale: 0 }}
          ref={refs.setFloating}
          className="absolute z-10 border border-border-default rounded-lg overflow-hidden w-[12rem] max-w-[12rem] py-2 bg-surface-overlay-default"
          {...getFloatingProps()}
          style={{
            top: `${y}px`,
            left: `${x}px`,
          }}
        >
          {options.map((option) => (
            <SelectItem
              onClick={(event) => {
                const target = event.target as HTMLButtonElement;
                if (target && onItemClick) onItemClick(option);
                setIsOpen(false);
              }}
              key={option.label as string}
              isSelected={option.value === selectId}
              label={option.label}
              value={option.value}
            />
          ))}
        </motion.div>
      )}
    </div>
  );
}

function SelectItem({ label, isSelected, ...rest }: SelectItemProps) {
  const classes = classnames(
    "inline-flex items-center justify-between w-full px-4 py-2 max-h-[2.5]",
    "bg-surface-overlay-default hover:bg-surface-overlay-hovered active:bg-surface-overlay-pressed",
    "text-start text-font-size-sm leading-5 font-font-weight-medium",
    {
      "text-text-highlight": isSelected,
    }
  );

  return (
    <button {...rest} aria-label={label} type="button" className={classes}>
      {label}
      <ButtonContents isSelected={isSelected} />
    </button>
  );
}

function ButtonContents({
  isSelected,
}: {
  isSelected: SelectItemProps["isSelected"];
}) {
  return isSelected ? (
    <span className="w-4 h-4">
      <SwirlIconCheck size={16} />
    </span>
  ) : null;
}
