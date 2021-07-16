import { Program } from "typescript";

declare type StoreValue = any;

declare interface Store {
	[index: string]: StoreValue;
}

declare interface envStore {
	development: StoreValue;
	production: StoreValue;
	test: StoreValue;
}

declare interface WebGLRenderingContext {
	program: Program;
}