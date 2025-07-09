import { AbstractGenerator } from '../Generators.js';
export declare class GenerateUniqueIntervalV2 extends AbstractGenerator<{
    fields?: 'year' | 'month' | 'day' | 'hour' | 'minute' | 'second' | 'year to month' | 'day to hour' | 'day to minute' | 'day to second' | 'hour to minute' | 'hour to second' | 'minute to second';
    isUnique?: boolean;
}> {
    static readonly 'entityKind': string;
    static readonly version: number;
    private state;
    isUnique: boolean;
    private config;
    init({ count, seed }: {
        count: number;
        seed: number;
    }): void;
    generate(): string;
}
export declare class GenerateStringV2 extends AbstractGenerator<{
    isUnique?: boolean;
    arraySize?: number;
}> {
    static readonly 'entityKind': string;
    static readonly version: number;
    private state;
    uniqueVersionOfGen: typeof GenerateUniqueStringV2;
    init({ count, seed }: {
        count: number;
        seed: number;
    }): void;
    generate(): string;
}
export declare class GenerateUniqueStringV2 extends AbstractGenerator<{
    isUnique?: boolean;
}> {
    static readonly 'entityKind': string;
    static readonly version: number;
    private state;
    isUnique: boolean;
    init({ seed, count }: {
        seed: number;
        count: number;
    }): void;
    generate({ i }: {
        i: number;
    }): string;
}
