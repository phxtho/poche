import "remirror/styles/all.css";
import "./remirror-editor.css";
import React, { forwardRef, useCallback, useImperativeHandle } from "react";
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
} from "remirror/extensions";
import {
  EditorComponent,
  ReactFrameworkOutput,
  Remirror,
  useRemirror,
} from "@remirror/react";
import {
  Extension,
  InvalidContentHandler,
  RemirrorEventListener,
  RemirrorEventListenerProps,
} from "@remirror/core";
import { PMState } from "model/interfaces";
import {
  LinkExtension,
  ImageExtension,
} from "components/remirror-editor/extensions";

interface EditorProps {
  onFocus?: (
    params: RemirrorEventListenerProps<Extension>,
    event: Event
  ) => void;
  onBlur?: (
    params: RemirrorEventListenerProps<Extension>,
    event: Event
  ) => void;
  onChange?: RemirrorEventListener<Extension>;
  state?: PMState;
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

    const { manager, state, setState, getContext } = useRemirror({
      extensions: () => [
        new BoldExtension({}),
        new ItalicExtension(),
        new BlockquoteExtension(),
        new LinkExtension({ defaultTarget: "_blank", autoLink: true }),
        new HeadingExtension({}),
        new BulletListExtension({}),
        new OrderedListExtension(),
        new TaskListExtension(),
        new ImageExtension({ enableResizing: true }),
        new CodeExtension(),
        new UnderlineExtension(),
      ],
      onError: handleOnError,
      content: props.state?.doc,
    });

    useImperativeHandle(ref, () => getContext() as any, [getContext]);

    return (
      <div className="remirror-theme">
        <Remirror
          manager={manager}
          initialContent={state}
          onChange={(params) => {
            setState(params.state);
            props.onChange?.(params);
          }}
          onFocus={(params, event) => {
            props.onFocus?.(params, event);
          }}
          onBlur={(params, event) => {
            props.onBlur?.(params, event);
          }}
        >
          <EditorComponent />
        </Remirror>
      </div>
    );
  }
);

export default Editor;
