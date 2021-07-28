import { getContext } from "@/utils/extends";
import React, { useEffect } from "react";
import VSHADER from "./index.vs.glsl";
import FSHADER from "./index.fs.glsl";
import { drawLightedCube } from "./draw";
function LightedCube() {
	useEffect(() => {
		const gl = getContext("LightedCube", VSHADER, FSHADER);
		if (!gl) {
			console.log("no gl");
			return;
		}
		drawLightedCube(gl);
	}, []);
	return <canvas width="400" height="400" id="LightedCube"></canvas>;
}

export default LightedCube;
