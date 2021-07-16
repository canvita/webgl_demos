import { observable, action, makeAutoObservable } from "mobx";

const scale = 0.9;
class ConfigStore {
	constructor() {
		makeAutoObservable(this);
		const docEl = document.documentElement;
		const rem = (window.innerWidth / 1920) * scale;
		this.rem = rem;
		docEl.style.fontSize = `${this.rem}px`;
		const resizeEvt = "orientationchange" in window ? "orientationchange" : "resize";
		const recalc = () => {
			const docEl = document.documentElement;
			const rem = (window.innerWidth / 1920) * scale;
			docEl.style.fontSize = `${rem}px`;
			this.setRem(rem);
		};
		if (!document.addEventListener) return;
		window.addEventListener(resizeEvt, recalc, false);
		document.addEventListener("DOMContentLoaded", recalc, false);
	}
	rem: number;

	setRem = (rem: number) => {
		this.rem = rem;
	};

	toRem = (num: number) => {
		return this.rem * num;
	};
}

export default new ConfigStore();
