export function getNumber(jid: string): string | undefined {
	return jid.replace("@s.whatsapp.net", "");
}

export function parseSymbol(text: string, symbol: string = "|"): string[] {
	return text.split(symbol).map((val) => val.trim());
}
