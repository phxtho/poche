import { InputRule } from "@remirror/pm";
import { LinkExtension as RemirrorLinkExtension } from "remirror/extensions";
import { markInputRule } from "@remirror/core-utils";

class LinkExtension extends RemirrorLinkExtension {
  constructor(args) {
    super(args);
    this.addHandler("onClick", (_, data) => {
      window.open(data.href);
      return true;
    });
  }

  createInputRules(): InputRule[] {
    return [];
    return [
      markInputRule({
        regexp: /\[(?<text>.+)\]\((?<url>[^ ]+)(?: "(?<title>.+)")?\)/,
        type: this.type,
        getAttributes: (matches: string[]) => {
          const [_, text, href, title] = matches;
          return { text: text, href: href, title: title };
        },
      }),
    ];
  }
}

export default LinkExtension;
