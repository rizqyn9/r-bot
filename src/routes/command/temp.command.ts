import { AnyMessageContent } from "@adiwajshing/baileys";

type keyMsg = "data";
const tempMessage: Record<keyMsg, AnyMessageContent> = {
  data: {
    title: "Custom command",
    text: "dengan custom command memungkina pengguna untuk membuat perintah dan jawaban sendiri",
    buttonText: "Cara penggunaan",
    buttons: [
      {
        buttonId: "1",
        type: 2,
        buttonText: { displayText: "Test flow" },
        nativeFlowInfo: { paramsJson: "Testt flow" },
      },
      {
        buttonId: "2",
        type: 1,
        buttonText: { displayText: "Test Response" },
        nativeFlowInfo: { paramsJson: "Testt Response" },
      },
    ],
    // templateButtons: [
    //     {
    //         index: 1,
    //         quickReplyButton
    //     }
    // ]
    // sections: [
    //   {
    //     title: "Perintah command",
    //     rows: [
    //       {
    //         title: "Tambah Perintah",
    //         description: "perintah untuk membuat custom command",
    //       },
    //     ],
    //   },
    // ],
  },
};

export { tempMessage };
