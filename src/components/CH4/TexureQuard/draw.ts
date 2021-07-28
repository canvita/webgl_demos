import { WebGL } from "@/utils/extends";
export function texureQuard(gl: WebGL) {
	const n = initVertexs(gl);
	gl.clearColor(0, 0, 1, 1.0);
	initTexture(gl, n);
}

function initVertexs(gl: WebGL) {
	const vertexs = new Float32Array([
		-1.0, 1.0, 0, 1.0, -1.0, -1.0, 0.0, 0.0, 1.0, 1.0, 1.0, 1.0, 1.0, -1.0, 1.0, -0.0,
	]);
	const size = vertexs.BYTES_PER_ELEMENT;
	const buffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
	gl.bufferData(gl.ARRAY_BUFFER, vertexs, gl.STATIC_DRAW);

	const a_Positoin = gl.getAttribLocation(gl.program, "a_Position");

	if (a_Positoin < 0) {
		console.log("no a_Position");
	}
	gl.vertexAttribPointer(a_Positoin, 2, gl.FLOAT, false, 4 * size, 0);
	gl.enableVertexAttribArray(a_Positoin);

	const a_TexCoord = gl.getAttribLocation(gl.program, "a_TexCoord");
	if (a_TexCoord < 0) {
		console.log("no a_TexCoord");
	}
	gl.vertexAttribPointer(a_TexCoord, 2, gl.FLOAT, false, 4 * size, 2 * size);
	gl.enableVertexAttribArray(a_TexCoord);

	return 4;
}

function initTexture(gl: WebGL, n: number) {
	const texture = gl.createTexture();

	if (!texture) {
		console.log("Failed to create the texture object");
		return false;
	}
	const image = new Image();

	const u_Sampler = gl.getUniformLocation(gl.program, "u_Sampler");
	if (!u_Sampler) {
		console.log("Failed to get the storage location of u_Sampler");
		return false;
	}
	image.onload = function () {
		if (texture) {
			loadTexure(gl, texture, image, n, u_Sampler);
		}
	};
	image.src = "./sky.jpg";
}

function loadTexure(
	gl: WebGL,
	texture: WebGLTexture,
	image: HTMLImageElement,
	n: number,
	u_Sampler: WebGLUniformLocation,
) {
	gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
	gl.activeTexture(gl.TEXTURE0);
	gl.bindTexture(gl.TEXTURE_2D, texture);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);
	gl.uniform1i(u_Sampler, 0);
	gl.clear(gl.COLOR_BUFFER_BIT);
	gl.drawArrays(gl.TRIANGLE_STRIP, 0, n);
}
