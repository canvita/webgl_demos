import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { getContext } from "@/utils/extends";
import VSHADER_SOURCE from "./index.vs.glsl";
import FSHADER_SOURCE from "./index.fs.glsl";
import { doubleTexture } from "./draw";
function DoubleTexture() {
	useEffect(() => {
		const gl = getContext("DoubleTexture", VSHADER_SOURCE, FSHADER_SOURCE);
		if (!gl) {
			console.log("no webgl");
			return;
		}

		doubleTexture(gl);
	}, []);
	return <canvas id="DoubleTexture" width="400" height="400"></canvas>;
}

export default observer(DoubleTexture);
