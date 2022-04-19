declare type FlexpadOutput = {
    display?: string;
    flexDirection?: string;
    flexWrap?: string;
    justifyContent?: string;
    alignContent?: string;
    alignItems?: string;
};
declare class Flexpad {
    code: string;
    constructor(code: string);
    toCss(): string;
    toJs(): FlexpadOutput;
}
export default Flexpad;
