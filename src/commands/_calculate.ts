import logger from '../cli/logger';
import Prompt from '../cli/prompt';
import { Command } from '../interfaces/command.interface';

export default class Calculate implements Command {
    private display: number = 0;
    private operationStack: Array<string> = ["0"];

    async exec(): Promise<void> {
        let input;
        logger.success(this.display);
        
        // Constantly prompts users.
        while (true) {
            try {
                input = await new Prompt('Enter operation (or "exit" to quit):').exec();
                logger.success(this._calculate(input));

            } catch (error) {
                logger.error(error);
            }
        }
    }

    private _calculate(input: string) :number {
        const splitByOperators: RegExp = /(\*|\/|\+|\-)/;
        const assignType: any = (element: string) => isNaN(parseFloat(element)) ? element : parseFloat(element);
        const elements: Array<any> = input.split(splitByOperators).map(assignType);
        const operationsInOrder: Array<Record<string, (a: number, b: number) => number>> = [
            {
                '*': (a: number, b: number) => a * b,
                '/': (a: number, b: number) => a / b
            },
            {
                '+': (a: number, b: number) => a + b,
                '-': (a: number, b: number) => a - b
            }
        ];

        operationsInOrder.forEach(operators => {
            // Starting from the first operator.
            let i = 1;
            
            while (i < elements.length) {
                const operator = elements[i];
                // Skips if it's not the current operators we're processing.
                if (operators[operator]) {
                    // Factorization
                    elements[i - 1] = operators[operator](elements[i - 1], elements[i + 1]);
                    elements.splice(i, 2);
                }
                else
                    i += 2;
            }
        });

        return elements[0];
    }

    private _addOperationToStack(input: string) :Array<string> {
        this.operationStack.push(input);
        return this.operationStack;
    }

    private _setOperationsStack(stack: Array<string>) :Array<string> {
        return this.operationStack = stack;
    }

    private _setDisplay(display: number) :number {
        return this.display = display;
    }

    private _resetState() :void {
        this.display = 0;
        this.operationStack = ["0"];
    }
}
