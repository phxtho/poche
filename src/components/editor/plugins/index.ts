import { exampleSetup } from "prosemirror-example-setup";
import { schema } from "../schema";
import { Plugin } from "prosemirror-state";
import * as Y from "yjs";
import { WebrtcProvider } from "y-webrtc";
import {
  ySyncPlugin,
  yCursorPlugin,
  yUndoPlugin,
  undo,
  redo,
} from "y-prosemirror";
import { keymap } from "prosemirror-keymap";

export const basicPlugins: Plugin[] = exampleSetup({
  schema: schema,
  menuBar: false,
});

const ydoc = new Y.Doc();
const provider = new WebrtcProvider("prosemirror-debug", ydoc);
const type = ydoc.getXmlFragment("prosemirror");

export const yjsPlugins: Plugin[] = [
  ySyncPlugin(type),
  yCursorPlugin(provider.awareness),
  yUndoPlugin(),
  keymap({
    "Mod-z": undo,
    "Mod-y": redo,
    "Mod-Shift-z": redo,
  }),
].concat(basicPlugins);
