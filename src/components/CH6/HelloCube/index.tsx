import { getContext } from "@/utils/extends";
import React, { useEffect } from "react";
import VSHADER from "./index.vs.glsl";
import FSHADER from "./index.fs.glsl";
import { drawCube } from "./draw";
function HelloCube() {
	useEffect(() => {
		const gl = getContext("HelloCube", VSHADER, FSHADER);
		if (!gl) {
			console.log("no gl");
			return;
		}
		drawCube(gl);
	}, []);
	return <canvas width="400" height="400" id="HelloCube"></canvas>;
}

export default HelloCube;
