let test = "# dasd asdasd";
let testSignUp = "#daftar test asdahd | asdasd";
import type { Prefix } from "../type";
import { getNumber } from "../utils";

function getPrefix(msg: string, prefix: string = "#"): Prefix | false {
	if (msg.indexOf(prefix) >= 0) {
		let noPrefix = msg.slice(msg.indexOf(prefix) + 1);
		let cmd = noPrefix.trim().split(" ", 4);

		return {
			prefix,
			cmd1: cmd[0],
			cmd2: cmd[1],
			text: noPrefix.trim(),
			any: cmd,
		};
	} else return false;
}

function parseSignUp(msg: string) {
	let prefix = getPrefix(msg);
	console.log(prefix);
	if (prefix) {
		return prefix.text
			?.replace(prefix.cmd1, "")
			.trim()
			.split("|")
			.map((val) => val.trim());
	}
}

console.log(parseSignUp(testSignUp));

let examp1 = "628985665498@s.whatsapp.net";
console.log(getNumber(examp1));
