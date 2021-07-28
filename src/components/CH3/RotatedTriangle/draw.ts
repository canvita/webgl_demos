import { WebGL } from "@/utils/extends";

export function rotatedTranslateTriangle(gl: WebGL) {
	const n = initVertexs(gl);
	getUTransition(gl, 180);
	gl.clearColor(0, 0, 0, 1.0);
	gl.clear(gl.COLOR_BUFFER_BIT);
	gl.drawArrays(gl.TRIANGLES, 0, n);
}

function getUTransition(gl: WebGL, angle: number) {
	/** rotate transition
	 * cosB -sinB 0 0.1
	 * sinB cosB 0 0.2
	 * 0 			0	 1 0.2
	 * 0 		  0  0 1
	 */
	const cosB = Math.cos((angle / 180) * Math.PI);
	const sinB = Math.sin((angle / 180) * Math.PI);
	const transition = new Float32Array([
		cosB,
		sinB,
		0.0,
		0.0,
		-sinB,
		cosB,
		0.0,
		0.0,
		0.0,
		0.0,
		1.0,
		0.0,
		0.4,
		0.2,
		0.0,
		1.0,
	]);
	const u_Transition = gl.getUniformLocation(gl.program, "u_Transition");
	gl.uniformMatrix4fv(u_Transition, false, transition);
}
// function getUTransition(gl: MyWebGL, angle: number) {
// 	/** scale transition
// 	 * 2 0 0 0.1
// 	 * 0 2 0 0.2
// 	 * 0 0 1 0.2
// 	 * 0 0 0 1
// 	 */

// 	const transition = new Float32Array([
// 		1.5, 0, 0.0, 0.0, 0, 1.2, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.1, 0.2, 0.0, 1.0,
// 	]);
// 	const u_Transition = gl.getUniformLocation(gl.program, "u_Transition");
// 	gl.uniformMatrix4fv(u_Transition, false, transition);
// }
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
