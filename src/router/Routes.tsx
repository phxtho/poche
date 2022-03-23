import { Redirect, Router } from "@reach/router";
import CanvasWorkspace from "@/pages/canvas-workspace";
import PanelWorkspace from "@/pages/panel-workspace/panel-workspace";
import Library from "@/pages/library/library";
import Demo from "@/pages/demo";
import Settings from "@/pages/settings/settings";
import AppShell from "@/components/shell/shell";
// TODO: Upgrade to react router

export default function Routes(props) {
  return (
    <Router>
      <Redirect from="/" to="poche" noThrow />
      <AppShell path="/poche">
        <CanvasWorkspace path="/c" />
        <PanelWorkspace path="/p" />
        <Library path="/" />
        <Settings path="/settings" />
        <Demo path="/demo" />
      </AppShell>
    </Router>
  );
}
