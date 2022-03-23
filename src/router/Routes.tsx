import CanvasWorkspace from "@/pages/canvas-workspace";
import PanelWorkspace from "@/pages/panel-workspace/panel-workspace";
import Library from "@/pages/library/library";
import Demo from "@/pages/demo";
import Settings from "@/pages/settings/settings";
import AppShell from "@/components/shell/shell";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// TODO: Upgrade to react router

export default function Router(props) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/poche" element={<AppShell />}>
          <Route path="canvas" element={<CanvasWorkspace />} />
          <Route path="/p" element={<PanelWorkspace />} />
          <Route path="/" element={<Library />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="demo" element={<Demo />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
