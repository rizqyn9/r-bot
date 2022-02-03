let test = "# dasd asdasd";
import type { Prefix } from "../type";
import { getNumber } from "../utils";

const prefix = (msg: string, prefix = "#"): any => {
	let parse = msg.trim().toLowerCase();
	let cmd = msg
		.slice(msg.indexOf(prefix) + 1)
		.split(" ", 4)
		.filter((res) => res);

	return {
		cmd1: cmd,
		cmd2: msg.indexOf("#"),
	};
};

// console.log(prefix(test));

let examp1 = "628985665498@s.whatsapp.net";

console.log(getNumber(examp1));
