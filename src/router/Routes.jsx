import React from "react";
import { Redirect } from "@reach/router";
import FadeInTransitionRouter from "./FadeInTransitionRouter";
import NestedRoute from "./NestedRoute";
import Canvas from "components/canvas/canvas";
import Dev from "pages/Dev";

export default function Routes(props) {
  return (
    <FadeInTransitionRouter>
      <Redirect from="/" to="experiment-501.V2" noThrow />
      <NestedRoute path="experiment-501.V2">
        <Canvas path="/" />
        <Dev path="/dev" />
      </NestedRoute>
    </FadeInTransitionRouter>
  );
}
