import applyDevTools from "prosemirror-dev-tools";
import { useEffect } from "react";
import { unmountComponentAtNode } from "react-dom";
import { useRemirrorContext } from "@remirror/react";

var ProsemirrorDevTools = () => {
  var _useRemirrorContext = useRemirrorContext(),
    view = _useRemirrorContext.view;

  useEffect(() => {
    applyDevTools(view);
    return () => {
      var node = document.querySelector(".__prosemirror-dev-tools__");

      if (!node) {
        return;
      }

      unmountComponentAtNode(node);

      if (node.parentNode) {
        node.remove();
      }
    };
  }, [view]);
  return null;
};

export default ProsemirrorDevTools;
