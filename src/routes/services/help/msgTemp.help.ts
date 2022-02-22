import { AnyMessageContent } from "@adiwajshing/baileys";

type HelpTemp = "help";
const helpTempMsg: Record<HelpTemp, AnyMessageContent> = {
  help: {
    title: "Help",
    text: "Ini merupakan list perintah yang tersedia",
    footer: "RDev Studio",
    buttonText: "Lihat selengkapnya",
    sections: [
      {
        title: "Features",
        rows: [
          {
            title: "#help",
            description: "Something",
            rowId: "#help",
          },
        ],
      },
    ],
  },
};

export { helpTempMsg };
