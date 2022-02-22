import chalk from "chalk";
import figlet from "figlet";

export const FigletChalkStarter = (text: string) => {
  return console.log(
    chalk.redBright(
      figlet.textSync(text, {
        font: "Speed",
        horizontalLayout: "full",
      }),
    ),
  );
};
