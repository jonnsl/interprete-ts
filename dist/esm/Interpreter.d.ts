export interface ConstantsMap {
    [k: string]: string | number | boolean | null;
}
export default function evaluate(input: string, constants?: ConstantsMap): string | number | boolean | null;
