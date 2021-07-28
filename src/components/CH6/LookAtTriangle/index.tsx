import { getContext } from "@/utils/extends";
import React, { useEffect } from "react";
import VSHADER from "./index.vs.glsl";
import FSHADER from "./index.fs.glsl";
import { lookatTriangel } from "./draw";
function LookAtTriangle() {
	useEffect(() => {
		const gl = getContext("LookAtTriangle", VSHADER, FSHADER);
		if (!gl) {
			console.log("no gl");
			return;
		}
		lookatTriangel(gl);
	}, []);
	return <canvas id="LookAtTriangle"></canvas>;
}

export default LookAtTriangle;
