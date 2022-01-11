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
  REGEX_INLINE_MATH_DOLLARS_ESCAPED,
  insertMathCmd,
  mathBackspaceCmd,
  mathPlugin,
  makeInlineMathInputRule,
} from "@benrbray/prosemirror-math";
import { defaultInlineMathParseRules } from "./math-parse-rules";
// CSS
import "@benrbray/prosemirror-math/style/math.css";
import "katex/dist/katex.min.css";

export interface MathInlineOptions {}

@extension<MathInlineOptions>({
  defaultOptions: {},
})
export class MathInlineExtension extends NodeExtension<MathInlineOptions> {
  get name() {
    return "math_inline" as const;
  }

  createTags() {
    return [ExtensionTag.InlineNode];
  }

  createNodeSpec(
    extra: ApplySchemaAttributes,
    override: NodeSpecOverride
  ): NodeExtensionSpec {
    return {
      group: "inline math",
      content: "text*",
      inline: true,
      atom: true,
      ...override,
      attrs: {
        ...extra.defaults(),
      },
      parseDOM: [
        {
          tag: "math-inline",
        },
        ...defaultInlineMathParseRules,
      ],
      toDOM: () => ["math-inline", { class: "math-node" }, 0],
    };
  }

  createInputRules(): InputRule[] {
    return [
      makeInlineMathInputRule(REGEX_INLINE_MATH_DOLLARS_ESCAPED, this.type),
    ];
  }

  createExternalPlugins(): ProsemirrorPlugin[] {
    return [mathPlugin];
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
  insertMathInline(): CommandFunction {
    return (props) => {
      insertMathCmd(this.type);
      return null;
    };
  }
}

declare global {
  namespace Remirror {
    interface AllExtensions {
      math_inline: MathInlineExtension;
    }
  }
}
