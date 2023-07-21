import "remirror/styles/all.css";
import "./remirror-editor.css";
import { forwardRef, useCallback, useImperativeHandle } from "react";
import {
  BoldExtension,
  BlockquoteExtension,
  CodeExtension,
  HeadingExtension,
  ItalicExtension,
  BulletListExtension,
  OrderedListExtension,
  TaskListExtension,
  UnderlineExtension,
  CodeBlockExtension,
  HorizontalRuleExtension,
  MarkdownExtension,
} from "remirror/extensions";
import {
  EditorComponent,
  ReactFrameworkOutput,
  Remirror,
  useEditorEvent,
  useRemirror,
  useRemirrorContext,
} from "@remirror/react";
import { Extension, InvalidContentHandler } from "@remirror/core";
import {
  LinkExtension,
  ImageExtension,
  MathInlineExtension,
  MathBlockExtension,
  SupportedLanguages,
} from "@/components/remirror-editor/extensions";

interface EditorProps {
  onFocus?: (event: Event) => void;
  onBlur?: (docText: string) => void;
  onChange?: (docAsJSON: any) => void;
  doc?: any;
  id: string;
}

const Editor = forwardRef<ReactFrameworkOutput<Extension>, EditorProps>(
  (props: EditorProps, ref) => {
    const handleOnError: InvalidContentHandler = useCallback(
      ({ json, invalidContent, transformers }) => {
        // Automatically remove all invalid nodes and marks.
        return transformers.remove(json, invalidContent);
      },
      []
    );
    const useOnFocus = () => {
      useEditorEvent("focus", props.onFocus);
    };

    const useOnBlur = () => {
      const docText = useRemirrorContext().helpers.getText();
      useEditorEvent("blur", () => props.onBlur(docText));
    };

    const { manager, state, setState, getContext } = useRemirror({
      extensions: () => [
        new MarkdownExtension({}),
        new BoldExtension({}),
        new ItalicExtension(),
        new BlockquoteExtension(),
        new LinkExtension({ defaultTarget: "_blank", autoLink: true }),
        new HeadingExtension({}),
        new BulletListExtension({ enableSpine: true }),
        new OrderedListExtension(),
        new TaskListExtension(),
        new ImageExtension({ enableResizing: true }),
        new CodeExtension(),
        new UnderlineExtension(),
        new MathInlineExtension(),
        new MathBlockExtension(),
        new CodeBlockExtension({
          supportedLanguages: SupportedLanguages,
          defaultLanguage: "typescript",
        }),
        new HorizontalRuleExtension(),
      ],
      onError: handleOnError,
      content: props.doc,
    });

    useImperativeHandle(ref, () => getContext() as any, [getContext]);

    return (
      <div id={props.id} className="remirror-theme">
        <Remirror
          manager={manager}
          initialContent={state}
          onChange={(params) => {
            setState(params.state);
            if (!params.firstRender) {
              props.onChange?.(params.state.doc.toJSON());
            }
          }}
          hooks={[useOnFocus, useOnBlur]}
        >
          <EditorComponent />
        </Remirror>
      </div>
    );
  }
);

export default Editor;
