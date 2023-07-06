import logger from '../cli/logger';
import Prompt from '../cli/prompt';
import { Command } from '../interfaces/command.interface';

export default class Calculate implements Command {
    private display: number = 0;
    private operationStack: Array<string> = ["0"];

    public async exec(): Promise<void> {
        let input;
        logger.success(this.display);

        // Constantly prompts users.
        while (true) {
            try {
                input = await new Prompt('Enter operation (or "exit" to quit):').exec();
                this.processInput(input);
                logger.success(this.display);

            } catch (error) {
                logger.error(error);
            }
        }
    }

    public processInput(input: string): void {
        const commands: Record<string, Function> = {
            exit: () => process.exit(0),
            c: () => {
                this._resetState();
                input = '';
            }
        };
        const command = commands[input];

        if (command) command();
        this.processOperation(input);
    }

    public processOperation(input: string) :void {
        const [doesFinishWithEqual, stackableInput] = this.checkOperationValidity(input);
        const stack = this._addOperationToStack(stackableInput);

        if (doesFinishWithEqual) {
            const elements = this.prepareForCalculation(stack);
            const result = this._calculate(elements);
            this._setDisplay(result);
            this._setOperationsStack([result.toString()]);
        }

        if (!doesFinishWithEqual) {
            const display = this.consolidateUserInput(stack);
            this._setDisplay(display);
        }
    }

    public consolidateUserInput(stack: Array<string>) :number {
        const combinedStack = stack.join('');
        const splitByOperators = combinedStack.split(/[\+\-\*\/]/);

        let lastNumber = splitByOperators[splitByOperators.length - 1];
    
        if (lastNumber) {
            const toDisplay = this._applyNegations(lastNumber);
            return parseFloat(toDisplay);
        } else {
            return this.display;
        }
    }
    

    public checkOperationValidity(input: string) :[boolean, string] {
        const checkIfFinishWithEqual = (input: string) => input[input.length - 1] === '=' ? true : false;
        const doesFinishWithEqual = checkIfFinishWithEqual(input);

        if (this._isTryingToDivideByZero(input))
            throw new Error('Dividing by zero is not allowed. This entire input is ignored.');

        if (doesFinishWithEqual)
            input = input.slice(0, input.length - 1);

        return [doesFinishWithEqual, input];
    }

    public prepareForCalculation(stack: Array<string>) :Array<any> {
        let toCompute = this._removeLeadingZeroInts(stack.join(''));
        toCompute = this._applyNegations(toCompute);

        const splitByOperators: RegExp = /(\*|\/|\+|\-)/;
        const assignType: any = (element: string) => isNaN(parseFloat(element)) ? element : parseFloat(element);
        const elements: Array<any> = toCompute.split(splitByOperators).map(assignType);

        return elements;
    }

    private _applyNegations(input: string) :string {
        const negationPattern = '(!+)?';
        const numberPattern = '(-?\\d+(\\.\\d+)?)';
        const combinedPattern = new RegExp(`${negationPattern}${numberPattern}${negationPattern}`, 'g');
    
        return input.replace(combinedPattern, (match, preNegations = '', number, _, postNegations = '') => {            
            const negationsCount = preNegations.length + postNegations.length;
            const num = parseFloat(number);
            const negatedNumber = negationsCount % 2 === 0 ? num : -num;
            return negatedNumber.toString();
        });
    }

    private _removeLeadingZeroInts(input: string) :string {
        return input.replace(/\b0+([1-9]\d*|0\.)/g, '$1');
    }

    private _isTryingToDivideByZero(input: string) {
        const divisionByZeroRegex = /\/0(?!.\d)/g;
        return divisionByZeroRegex.test(input);
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

    private _calculate(elements: Array<any>) :number {
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
}
