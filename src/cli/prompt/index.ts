import readline from "readline";
import logger from "../logger";

export default class Prompt {
    private question: string;
    private rl: readline.Interface;

    constructor(question: string) {
        this.question = question;

        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
            terminal: false,
        });
    }

    public exec(): Promise<string> {
        logger.startPrompting();

        return new Promise((resolve, reject) => {
            this.rl.question(`>> ${this.question}\n> `, (answer) => {
                this.rl.close();
                logger.stopPrompting();
                resolve(answer);
            });

            this.rl.on("error", (err) => {
                this.rl.close();
                logger.stopPrompting();
                reject(err);
            });
        });
    }
}
