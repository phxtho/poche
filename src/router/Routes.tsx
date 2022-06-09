import { Suspense } from "react";
import PanelWorkspace from "@/pages/panel-workspace/panel-workspace";
import Library from "@/pages/library/library";
import AppShell from "@/components/shell/shell";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Settings from "@/pages/settings/settings";
import CanvasWorkspace from "@/pages/canvas-workspace";

export default function Router(props) {
  return (
    <BrowserRouter basename="/poche">
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<AppShell />}>
            <Route index element={<Library />} />
            <Route path="canvas" element={<CanvasWorkspace />} />
            <Route path="panel" element={<PanelWorkspace />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

const paths = {
  home: "/",
  settings: "/settings",
  panelWorkspace: "/panel",
};

export { paths };
