import { FunctionComponent } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";

interface HighlighterProps {
  code: string;
}

const Highlighter: FunctionComponent<HighlighterProps> = ({ code }) => {
  return (
    <SyntaxHighlighter wrapLongLines language="javascript">
      {code}
    </SyntaxHighlighter>
  );
};
export default Highlighter;
