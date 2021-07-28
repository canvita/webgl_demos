import { checkLocation } from "@/utils/checkers";
import { Matrix4, Vector3 } from "@/utils/cuon-matrix";
import { WebGL } from "@/utils/extends";
import { size } from "lodash";

export function drawLightedCube(gl: WebGL) {
	const n = initVertexs(gl);
	// requestAnimationFrame(rotating.bind(null, gl, n));
	initUniforms(gl);
	keyDown(gl, n);
	window.onkeydown = keyDown.bind(null, gl, n);
}

// let angle = 0;
// const STEP = 1;
// function rotating(gl: WebGL, n: number) {
// 	angle += STEP;
// 	initMatrix(gl, angle);
// 	gl.clearColor(0, 0, 0, 1.0);
// 	gl.clear(gl.COLOR_BUFFER_BIT);
// 	gl.drawArrays(gl.TRIANGLES, 0, n);
// 	requestAnimationFrame(rotating.bind(null, gl, n));
// }

let angle = 3;
const STEP = 10;
function keyDown(gl: WebGL, n: number, e?: KeyboardEvent) {
	if (e?.keyCode == 39) {
		angle += STEP;
	} else if (e?.keyCode == 37) {
		angle -= STEP;
	}
	initMatrix(gl, angle);
	gl.clearColor(0, 0, 0, 1.0);
	gl.enable(gl.DEPTH_TEST);
	// gl.enable(gl.POLYGON_OFFSET_FILL);
	// gl.polygonOffset(1.0, 1.0); // 深度冲突
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT); // 深度检测
	// gl.clear(gl.COLOR_BUFFER_BIT); // 深度冲突
	gl.drawElements(gl.TRIANGLES, n, gl.UNSIGNED_BYTE, 0);
}
function initVertexs(gl: WebGL) {
	// Create a cube
	//    v6----- v5
	//   /|      /|
	//  v1------v0|
	//  | |     | |
	//  | |v7---|-|v4
	//  |/      |/
	//  v2------v3
	const vertices = new Float32Array([
		// Coordinates
		1.0,
		1.0,
		1.0,
		-1.0,
		1.0,
		1.0,
		-1.0,
		-1.0,
		1.0,
		1.0,
		-1.0,
		1.0, // v0-v1-v2-v3 front
		1.0,
		1.0,
		1.0,
		1.0,
		-1.0,
		1.0,
		1.0,
		-1.0,
		-1.0,
		1.0,
		1.0,
		-1.0, // v0-v3-v4-v5 right
		1.0,
		1.0,
		1.0,
		1.0,
		1.0,
		-1.0,
		-1.0,
		1.0,
		-1.0,
		-1.0,
		1.0,
		1.0, // v0-v5-v6-v1 up
		-1.0,
		1.0,
		1.0,
		-1.0,
		1.0,
		-1.0,
		-1.0,
		-1.0,
		-1.0,
		-1.0,
		-1.0,
		1.0, // v1-v6-v7-v2 left
		-1.0,
		-1.0,
		-1.0,
		1.0,
		-1.0,
		-1.0,
		1.0,
		-1.0,
		1.0,
		-1.0,
		-1.0,
		1.0, // v7-v4-v3-v2 down
		1.0,
		-1.0,
		-1.0,
		-1.0,
		-1.0,
		-1.0,
		-1.0,
		1.0,
		-1.0,
		1.0,
		1.0,
		-1.0, // v4-v7-v6-v5 back
	]);

	const colors = new Float32Array([
		// Colors
		1,
		0,
		0,
		1,
		0,
		0,
		1,
		0,
		0,
		1,
		0,
		0, // v0-v1-v2-v3 front
		1,
		0,
		0,
		1,
		0,
		0,
		1,
		0,
		0,
		1,
		0,
		0, // v0-v3-v4-v5 right
		1,
		0,
		0,
		1,
		0,
		0,
		1,
		0,
		0,
		1,
		0,
		0, // v0-v5-v6-v1 up
		1,
		0,
		0,
		1,
		0,
		0,
		1,
		0,
		0,
		1,
		0,
		0, // v1-v6-v7-v2 left
		1,
		0,
		0,
		1,
		0,
		0,
		1,
		0,
		0,
		1,
		0,
		0, // v7-v4-v3-v2 down
		1,
		0,
		0,
		1,
		0,
		0,
		1,
		0,
		0,
		1,
		0,
		0, // v4-v7-v6-v5 back
	]);

	const normals = new Float32Array([
		// Normal
		0.0,
		0.0,
		1.0,
		0.0,
		0.0,
		1.0,
		0.0,
		0.0,
		1.0,
		0.0,
		0.0,
		1.0, // v0-v1-v2-v3 front
		1.0,
		0.0,
		0.0,
		1.0,
		0.0,
		0.0,
		1.0,
		0.0,
		0.0,
		1.0,
		0.0,
		0.0, // v0-v3-v4-v5 right
		0.0,
		1.0,
		0.0,
		0.0,
		1.0,
		0.0,
		0.0,
		1.0,
		0.0,
		0.0,
		1.0,
		0.0, // v0-v5-v6-v1 up
		-1.0,
		0.0,
		0.0,
		-1.0,
		0.0,
		0.0,
		-1.0,
		0.0,
		0.0,
		-1.0,
		0.0,
		0.0, // v1-v6-v7-v2 left
		0.0,
		-1.0,
		0.0,
		0.0,
		-1.0,
		0.0,
		0.0,
		-1.0,
		0.0,
		0.0,
		-1.0,
		0.0, // v7-v4-v3-v2 down
		0.0,
		0.0,
		-1.0,
		0.0,
		0.0,
		-1.0,
		0.0,
		0.0,
		-1.0,
		0.0,
		0.0,
		-1.0, // v4-v7-v6-v5 back
	]);

	// Indices of the vertices
	const indices = new Uint8Array([
		0,
		1,
		2,
		0,
		2,
		3, // front
		4,
		5,
		6,
		4,
		6,
		7, // right
		8,
		9,
		10,
		8,
		10,
		11, // up
		12,
		13,
		14,
		12,
		14,
		15, // left
		16,
		17,
		18,
		16,
		18,
		19, // down
		20,
		21,
		22,
		20,
		22,
		23, // back
	]);

	bindArrayBuffer(gl, vertices, 3, gl.FLOAT, "a_Position");
	bindArrayBuffer(gl, colors, 3, gl.FLOAT, "a_Color");
	bindArrayBuffer(gl, normals, 3, gl.FLOAT, "a_Normal");

	const elementsBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, elementsBuffer);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);
	return indices.length;
}

