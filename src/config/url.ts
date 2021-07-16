const hosts = (window as StoreValue).hosts;

export const API_SERVER = hosts[process.env.NODE_ENV].api;
export const LOGIN_PAGE = hosts[process.env.NODE_ENV].login;
