import logger from '../cli/logger';
import { Command } from '../interfaces/command.interface';

export default class Info implements Command {
  public async exec(): Promise<void> {
    const author = require("../../package.json").author;
    const repo = "https://github.com/glemiere/calculator-cli/"

    logger.success(`Author: ${author}.`);
    logger.success(`Repo: ${repo}.`);
  }
}
