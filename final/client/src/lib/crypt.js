import cryptoJs from "crypto-js";
const key = "test";

export function enc(str) {
	return cryptoJs.AES.encrypt(str, key).toString();
}

export function dec(str) {
	return cryptoJs.AES.decrypt(str, key).toString(cryptoJs.enc.Utf8);
}
