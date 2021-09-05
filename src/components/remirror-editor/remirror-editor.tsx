import "remirror/styles/all.css";
import "./remirror-editor.css";
import React, { useCallback } from "react";
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
import {
  Extension,
  InvalidContentHandler,
  RemirrorEventListener,
  RemirrorEventListenerProps,
} from "@remirror/core";
import { PMState } from "model/interfaces";

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

const Editor = (props: EditorProps) => {
  const handleOnError: InvalidContentHandler = useCallback(
    ({ json, invalidContent, transformers }) => {
      // Automatically remove all invalid nodes and marks.
      return transformers.remove(json, invalidContent);
    },
    []
  );

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
    onError: handleOnError,
  });

  return (
    <Remirror
      manager={manager}
      initialContent={props.state?.doc}
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
