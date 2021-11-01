import React from "react";
import { Redirect } from "@reach/router";
import FadeInTransitionRouter from "./FadeInTransitionRouter";
import CanvasWorkspace from "pages/canvas-workspace";
import PanelWorkspace from "pages/panel-workspace/panel-workspace";
import Library from "pages/library/library";
import Demo from "pages/demo";
import Settings from "pages/settings/settings";
import AppShell from "components/shell/shell";

export default function Routes(props) {
  return (
    <FadeInTransitionRouter>
      <Redirect from="/" to="experiment-501.V2" noThrow />
      <AppShell path="/experiment-501.V2">
        <CanvasWorkspace path="/c" />
        <PanelWorkspace path="/p" />
        <Library path="/" />
        <Settings path="/settings" />
        <Demo path="/demo" />
      </AppShell>
    </FadeInTransitionRouter>
  );
}
