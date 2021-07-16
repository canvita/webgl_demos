import { MyWebGL } from "@/utils/extends";

function draw(gl: MyWebGL) {
  const n = initVertexs(gl);
}


function initVertexs(gl: MyWebGL) {
  const vertexs = new Float32Array([0, 0.5, -0.5, -0.5, 0.5, -0.5]);
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, vertexs, gl.STATIC_DRAW);
}
export default draw;