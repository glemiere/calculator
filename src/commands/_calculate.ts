import logger from '../cli/logger';
import Prompt from '../cli/prompt';
import { Command } from '../interfaces/command.interface';

export default class Calculate implements Command {
    async exec(): Promise<void> {
        let input;
        // Constantly prompts users.
        while (true) {
            try {
                input = await new Prompt('Enter operation (or "exit" to quit):').exec();
            } catch (error) {
                logger.error(error);
            }
        }
    }
}
