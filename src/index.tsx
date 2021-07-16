import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.scss";
import * as serviceWorker from "./serviceWorker";
// import Cookies from "js-cookie";
// import { toLogin } from "./services/HttpService";
// //
// const url: string = document.location.href;
// const token = url.split("?token=");
// if (token[1]) {
// 	const expireTime: envStore = {
// 		development: (1 / 24) * 5,
// 		production: 1 / 24,
// 		test: (1 / 24) * 5,
// 	};
// 	Cookies.set("token", token[1], {
// 		expires: expireTime[process.env.NODE_ENV],
// 	});
// 	document.location.href = "/";
// }
// if (!token) {
// 	toLogin();
// }

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
