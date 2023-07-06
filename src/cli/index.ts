import logger from "./logger";
import { CommandDescription } from '../interfaces/command.interface';

import {
  Info,
  Calculate
} from "../commands";

export default class Cli {
  public options: Array<CommandDescription>;
  public info: Info;
  public calculate: Calculate;

  constructor(
    public args: string[],
  ) {
    this.args            = args;
    this.options         = new Array();
    this.info            = new Info();
    this.calculate       = new Calculate();
  }

  public async init(): Promise<void> {
    this.options.push(
      {cmdStr: `help`, exec: this.help.bind(this)},
      {cmdStr: `info`, exec: this.info.exec.bind(this.info)},
      {cmdStr: `calculate`, exec: this.calculate.exec.bind(this.calculate)}
    );
  }

  public async exec(input: Array<string>): Promise<void> {
    const [command, args] = this._getCommand(input, this.options);

    if (command)
      await command.exec();
    
    else if (args.length > 0)
      logger.error(logger.errors.cli.CMD_NOT_FND);
    process.exit();
  }

  private _getCommand(args: Array<string>, commands: Array<CommandDescription>) :[CommandDescription, Array<string>] {
    let command :CommandDescription;
    
    commands.forEach((cmd:CommandDescription) => {        
      if (cmd.cmdStr === args[0] && args[1] && cmd.subs) {
        args.shift();
        [command, args] = this._getCommand(args, cmd.subs);
      }

      else if (cmd.cmdStr === args[0]) {
        args.shift();
        command = cmd;
      }
    });
    
    return [command, args];
  }

  public async welcome(): Promise<void> {
    const pkg     = require("../../package.json");
    const name    = pkg.name;
    const version = pkg.version;

    logger.log(`🔥 Currently using ${name} V${version} 🔥`);
    logger.log(`---------------------------------------`);
  }

  public async help(): Promise<void> {
    logger.info(`Usage: calculator [option].`);
    logger.log(`Available options:`);

    for (const opt of this.options)
      logger.log(`* ${opt.cmdStr}`);
  }
}