function initMatrix(gl: WebGL, angle: number) {
	const mvpMatrix = new Matrix4();
	mvpMatrix.setPerspective(30, 1, 1, 100);
	mvpMatrix.lookAt(3, 3, 7, 0, 0, 0, 0, 1, 0);

	const modelMatrix = new Matrix4();
	modelMatrix.rotate(angle, 0, 1, 0);

	const normalMatrix = new Matrix4();
	normalMatrix.setInverseOf(modelMatrix);
	normalMatrix.transpose();
	const u_NormalMatrix = gl.getUniformLocation(gl.program, "u_NormalMatrix");
	gl.uniformMatrix4fv(u_NormalMatrix, false, normalMatrix.elements);

	mvpMatrix.concat(modelMatrix);
	const u_MvpMatrix = gl.getUniformLocation(gl.program, "u_MvpMatrix");
	gl.uniformMatrix4fv(u_MvpMatrix, false, mvpMatrix.elements);
}

function initUniforms(gl: WebGL) {
	// [0.5, 3.0, 4.0] 1.0 1.0

	const u_LightPosition = gl.getUniformLocation(gl.program, "u_LightPosition");
	const u_LightColor = gl.getUniformLocation(gl.program, "u_LightColor");
	const u_AmbientColor = gl.getUniformLocation(gl.program, "u_AmbientColor");
	gl.uniform3f(u_LightColor, 1.0, 1.0, 1.0);
	const lightPosition = new Vector3([0, 3.0, 4.0]);
	gl.uniform3fv(u_LightPosition, lightPosition.elements);

	gl.uniform3f(u_AmbientColor, 0.2, 0.2, 0.2);
}

function bindArrayBuffer(
	gl: WebGL,
	size: Float32Array,
	num: number,
	type: number,
	position: string,
) {
	const buffer = gl.createBuffer();

	gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
	gl.bufferData(gl.ARRAY_BUFFER, size, gl.STATIC_DRAW);

	const a_position = gl.getAttribLocation(gl.program, position);
	gl.vertexAttribPointer(a_position, num, type, false, 0, 0);
	gl.enableVertexAttribArray(a_position);
}
