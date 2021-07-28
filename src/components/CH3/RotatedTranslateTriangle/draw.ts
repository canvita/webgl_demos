import { Matrix4 } from "@/utils/cuon-matrix";
import { WebGL } from "@/utils/extends";

let angle = 0;
const step = 1;
export function rotatedTriangle(gl: WebGL) {
	const n = initVertexs(gl);
	function tick() {
		getUTransition(gl);
		gl.clearColor(0, 0, 0, 1.0);
		gl.clear(gl.COLOR_BUFFER_BIT);
		gl.drawArrays(gl.TRIANGLES, 0, n);
		requestAnimationFrame(tick);
	}
	requestAnimationFrame(tick);
}

function getUTransition(gl: WebGL) {
	angle += step;
	const transition = new Matrix4();
	transition.setRotate(angle, 0, 0, 1);
	const u_Transition = gl.getUniformLocation(gl.program, "u_Transition");
	gl.uniformMatrix4fv(u_Transition, false, transition.elements);
}

function initVertexs(gl: WebGL) {
	const vertexs = new Float32Array([
		0.0, 0.5, 1.0, 0.0, 0.0, -0.5, -0.5, 0.0, 1.0, 0.0, 0.5, -0.5, 0.0, 0.0, 1.0,
	]);
	const buffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
	gl.bufferData(gl.ARRAY_BUFFER, vertexs, gl.STATIC_DRAW);
	const size = vertexs.BYTES_PER_ELEMENT;
	const a_Positoin = gl.getAttribLocation(gl.program, "a_Position");
	gl.vertexAttribPointer(a_Positoin, 2, gl.FLOAT, false, 5 * size, 0);
	gl.enableVertexAttribArray(a_Positoin);

	const a_Color = gl.getAttribLocation(gl.program, "a_Color");
	gl.vertexAttribPointer(a_Color, 3, gl.FLOAT, false, 5 * size, 2 * size);
	gl.enableVertexAttribArray(a_Color);
	return vertexs.length / 5;
}
