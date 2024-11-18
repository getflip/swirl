import { ReactNode, useState } from "react";
import { SwirlIconAdd, SwirlIconRemove } from "@getflip/swirl-components-react";
import { AnimatePresence, motion } from "framer-motion";

interface ExpandableProps {
  children: ReactNode;
}

export function Expandable({ children }: ExpandableProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  function toggle() {
    setIsExpanded((expanded) => !expanded);
  }

  return (
    <div className="mt-space-8 empty:mt-0">
      <button
        className="inline-flex items-center gap-space-4 font-medium text-font-size-sm text-interactive-primary-default"
        onClick={toggle}
        type="button"
      >
        {!isExpanded && (
          <>
            <SwirlIconAdd size={20}/> Expand
          </>
        )}
        {isExpanded && (
          <>
            <SwirlIconRemove size={20}/> Collapse
          </>
        )}
      </button>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{height: 0, opacity: 0, marginTop: 0}}
            animate={{height: "auto", opacity: 1, marginTop: 16}}
            exit={{height: 0, opacity: 0, marginTop: 0}}
            style={{originY: 0, overflow: "hidden"}}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
