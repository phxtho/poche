import { InputRule } from "@remirror/pm";
import { LinkExtension as RemirrorLinkExtension } from "remirror/extensions";
import { markInputRule } from "@remirror/core-utils";
import { MarkPasteRule } from "@remirror/pm/paste-rules";

class LinkExtension extends RemirrorLinkExtension {
  constructor(args) {
    super(args);
    this.addHandler("onClick", (_, data) => {
      window.open(data.href);
      return true;
    });
  }

  createInputRules(): InputRule[] {
    return [
      markInputRule({
        regexp: /[^!]\[(.+?)\]\((.+?)\)/, // regexp: /(?<!!)\[(.*?)\]\((.*?)\)/, Safari doesn't support lookbehind
        type: this.type,
        getAttributes: (matches: string[]) => {
          const [_, text, href] = matches;
          return { text: text, href: href };
        },
      }),
    ];
  }

  // Overwrite the paste rule
  createPasteRules(): MarkPasteRule[] {
    return [];
  }
}

export default LinkExtension;
