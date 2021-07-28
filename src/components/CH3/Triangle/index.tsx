import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { getContext } from "@/utils/extends";
import VSHADER_SOURCE from "./index.vs.glsl";
import FSHADER_SOURCE from "./index.fs.glsl";
import { drawTriangle } from "./draw";
function CH2() {

  useEffect(() => {

    const gl = getContext("webgl", VSHADER_SOURCE, FSHADER_SOURCE);
    if (!gl) {
      return;
    }
    drawTriangle(gl);

  }, []);
  return <canvas id="webgl"></canvas>;
}

export default observer(CH2);