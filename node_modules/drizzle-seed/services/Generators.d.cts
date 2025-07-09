import prand from 'pure-rand';
export declare abstract class AbstractGenerator<T = {}> {
    static readonly entityKind: string;
    static readonly version: number;
    isUnique: boolean;
    notNull: boolean;
    uniqueVersionOfGen?: new (params: T) => AbstractGenerator<T>;
    dataType?: string;
    timeSpent?: number;
    arraySize?: number;
    baseColumnDataType?: string;
    stringLength?: number;
    weightedCountSeed?: number | undefined;
    maxRepeatedValuesCount?: number | {
        weight: number;
        count: number | number[];
    }[] | undefined;
    params: T;
    constructor(params?: T);
    init(params: {
        count: number | {
            weight: number;
            count: number | number[];
        }[];
        seed: number;
    }): void;
    updateParams(): void;
    abstract generate(params: {
        i: number;
    }): number | string | boolean | unknown | undefined | void;
    getEntityKind(): string;
    replaceIfUnique(): AbstractGenerator<T> | undefined;
    replaceIfArray(): GenerateArray | undefined;
}
export declare class GenerateArray extends AbstractGenerator<{
    baseColumnGen: AbstractGenerator<any>;
    size?: number;
}> {
    static readonly entityKind: string;
    arraySize: number;
    init({ count, seed }: {
        count: number;
        seed: number;
    }): void;
    generate(): unknown[];
}
export declare class GenerateWeightedCount extends AbstractGenerator<{}> {
    static readonly entityKind: string;
    private state;
    init({ seed, count }: {
        count: {
            weight: number;
            count: number | number[];
        }[];
        seed: number;
    }): void;
    generate(): number;
}
export declare class HollowGenerator extends AbstractGenerator<{}> {
    static readonly entityKind: string;
    init(): void;
    generate(): void;
}
export declare class GenerateDefault extends AbstractGenerator<{
    defaultValue: unknown;
    arraySize?: number;
}> {
    static readonly entityKind: string;
    generate(): unknown;
}
export declare class GenerateValuesFromArray extends AbstractGenerator<{
    values: (number | string | boolean | undefined)[] | {
        weight: number;
        values: (number | string | boolean | undefined)[];
    }[];
    isUnique?: boolean;
    arraySize?: number;
}> {
    static readonly entityKind: string;
    private state;
    timeSpent: number;
    checks({ count }: {
        count: number;
    }): void;
    init({ count, seed }: {
        count: number;
        seed: number;
    }): void;
    generate(): string | number | boolean | undefined;
}
export declare class GenerateSelfRelationsValuesFromArray extends AbstractGenerator<{
    values: (number | string | boolean)[];
}> {
    static readonly entityKind: string;
    private state;
    init({ count, seed }: {
        count: number;
        seed: number;
    }): void;
    generate({ i }: {
        i: number;
    }): string | number | boolean | undefined;
}
export declare class GenerateIntPrimaryKey extends AbstractGenerator<{}> {
    static readonly entityKind: string;
    maxValue?: number | bigint;
    init({ count }: {
        count: number;
        seed: number;
    }): void;
    generate({ i }: {
        i: number;
    }): number | bigint;
}
export declare class GenerateNumber extends AbstractGenerator<{
    minValue?: number;
    maxValue?: number;
    precision?: number;
    isUnique?: boolean;
    arraySize?: number;
}> {
    static readonly entityKind: string;
    private state;
    uniqueVersionOfGen: typeof GenerateUniqueNumber;
    init({ count, seed }: {
        seed: number;
        count: number;
    }): void;
    generate(): number;
}
export declare class GenerateUniqueNumber extends AbstractGenerator<{
    minValue?: number;
    maxValue?: number;
    precision?: number;
    isUnique?: boolean;
}> {
    static readonly entityKind: string;
    private state;
    isUnique: boolean;
    init({ count, seed }: {
        count: number;
        seed: number;
    }): void;
    generate(): number;
}
export declare class GenerateInt extends AbstractGenerator<{
    minValue?: number | bigint;
    maxValue?: number | bigint;
    isUnique?: boolean;
    arraySize?: number;
}> {
    static readonly entityKind: string;
    private state;
    uniqueVersionOfGen: typeof GenerateUniqueInt;
    init({ count, seed }: {
        count: number;
        seed: number;
    }): void;
    generate(): string | number | bigint;
}
export declare class GenerateUniqueInt extends AbstractGenerator<{
    minValue?: number | bigint;
    maxValue?: number | bigint;
    isUnique?: boolean;
}> {
    static readonly entityKind: string;
    genMaxRepeatedValuesCount: GenerateDefault | GenerateWeightedCount | undefined;
    skipCheck?: boolean;
    state: {
        rng: prand.RandomGenerator;
        minValue: number | bigint;
        maxValue: number | bigint;
        intervals: (number | bigint)[][];
        integersCount: Map<number | bigint, number>;
    } | undefined;
    isUnique: boolean;
    timeSpent: number;
    init({ count, seed }: {
        count: number;
        seed: number;
    }): void;
    generate(): string | number | bigint | undefined;
    generateNumber(currMinNumb: number, currMaxNumb: number, intervalsToAdd: number[][], intervalIdx: number): number;
    generateBigint(currMinNumb: bigint, currMaxNumb: bigint, intervalsToAdd: bigint[][], intervalIdx: number): bigint;
}
export declare class GenerateBoolean extends AbstractGenerator<{
    arraySize?: number;
}> {
    static readonly entityKind: string;
    private state;
    init({ count, seed }: {
        count: number;
        seed: number;
    }): void;
    generate(): boolean;
}
export declare class GenerateDate extends AbstractGenerator<{
    minDate?: string | Date;
    maxDate?: string | Date;
    arraySize?: number;
}> {
    static readonly entityKind: string;
    private state;
    init({ count, seed }: {
        count: number;
        seed: number;
    }): void;
    generate(): string | Date;
}
export declare class GenerateTime extends AbstractGenerator<{
    arraySize?: number;
}> {
    static readonly entityKind: string;
    private state;
    init({ count, seed }: {
        count: number;
        seed: number;
    }): void;
    generate(): string;
}
export declare class GenerateTimestampInt extends AbstractGenerator<{
    unitOfTime?: 'seconds' | 'milliseconds';
}> {
    static readonly entityKind: string;
    private state;
    init({ count, seed }: {
        count: number;
        seed: number;
    }): void;
    generate(): number;
}
export declare class GenerateTimestamp extends AbstractGenerator<{
    arraySize?: number;
}> {
    static readonly entityKind: string;
    private state;
    init({ count, seed }: {
        count: number;
        seed: number;
    }): void;
    generate(): string | Date;
}
export declare class GenerateDatetime extends AbstractGenerator<{
    arraySize?: number;
}> {
    static readonly entityKind: string;
    private state;
    init({ count, seed }: {
        count: number;
        seed: number;
    }): void;
    generate(): string | Date;
}
export declare class GenerateYear extends AbstractGenerator<{
    arraySize?: number;
}> {
    static readonly entityKind: string;
    private state;
    init({ count, seed }: {
        count: number;
        seed: number;
    }): void;
    generate(): string;
}
export declare class GenerateJson extends AbstractGenerator<{
    arraySize?: number;
}> {
    static readonly entityKind: string;
    private state;
    init({ count, seed }: {
        count: number;
        seed: number;
    }): void;
    generate({ i }: {
        i: number;
    }): string | {
        email: string;
        name: string;
        isGraduated: boolean;
        hasJob: true;
        salary: number;
        startedWorking: string;
        visitedCountries: string[];
    } | {
        email: string;
        name: string;
        isGraduated: boolean;
        hasJob: false;
        visitedCountries: string[];
        salary?: undefined;
        startedWorking?: undefined;
    };
}
export declare class GenerateEnum extends AbstractGenerator<{
    enumValues: (string | number | boolean)[];
}> {
    static readonly entityKind: string;
    private state;
    init({ count, seed }: {
        count: number;
        seed: number;
    }): void;
    generate(): string | number | boolean | undefined;
}
export declare class GenerateInterval extends AbstractGenerator<{
    fields?: 'year' | 'month' | 'day' | 'hour' | 'minute' | 'second' | 'year to month' | 'day to hour' | 'day to minute' | 'day to second' | 'hour to minute' | 'hour to second' | 'minute to second';
    isUnique?: boolean;
    arraySize?: number;
}> {
    static readonly entityKind: string;
    private state;
    uniqueVersionOfGen: new (params: any) => AbstractGenerator<any>;
    private config;
    init({ count, seed }: {
        count: number;
        seed: number;
    }): void;
    generate(): string;
}
export declare class GenerateUniqueInterval extends AbstractGenerator<{
    fields?: 'year' | 'month' | 'day' | 'hour' | 'minute' | 'second' | 'year to month' | 'day to hour' | 'day to minute' | 'day to second' | 'hour to minute' | 'hour to second' | 'minute to second';
    isUnique?: boolean;
}> {
    static readonly 'entityKind': string;
    private state;
    isUnique: boolean;
    private config;
    init({ count, seed }: {
        count: number;
        seed: number;
    }): void;
    generate(): string;
}
export declare class GenerateString extends AbstractGenerator<{
    isUnique?: boolean;
    arraySize?: number;
}> {
    static readonly entityKind: string;
    private state;
    uniqueVersionOfGen: typeof GenerateUniqueString;
    init({ count, seed }: {
        count: number;
        seed: number;
    }): void;
    generate(): string;
}
export declare class GenerateUniqueString extends AbstractGenerator<{
    isUnique?: boolean;
}> {
    static readonly entityKind: string;
    private state;
    isUnique: boolean;
    init({ seed }: {
        seed: number;
    }): void;
    generate({ i }: {
        i: number;
    }): string;
}
export declare class GenerateUUID extends AbstractGenerator<{
    arraySize?: number;
}> {
    static readonly entityKind: string;
    isUnique: boolean;
    private state;
    init({ count, seed }: {
        count: number;
        seed: number;
    }): void;
    generate(): string;
}
export declare class GenerateFirstName extends AbstractGenerator<{
    isUnique?: boolean;
    arraySize?: number;
}> {
    static readonly entityKind: string;
    timeSpent: number;
    private state;
    uniqueVersionOfGen: typeof GenerateUniqueFirstName;
    init({ count, seed }: {
        count: number;
        seed: number;
    }): void;
    generate(): string;
}
export declare class GenerateUniqueFirstName extends AbstractGenerator<{
    isUnique?: boolean;
}> {
    static readonly entityKind: string;
    private state;
    isUnique: boolean;
    init({ count, seed }: {
        count: number;
        seed: number;
    }): void;
    generate(): string;
}
export declare class GenerateLastName extends AbstractGenerator<{
    isUnique?: boolean;
    arraySize?: number;
}> {
    static readonly entityKind: string;
    private state;
    uniqueVersionOfGen: typeof GenerateUniqueLastName;
    init({ count, seed }: {
        count: number;
        seed: number;
    }): void;
    generate(): string | undefined;
}
export declare class GenerateUniqueLastName extends AbstractGenerator<{
    isUnique?: boolean;
}> {
    static readonly entityKind: string;
    private state;
    isUnique: boolean;
    init({ count, seed }: {
        count: number;
        seed: number;
    }): void;
    generate(): string;
}
export declare class GenerateFullName extends AbstractGenerator<{
    isUnique?: boolean;
    arraySize?: number;
}> {
    static readonly entityKind: string;
    private state;
    uniqueVersionOfGen: typeof GenerateUniqueFullName;
    init({ count, seed }: {
        count: number;
        seed: number;
    }): void;
    generate(): string;
}
export declare class GenerateUniqueFullName extends AbstractGenerator<{
    isUnique?: boolean;
}> {
    static readonly entityKind: string;
    private state;
    isUnique: boolean;
    timeSpent: number;
    init({ count, seed }: {
        count: number;
        seed: number;
    }): void;
    generate(): string;
}
export declare class GenerateEmail extends AbstractGenerator<{
    arraySize?: number;
}> {
    static readonly entityKind: string;
    private state;
    timeSpent: number;
    isUnique: boolean;
    init({ count, seed }: {
        count: number;
        seed: number;
    }): void;
    generate(): string;
}
export declare class GeneratePhoneNumber extends AbstractGenerator<{
    template?: string;
    prefixes?: string[];
    generatedDigitsNumbers?: number | number[];
    arraySize?: number;
}> {
    static readonly entityKind: string;
    private state;
    isUnique: boolean;
    init({ count, seed }: {
        count: number;
        seed: number;
    }): void;
    generate(): string;
}
export declare class GenerateCountry extends AbstractGenerator<{
    isUnique?: boolean;
    arraySize?: number;
}> {
    static readonly entityKind: string;
    private state;
    uniqueVersionOfGen: typeof GenerateUniqueCountry;
    init({ count, seed }: {
        count: number;
        seed: number;
    }): void;
    generate(): string;
}
export declare class GenerateUniqueCountry extends AbstractGenerator<{
    isUnique?: boolean;
}> {
    static readonly entityKind: string;
    private state;
    isUnique: boolean;
    init({ count, seed }: {
        count: number;
        seed: number;
    }): void;
    generate(): string;
}
export declare class GenerateJobTitle extends AbstractGenerator<{
    arraySize?: number;
}> {
    static readonly entityKind: string;
    private state;
    init({ count, seed }: {
        count: number;
        seed: number;
    }): void;
    generate(): string | undefined;
}
export declare class GenerateStreetAddress extends AbstractGenerator<{
    isUnique?: boolean;
    arraySize?: number;
}> {
    static readonly entityKind: string;
    private state;
    uniqueVersionOfGen: typeof GenerateUniqueStreetAddress;
    init({ count, seed }: {
        count: number;
        seed: number;
    }): void;
    generate(): string;
}
export declare class GenerateUniqueStreetAddress extends AbstractGenerator<{
    isUnique?: boolean;
}> {
    static readonly entityKind: string;
    private state;
    isUnique: boolean;
    init({ count, seed }: {
        count: number;
        seed: number;
    }): void;
    generate(): string;
}
export declare class GenerateCity extends AbstractGenerator<{
    isUnique?: boolean;
    arraySize?: number;
}> {
    static readonly entityKind: string;
    private state;
    uniqueVersionOfGen: typeof GenerateUniqueCity;
    init({ count, seed }: {
        count: number;
        seed: number;
    }): void;
    generate(): string | undefined;
}
export declare class GenerateUniqueCity extends AbstractGenerator<{
    isUnique?: boolean;
}> {
    static readonly entityKind: string;
    private state;
    isUnique: boolean;
    init({ count, seed }: {
        count: number;
        seed: number;
    }): void;
    generate(): string;
}
export declare class GeneratePostcode extends AbstractGenerator<{
    isUnique?: boolean;
    arraySize?: number;
}> {
    static readonly entityKind: string;
    private state;
    uniqueVersionOfGen: typeof GenerateUniquePostcode;
    init({ count, seed }: {
        count: number;
        seed: number;
    }): void;
    generate(): string;
}
export declare class GenerateUniquePostcode extends AbstractGenerator<{
    isUnique?: boolean;
}> {
    static readonly entityKind: string;
    private state;
    isUnique: boolean;
    init({ count, seed }: {
        count: number;
        seed: number;
    }): void;
    generate(): string;
}
export declare class GenerateState extends AbstractGenerator<{
    arraySize?: number;
}> {
    static readonly entityKind: string;
    private state;
    init({ count, seed }: {
        count: number;
        seed: number;
    }): void;
    generate(): string | undefined;
}
export declare class GenerateCompanyName extends AbstractGenerator<{
    isUnique?: boolean;
    arraySize?: number;
}> {
    static readonly entityKind: string;
    private state;
    uniqueVersionOfGen: typeof GenerateUniqueCompanyName;
    init({ count, seed }: {
        count: number;
        seed: number;
    }): void;
    generate(): string;
}
export declare class GenerateUniqueCompanyName extends AbstractGenerator<{
    isUnique?: boolean;
}> {
    static readonly entityKind: string;
    private state;
    isUnique: boolean;
    init({ count, seed }: {
        count: number;
        seed: number;
    }): void;
    generate(): string;
}
export declare class GenerateLoremIpsum extends AbstractGenerator<{
    sentencesCount?: number;
    arraySize?: number;
}> {
    static readonly entityKind: string;
    private state;
    init({ count, seed }: {
        count: number;
        seed: number;
    }): void;
    generate(): string;
}
export declare class WeightedRandomGenerator extends AbstractGenerator<{
    weight: number;
    value: AbstractGenerator<any>;
}[]> {
    static readonly entityKind: string;
    private state;
    init({ count, seed }: {
        count: number;
        seed: number;
    }): void;
    generate({ i }: {
        i: number;
    }): unknown;
}
export declare class GeneratePoint extends AbstractGenerator<{
    isUnique?: boolean;
    minXValue?: number;
    maxXValue?: number;
    minYValue?: number;
    maxYValue?: number;
    arraySize?: number;
}> {
    static readonly entityKind: string;
    private state;
    uniqueVersionOfGen: typeof GenerateUniquePoint;
    init({ count, seed }: {
        count: number;
        seed: number;
    }): void;
    generate(): string | number[] | {
        x: number;
        y: number;
    };
}
export declare class GenerateUniquePoint extends AbstractGenerator<{
    minXValue?: number;
    maxXValue?: number;
    minYValue?: number;
    maxYValue?: number;
    isUnique?: boolean;
}> {
    static readonly entityKind: string;
    private state;
    isUnique: boolean;
    init({ count, seed }: {
        count: number;
        seed: number;
    }): void;
    generate(): string | number[] | {
        x: number;
        y: number;
    };
}
export declare class GenerateLine extends AbstractGenerator<{
    isUnique?: boolean;
    minAValue?: number;
    maxAValue?: number;
    minBValue?: number;
    maxBValue?: number;
    minCValue?: number;
    maxCValue?: number;
    arraySize?: number;
}> {
    static readonly entityKind: string;
    private state;
    uniqueVersionOfGen: typeof GenerateUniqueLine;
    init({ count, seed }: {
        count: number;
        seed: number;
    }): void;
    generate(): string | number[] | {
        a: number;
        b: number;
        c: number;
    };
}
export declare class GenerateUniqueLine extends AbstractGenerator<{
    minAValue?: number;
    maxAValue?: number;
    minBValue?: number;
    maxBValue?: number;
    minCValue?: number;
    maxCValue?: number;
    isUnique?: boolean;
}> {
    static readonly entityKind: string;
    private state;
    isUnique: boolean;
    init({ count, seed }: {
        count: number;
        seed: number;
    }): void;
    generate(): string | number[] | {
        a: number;
        b: number;
        c: number;
    };
}
