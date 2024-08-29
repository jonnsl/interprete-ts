interface ConstantsMap {
    [k: string]: string | number | boolean;
}
export default function evaluate(input: string, constants?: ConstantsMap): string | number | boolean;
export {};
