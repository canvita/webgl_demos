import { WebGL } from "@/utils/extends";
export function doubleTexture(gl: WebGL) {
	const n = initVertexs(gl);
	gl.clearColor(0, 0, 1, 1.0);
	initTexture(gl, n);
}

function initVertexs(gl: WebGL) {
	const vertexs = new Float32Array([
		// Vertex coordinates, texture coordinate
		-0.5, 0.5, 0.0, 1.0, -0.5, -0.5, 0.0, 0.0, 0.5, 0.5, 1.0, 1.0, 0.5, -0.5, 1.0, 0.0,
	]);
	const buffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
	gl.bufferData(gl.ARRAY_BUFFER, vertexs, gl.STATIC_DRAW);
	const size = vertexs.BYTES_PER_ELEMENT;

	const a_Position = gl.getAttribLocation(gl.program, "a_Position");

	if (a_Position < 0) {
		console.log("no a_Position");
	}
	gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 4 * size, 0);
	gl.enableVertexAttribArray(a_Position);

	const a_TexCoord = gl.getAttribLocation(gl.program, "a_TexCoord");
	if (a_TexCoord < 0) {
		console.log("no a_TexCoord");
	}

	gl.vertexAttribPointer(a_TexCoord, 2, gl.FLOAT, false, 4 * size, 2 * size);
	gl.enableVertexAttribArray(a_TexCoord);
	return vertexs.length / 4;
}

function loadImage(src: string): Promise<HTMLImageElement> {
	return new Promise((resolve, reject) => {
		const image = new Image();
		image.src = src;
		image.onload = () => {
			resolve(image);
		};
	});
}
async function initTexture(gl: WebGL, n: number) {
	const sky = await loadImage("/sky.jpg");
	const circle = await loadImage("/circle.gif");
	const u_Sampler = gl.getUniformLocation(gl.program, "u_Sampler");
	const u_Sampler2 = gl.getUniformLocation(gl.program, "u_Sampler2");

	if (!u_Sampler || u_Sampler < 0) {
		console.log("no u_Sampler");
		return;
	}
	if (!u_Sampler2 || u_Sampler2 < 0) {
		console.log("no u_Sampler");
		return;
	}
	const skyTex = gl.createTexture();
	const cirlceTex = gl.createTexture();
	if (!skyTex || !cirlceTex) {
		console.log("no texture");
		return;
	}
	loadTexure(gl, sky, u_Sampler, skyTex, gl.TEXTURE0, 0);
	loadTexure(gl, circle, u_Sampler2, cirlceTex, gl.TEXTURE1, 1);
	gl.clear(gl.COLOR_BUFFER_BIT);
	gl.drawArrays(gl.TRIANGLE_STRIP, 0, n);
}

function loadTexure(
	gl: WebGL,
	image: HTMLImageElement,
	location: WebGLUniformLocation,
	texture: WebGLTexture,
	base: number,
	textureNumber: number,
) {
	gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
	gl.activeTexture(base);
	gl.bindTexture(gl.TEXTURE_2D, texture);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
	gl.uniform1i(location, textureNumber);
}
