import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { getContext, MyWebGL } from "@/utils/extends";
import VSHADER_SOURCE from "./index.vs.glsl";
import FSHADER_SOURCE from "./index.fs.glsl";
function CH2() {

  useEffect(() => {

    const gl = getContext("webgl", VSHADER_SOURCE, FSHADER_SOURCE);
    if (!gl) {
      return;
    }
    // const n = initVertexBuffers(gl);

    // const u_FragColor = gl.getUniformLocation(gl.program, "u_FragColor");
    // gl.uniform4f(u_FragColor, 1.0, 0.0, 0.0, 1.0);
    // gl.clearColor(0, 0, 0, 1);
    // gl.clear(gl.COLOR_BUFFER_BIT);
    // gl.drawArrays(gl.POINTS, 0, n);

    // function initVertexBuffers(gl: MyWebGLRenderingContext) {
    //   const vertices = new Float32Array([-0.5, 0.5, -0.5, -0.5, 0.5, 0.5]);
    //   const vertexBuffer = gl.createBuffer();
    //   gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    //   gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    //   const a_Position = gl.getAttribLocation(gl.program, "a_Position");
    //   gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
    //   gl.enableVertexAttribArray(a_Position);
    //   return vertices.length / 2;
    // }

  }, []);
  return <canvas id="webgl">1</canvas>;
}

export default observer(CH2);