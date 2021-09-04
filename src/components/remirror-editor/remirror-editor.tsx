import "remirror/styles/all.css";
import React from "react";
import {
  BoldExtension,
  BlockquoteExtension,
  CodeExtension,
  HeadingExtension,
  ImageExtension,
  ItalicExtension,
  LinkExtension,
  BulletListExtension,
  OrderedListExtension,
  TaskListExtension,
} from "remirror/extensions";
import { EditorComponent, Remirror, useRemirror } from "@remirror/react";
import { RemirrorJSON } from "@remirror/core-types";
import {
  Extension,
  RemirrorEventListener,
  RemirrorEventListenerProps,
} from "@remirror/core";

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
  state?: RemirrorJSON;
}

const Editor = (props: EditorProps) => {
  const { manager, state, setState } = useRemirror({
    extensions: () => [
      new BoldExtension({}),
      new ItalicExtension(),
      new BlockquoteExtension(),
      new LinkExtension({}),
      new HeadingExtension({}),
      new BulletListExtension({}),
      new OrderedListExtension(),
      new TaskListExtension(),
      new ImageExtension(),
      new CodeExtension(),
    ],
  });

  return (
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
  );
};

export default Editor;
