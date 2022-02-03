export function getNumber(jid: string): string | undefined {
	return jid.replace("@s.whatsapp.net", "");
}
