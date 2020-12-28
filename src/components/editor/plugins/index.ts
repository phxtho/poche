import { exampleSetup } from "prosemirror-example-setup";
import { schema } from "../schema";
import { Plugin } from "prosemirror-state";

export const basicPlugins: Plugin[] = exampleSetup({
  schema: schema,
  menuBar: false,
});
