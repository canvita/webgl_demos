import { Matrix4 } from "@/utils/cuon-matrix";
import { WebGL } from "@/utils/extends";

export function drawJointModel(gl: WebGL) {
  const n = initVertexs(gl);
  initUniforms(gl);
  initMatrix();
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.enable(gl.DEPTH_TEST);
  draw(gl, n);
  window.onkeydown = keydown.bind(null, gl, n);
}

let b_angle = 0;
let t_angle = 0;
const ANGLE_STEP = 3.0;
let g_vpMatrix: Matrix4;
const g_modelMatrix = new Matrix4();
function keydown( gl: WebGL, n:number,ev: KeyboardEvent) {
	switch (ev.keyCode) {
		case 38: // Up arrow key -> the positive rotation of joint1 around the z-axis
			if (t_angle < 135.0) t_angle += ANGLE_STEP;
			break;
		case 40: // Down arrow key -> the negative rotation of joint1 around the z-axis
			if (t_angle > -135.0) t_angle -= ANGLE_STEP;
			break;
		case 39: // Right arrow key -> the positive rotation of arm1 around the y-axis
    b_angle = (b_angle + ANGLE_STEP) % 360;
			break;
		case 37: // Left arrow key -> the negative rotation of arm1 around the y-axis
    b_angle = (b_angle - ANGLE_STEP) % 360;
			break;
		default:
			return; // Skip drawing at no effective action
	}
	// Draw the robot arm
	draw(gl, n);
}
function initVertexs(gl:WebGL) {
  const vertices = new Float32Array([
    1.5, 10.0, 1.5, -1.5, 10.0, 1.5, -1.5,  0.0, 1.5,  1.5,  0.0, 1.5, // v0-v1-v2-v3 front
    1.5, 10.0, 1.5,  1.5,  0.0, 1.5,  1.5,  0.0,-1.5,  1.5, 10.0,-1.5, // v0-v3-v4-v5 right
    1.5, 10.0, 1.5,  1.5, 10.0,-1.5, -1.5, 10.0,-1.5, -1.5, 10.0, 1.5, // v0-v5-v6-v1 up
   -1.5, 10.0, 1.5, -1.5, 10.0,-1.5, -1.5,  0.0,-1.5, -1.5,  0.0, 1.5, // v1-v6-v7-v2 left
   -1.5,  0.0,-1.5,  1.5,  0.0,-1.5,  1.5,  0.0, 1.5, -1.5,  0.0, 1.5, // v7-v4-v3-v2 down
    1.5,  0.0,-1.5, -1.5,  0.0,-1.5, -1.5, 10.0,-1.5,  1.5, 10.0,-1.5  // v4-v7-v6-v5 back
  ]);
   // Normal
   const normals = new Float32Array([
    0.0, 0.0, 1.0,  0.0, 0.0, 1.0,  0.0, 0.0, 1.0,  0.0, 0.0, 1.0, // v0-v1-v2-v3 front
    1.0, 0.0, 0.0,  1.0, 0.0, 0.0,  1.0, 0.0, 0.0,  1.0, 0.0, 0.0, // v0-v3-v4-v5 right
    0.0, 1.0, 0.0,  0.0, 1.0, 0.0,  0.0, 1.0, 0.0,  0.0, 1.0, 0.0, // v0-v5-v6-v1 up
   -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, // v1-v6-v7-v2 left
    0.0,-1.0, 0.0,  0.0,-1.0, 0.0,  0.0,-1.0, 0.0,  0.0,-1.0, 0.0, // v7-v4-v3-v2 down
    0.0, 0.0,-1.0,  0.0, 0.0,-1.0,  0.0, 0.0,-1.0,  0.0, 0.0,-1.0  // v4-v7-v6-v5 back
  ]);

  // Indices of the vertices
  const indices = new Uint8Array([
     0, 1, 2,   0, 2, 3,    // front
     4, 5, 6,   4, 6, 7,    // right
     8, 9,10,   8,10,11,    // up
    12,13,14,  12,14,15,    // left
    16,17,18,  16,18,19,    // down
    20,21,22,  20,22,23     // back
  ]);

  // vertices
  const v_buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, v_buffer);
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

  const a_Position = gl.getAttribLocation(gl.program, "a_Position");
  gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(a_Position);

  const n_buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, n_buffer);
  gl.bufferData(gl.ARRAY_BUFFER, normals, gl.STATIC_DRAW);

  const a_Normal = gl.getAttribLocation(gl.program, "a_Normal");
  gl.vertexAttribPointer(a_Normal, 3, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(a_Normal);

  gl.bindBuffer(gl.ARRAY_BUFFER, null);

  const i_buffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, i_buffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);

  return indices.length;
}

function initUniforms(gl:WebGL) {
  const u_LightColor = gl.getUniformLocation(gl.program, "u_LightColor");
  const u_AmbientColor = gl.getUniformLocation(gl.program, "u_AmbientColor");
  const u_LightPosition = gl.getUniformLocation(gl.program, "u_LightPosition");
  gl.uniform3f(u_LightColor, 1.0, 1.0,1.0);
  gl.uniform3f(u_AmbientColor, 0.2, 0.2, 0.2);
  gl.uniform3f(u_LightPosition, 20, 100, 100);
}

function initMatrix() {
  const mvpMatrix = new Matrix4();
  mvpMatrix.setPerspective(50.0, 1, 1.0, 100.0);
  mvpMatrix.lookAt(20.0, 10.0, 30.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0);
  g_vpMatrix = mvpMatrix;
}

function draw(gl: WebGL, n: number) {
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  const u_MvpMatrix = gl.getUniformLocation(gl.program, "u_MvpMatrix");
  const u_NormalMatrix = gl.getUniformLocation(gl.program, "u_NormalMatrix");
  if (u_MvpMatrix && u_NormalMatrix) {
    g_modelMatrix.setRotate(b_angle, 0,1,0);
    drawBox(gl, n,u_MvpMatrix,u_NormalMatrix);
    g_modelMatrix.translate(0, 10.0, 0);
    g_modelMatrix.scale(1.2,1.2,1.2);
    g_modelMatrix.rotate(t_angle, 0,0,1);
    drawBox(gl, n,u_MvpMatrix,u_NormalMatrix);
  }
}

function drawBox(gl: WebGL, n:number,u_MvpMatrix: WebGLUniformLocation, u_NormalMatrix: WebGLUniformLocation) {
  const normalMatrix = new Matrix4();
  const mvpMatrix = new Matrix4();
  mvpMatrix.set(g_vpMatrix);
  mvpMatrix.concat(g_modelMatrix);
  gl.uniformMatrix4fv(u_MvpMatrix, false,mvpMatrix.elements);
  normalMatrix.setInverseOf(g_modelMatrix);
  normalMatrix.transpose();
  gl.uniformMatrix4fv(u_NormalMatrix, false, normalMatrix.elements);
  gl.drawElements(gl.TRIANGLES, n, gl.UNSIGNED_BYTE, 0);
}
 