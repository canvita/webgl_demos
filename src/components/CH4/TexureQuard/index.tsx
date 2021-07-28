import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { getContext } from "@/utils/extends";
import VSHADER_SOURCE from "./index.vs.glsl";
import FSHADER_SOURCE from "./index.fs.glsl";
import { texureQuard } from "./draw";
function TexureQuard() {
	useEffect(() => {
		const gl = getContext("texture-quard", VSHADER_SOURCE, FSHADER_SOURCE);
		if (!gl) {
			console.log("no webgl");
			return;
		}

		texureQuard(gl);
	}, []);
	return <canvas id="texture-quard" width="400" height="400"></canvas>;
}

export default observer(TexureQuard);
