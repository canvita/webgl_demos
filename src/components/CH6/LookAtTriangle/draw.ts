import { checkLocation } from "@/utils/checkers";
import { Matrix4 } from "@/utils/cuon-matrix";
import { WebGL } from "@/utils/extends";

export function lookatTriangel(gl: WebGL) {
	const n = initVertexs(gl);
	// requestAnimationFrame(rotating.bind(null, gl, n));
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

let x = 0.25;
const STEP = 0.01;
function keyDown(gl: WebGL, n: number, e?: KeyboardEvent) {
	if (e?.keyCode == 39) {
		x += STEP;
	} else if (e?.keyCode == 37) {
		x -= STEP;
	}
	initMatrix(gl, x);
	gl.clearColor(0, 0, 0, 1.0);
	// gl.enable(gl.DEPTH_TEST);
	gl.enable(gl.POLYGON_OFFSET_FILL);
	gl.polygonOffset(1.0, 1.0);
	// gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT); // 深度冲突
	gl.clear(gl.COLOR_BUFFER_BIT);
	gl.drawArrays(gl.TRIANGLES, 0, n);
}
function initVertexs(gl: WebGL) {
	const verticesColors = new Float32Array([
		// Vertex coordinates and color(RGBA)

		0.5,
		0.4,
		-0.2,
		1.0,
		0.4,
		0.4, // The middle yellow one
		-0.5,
		0.4,
		-0.2,
		1.0,
		1.0,
		0.4,
		0.0,
		-0.6,
		-0.2,
		1.0,
		1.0,
		0.4,

		0.0,
		0.5,
		-0.2,
		0.4,
		0.4,
		1.0, // The front blue one
		-0.5,
		-0.5,
		-0.2,
		0.4,
		0.4,
		1.0,
		0.5,
		-0.5,
		-0.2,
		1.0,
		0.4,
		0.4,

		0.0,
		0.5,
		-0.2,
		0.4,
		1.0,
		0.4, // The back green one
		-0.5,
		-0.5,
		-0.2,
		0.4,
		1.0,
		0.4,
		0.5,
		-0.5,
		-0.2,
		1.0,
		0.4,
		0.4,
	]);

	const size = verticesColors.BYTES_PER_ELEMENT;
	const buffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
	gl.bufferData(gl.ARRAY_BUFFER, verticesColors, gl.STATIC_DRAW);

	const a_Position = gl.getAttribLocation(gl.program, "a_Position");
	checkLocation(a_Position, "a_Position");

	gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 6 * size, 0);
	gl.enableVertexAttribArray(a_Position);

	const a_Color = gl.getAttribLocation(gl.program, "a_Color");
	checkLocation(a_Color, "a_Color");
	gl.vertexAttribPointer(a_Color, 3, gl.FLOAT, false, 6 * size, 3 * size);
	gl.enableVertexAttribArray(a_Color);
	return verticesColors.length / 6;
}

function initMatrix(gl: WebGL, x: number) {
	const viewMatrix = new Matrix4();
	viewMatrix.setLookAt(x, 0.25, 0.25, 0, 0, 0, 0, 1.0, 0);

	const modelMatrix = new Matrix4();
	modelMatrix.setRotate(0, 0, 1, 0);

	const projMatrix = new Matrix4();
	// projMatrix.setOrtho(-2.0, 2.0, -2.0, 2.0, 0.0, 100.0); // 盒状可视空间
	projMatrix.setPerspective(60, 1.0, 1, 20); // 投影可视空间
	const u_MvpMatrix = gl.getUniformLocation(gl.program, "u_MvpMatrix");

	const mvpMatrix = new Matrix4();
	mvpMatrix.set(projMatrix).concat(modelMatrix).concat(viewMatrix);
	gl.uniformMatrix4fv(u_MvpMatrix, false, mvpMatrix.elements);
}
