import { ImageExtension as RemirrorImageExtension } from "remirror/extensions";
import { InputRule } from "@remirror/pm";
import { nodeInputRule } from "@remirror/core-utils";

class ImageExtension extends RemirrorImageExtension {
  createInputRules(): InputRule[] {
    return [
      nodeInputRule({
        regexp: /!\[(?<altText>.+)\]\((?<src>[^ ]+)(?: "(?<caption>.+)")?\)/,
        type: this.type,
        getAttributes: (matches: string[]) => {
          const [_, alt, src] = matches;
          return { src: src, alt: alt };
        },
      }),
    ];
  }
}

export default ImageExtension;
