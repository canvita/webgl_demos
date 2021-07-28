import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { getContext } from "@/utils/extends";
import VSHADER_SOURCE from "./index.vs.glsl";
import FSHADER_SOURCE from "./index.fs.glsl";
import { rotatedTranslateTriangle } from "./draw";
function RotatedTriangle() {
	useEffect(() => {
		const gl = getContext("webgl", VSHADER_SOURCE, FSHADER_SOURCE);
		if (!gl) {
			return;
		}
		rotatedTranslateTriangle(gl);
	}, []);
	return <canvas id="webgl"></canvas>;
}

export default observer(RotatedTriangle);
