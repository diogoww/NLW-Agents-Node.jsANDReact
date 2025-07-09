import type { AbstractGenerator } from '../services/Generators.js';
import type { Prettify } from './tables.js';
export type TableGeneratorsType = {
    [columnName: string]: Prettify<{
        hasSelfRelation?: boolean | undefined;
        hasRelation?: boolean | undefined;
        pRNGSeed: number;
    } & GeneratePossibleGeneratorsColumnType>;
};
export type GeneratePossibleGeneratorsColumnType = {
    columnName: string;
    generator: AbstractGenerator<any> | undefined;
    isUnique: boolean;
    notNull: boolean;
    primary: boolean;
    generatedIdentityType?: 'always' | 'byDefault' | undefined;
    wasRefined: boolean;
    wasDefinedBefore: boolean;
    isCyclic: boolean;
};
export type GeneratePossibleGeneratorsTableType = Prettify<{
    tableName: string;
    count?: number;
    withCount?: number;
    withFromTable: {
        [withFromTableName: string]: {
            repeatedValuesCount: number | {
                weight: number;
                count: number | number[];
            }[];
            weightedCountSeed?: number;
        };
    };
    columnsPossibleGenerators: GeneratePossibleGeneratorsColumnType[];
}>;
export type RefinementsType = Prettify<{
    [tableName: string]: {
        count?: number;
        columns: {
            [columnName: string]: AbstractGenerator<{}>;
        };
        with?: {
            [tableName: string]: number | {
                weight: number;
                count: number | number[];
            }[];
        };
    };
}>;
