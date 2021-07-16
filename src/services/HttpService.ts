import axios, { AxiosError, AxiosResponse } from "axios";
import Cookies from "js-cookie";
import * as Urls from "@/config/url";
import { message } from "antd";
export interface WidthDataResponse<T = Store> {
	data: T;
	status: boolean;
}

function success<DataType>(res: AxiosResponse): DataType {
	if (res.status >= 200 && res.status < 300) {
		return res.data;
	} else {
		throw new Error(`请求状态码错误, ${res.status}, ${res.statusText}`);
	}
}

let messaged = false;
function fail(e: AxiosError): never {
	if (`${e}`.includes("401")) {
		!messaged && message.error("登录已过期!", 2, toLogin);
		messaged = true;
	}
	throw e;
}
export function logOut(): void {
	Cookies.remove("token");
	toLogin();
}

export function toLogin(): void {
	window.location.href = `${Urls.LOGIN_PAGE}?ref=${location.href}`;
}
export async function get<DataType>(url: string, params?: Store): Promise<DataType | never> {
	try {
		const res = await axios.get(url, {
			params,
			headers: { Authorization: `Bearer ${Cookies.get("token")}` },
		});
		return success(res);
	} catch (e) {
		fail(e);
	}
}

export async function _delete(url: string, params?: Store): Promise<unknown> {
	try {
		const res = await axios.delete(url, { params });
		return success(res);
	} catch (e) {
		return fail(e);
	}
}

export async function post<DataType>(url: string, data?: Store): Promise<DataType | never> {
	try {
		const res = await axios.post(url, data, {
			headers: { Authorization: `Bearer ${Cookies.get("token")}` },
		});
		return success(res);
	} catch (e) {
		fail(e);
	}
}

export async function put(url: string, data?: Store): Promise<unknown> {
	try {
		const res = await axios.put(url, data);
		return success(res);
	} catch (e) {
		return fail(e);
	}
}
