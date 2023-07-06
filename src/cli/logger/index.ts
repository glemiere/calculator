import readline from "readline";
import colors from "./colors";
import errors from "./errors";

class Logger {
    public isPrompting: boolean;
    public errors: typeof errors;
    private rl: readline.Interface;

    constructor() {
        this.isPrompting = false;
        this.errors = errors;

        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
            terminal: false,
        });
    }

    public log(message: any, ...optionalParams: any[]) :void {
        readline.cursorTo(process.stdout, 0);
        process.stdout.write(`${colors.text.WHITE}${message}${colors.text.WHITE}\n`);

        if (this.isPrompting)
            this.rl.prompt(true);
    };

    public info(message: any, ...optionalParams: any[]) :void {
        readline.cursorTo(process.stdout, 0);
        process.stdout.write(`${colors.text.YELLOW}${message}${colors.text.WHITE}\n`);

        if (this.isPrompting)
            this.rl.prompt(true);
    };

    public error(message: any, ...optionalParams: any[]) :void {
        readline.cursorTo(process.stdout, 0);
        process.stdout.write(`${colors.text.RED}${message}${colors.text.WHITE}\n`);

        if (this.isPrompting)
            this.rl.prompt(true);
    };

    public success(message: any, ...optionalParams: any[]) :void {
        readline.cursorTo(process.stdout, 0);
        process.stdout.write(`${colors.text.GREEN}${message}${colors.text.WHITE}\n`);

        if (this.isPrompting)
            this.rl.prompt(true);
    };

    public startPrompting() :void {
        this.isPrompting = true;
    }

    public stopPrompting() :void {
        this.isPrompting = false;
    }

    public close() {
        this.rl.close();
    }
}

export default new Logger();
