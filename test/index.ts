let test = "# dasd asdasd";
import type { Prefix } from "../src/type";

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

console.log(prefix(test));
