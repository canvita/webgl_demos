export interface MyWebGL extends WebGLRenderingContext {
  program: WebGLProgram;
}

export const getContext = (id: string, vshader: string, fshader: string): MyWebGL | null => {
  const canvas = document.getElementById("webgl") as HTMLCanvasElement;
  if (!canvas) {
    console.log("no canvas");
    return null;
  }
  const _gl = canvas.getContext(id) as MyWebGL;
  if (!_gl) {
    console.log("no webgl");
    return null;
  }
  const gl = initShader(_gl, vshader, fshader);
  if (!_gl) {
    console.log("fail init");
    return null;
  }
  return gl;
};
export const initShader = (gl: MyWebGL, vshader: string, fshader: string): MyWebGL | null => {
  const program = createProgram(gl, vshader, fshader);
  if (!program) {
    console.log("fail to initShader");
    return null;
  }
  gl.program = program;
  return gl;
};

function createProgram(gl: WebGLRenderingContext, vshader: string, fshader: string): WebGLProgram | null {
  const v_shader = loadShader(gl, gl.VERTEX_SHADER, vshader);
  const f_shader = loadShader(gl, gl.FRAGMENT_SHADER, fshader);
  if (!v_shader || !f_shader) {
    return null;
  }

  const program = gl.createProgram();

  if (!program) {
    console.log("createProgram failed");
    return null;
  }
  gl.attachShader(program, v_shader);
  gl.attachShader(program, f_shader);

  gl.linkProgram(program);

  const complete = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (!complete) {
    const error = gl.getProgramInfoLog(program);
    console.log(`fail to linkProgram: \n ${error}`);
    return null;
  }
  gl.useProgram(program);
  return program;
}


function loadShader(gl: WebGLRenderingContext, type: number, source: string): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) {
    console.log("fail to createShader");
    return null;
  }
  gl.shaderSource(shader, source);

  gl.compileShader(shader);

  const complete = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (!complete) {
    const error = gl.getShaderInfoLog(shader);
    console.log(`fail to compileShader: \n ${error}`);
    return null;
  }
  return shader;
}