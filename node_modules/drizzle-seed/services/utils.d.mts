export declare const fastCartesianProduct: (sets: (number | string | boolean | object)[][], index: number) => (string | number | boolean | object)[];
/**
 * @param weights positive number in range [0, 1], that represents probabilities to choose index of array. Example: weights = [0.2, 0.8]
 * @param [accuracy=100] approximate number of elements in returning array
 * @returns Example: with weights = [0.2, 0.8] and accuracy = 10 returning array of indices gonna equal this: [0, 0, 1, 1, 1, 1, 1, 1, 1, 1]
 */
export declare const getWeightedIndices: (weights: number[], accuracy?: number) => number[];
export declare const generateHashFromString: (s: string) => number;
/**
 * @param param0.template example: "#####" or "#####-####"
 * @param param0.values example: ["3", "2", "h"]
 * @param param0.defaultValue example: "0"
 * @returns
 */
export declare const fillTemplate: ({ template, placeholdersCount, values, defaultValue }: {
    template: string;
    placeholdersCount?: number;
    values: string[];
    defaultValue?: string;
}) => string;
export declare const isObject: (value: any) => boolean;
export declare const equalSets: (set1: Set<any>, set2: Set<any>) => boolean;
