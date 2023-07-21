import {
  ApplySchemaAttributes,
  command,
  CommandFunction,
  extension,
  ExtensionTag,
  NodeExtension,
  NodeExtensionSpec,
  NodeSpecOverride,
  PrioritizedKeyBindings,
} from "@remirror/core";
import { chainKeyBindingCommands, convertCommand } from "@remirror/core-utils";
import { InputRule, ProsemirrorPlugin } from "@remirror/pm";
import {
  deleteSelection,
  selectNodeBackward,
  joinBackward,
} from "@remirror/pm/commands";
import {
  REGEX_BLOCK_MATH_DOLLARS,
  insertMathCmd,
  mathBackspaceCmd,
  makeBlockMathInputRule,
} from "@benrbray/prosemirror-math";
import { defaultBlockMathParseRules } from "./math-parse-rules";
// CSS
import "@benrbray/prosemirror-math/style/math.css";
import "katex/dist/katex.min.css";

export interface MathBlockOptions {}

@extension<MathBlockOptions>({
  defaultOptions: {},
})
export class MathBlockExtension extends NodeExtension<MathBlockOptions> {
  get name() {
    return "math_display" as const;
  }

  createTags() {
    return [ExtensionTag.BlockNode];
  }

  createNodeSpec(
    extra: ApplySchemaAttributes,
    override: NodeSpecOverride
  ): NodeExtensionSpec {
    return {
      group: "block math",
      content: "text*",
      code: true,
      atom: true,
      ...override,
      attrs: {
        ...extra.defaults(),
      },
      parseDOM: [
        {
          tag: "math-display",
        },
        ...defaultBlockMathParseRules,
      ],
      toDOM: () => ["math-display", { class: "math-node" }, 0],
    };
  }

  createInputRules(): InputRule[] {
    return [makeBlockMathInputRule(REGEX_BLOCK_MATH_DOLLARS, this.type)];
  }

  createExternalPlugins(): ProsemirrorPlugin[] {
    return [];
  }

  createKeymap(
    extractShortcutNames: (shortcut: string) => string[]
  ): PrioritizedKeyBindings {
    const command = chainKeyBindingCommands(
      convertCommand(deleteSelection),
      convertCommand(mathBackspaceCmd),
      convertCommand(joinBackward),
      convertCommand(selectNodeBackward)
    );
    return { Backspace: command };
  }

  @command()
  insertMathBlock(): CommandFunction {
    return (props) => {
      insertMathCmd(this.type);
      return null;
    };
  }
}

declare global {
  namespace Remirror {
    interface AllExtensions {
      math_block: MathBlockExtension;
    }
  }
}
