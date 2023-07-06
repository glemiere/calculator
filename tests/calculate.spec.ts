// Assuming that your function is part of a Calculator class, import it first
import Calculate from "../src/commands/_calculate";
import logger from "../src/cli/logger";

describe('isInputSanitary function', () => {
    let calculator = new Calculate();

    afterAll(() => {
        logger.close();
    });

    test('will test stuffs at the end', () => {

    });
});
