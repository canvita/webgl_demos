import { getContext } from "@/utils/extends";
import React, { useEffect } from "react";
import VSHADER from "./index.vs.glsl";
import FSHADER from "./index.fs.glsl";
import { drawJointModel } from "./draw";
function JointModel() {
	useEffect(() => {
		const gl = getContext("JointModel", VSHADER, FSHADER);
		if (!gl) {
			console.log("no gl");
			return;
		}
		drawJointModel(gl);
	}, []);
	return <canvas width="300" height="300" id="JointModel">JointModel</canvas>;
}

export default JointModel;
