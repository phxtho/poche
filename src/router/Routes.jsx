import React from "react";
import { Redirect } from "@reach/router";
import FadeInTransitionRouter from "./FadeInTransitionRouter";
import NestedRoute from "./NestedRoute";
import CanvasWorkspace from "pages/canvas-workspace";
import PanelWorkspace from "pages/panel-workspace/panel-workspace";
import Library from "pages/library/library";
import Demo from "pages/demo";

export default function Routes(props) {
  return (
    <FadeInTransitionRouter>
      <Redirect from="/" to="experiment-501.V2" noThrow />
      <NestedRoute path="/experiment-501.V2">
        <CanvasWorkspace path="/c" />
        <PanelWorkspace path="/p" />
        <Demo path="/demo" />
        <Library path="/" />
      </NestedRoute>
    </FadeInTransitionRouter>
  );
}