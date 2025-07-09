import { Relations } from 'drizzle-orm';
import type { MySqlColumn, MySqlSchema } from 'drizzle-orm/mysql-core';
import { MySqlDatabase, MySqlTable } from 'drizzle-orm/mysql-core';
import type { PgColumn, PgSchema } from 'drizzle-orm/pg-core';
import { PgDatabase, PgTable } from 'drizzle-orm/pg-core';
import type { SQLiteColumn } from 'drizzle-orm/sqlite-core';
import { BaseSQLiteDatabase, SQLiteTable } from 'drizzle-orm/sqlite-core';
import { generatorsFuncs, generatorsFuncsV2 } from './services/GeneratorFuncs.js';
import type { AbstractGenerator } from './services/Generators.js';
import type { DrizzleStudioObjectType, DrizzleStudioRelationType } from './types/drizzleStudio.js';
import type { RefinementsType } from './types/seedService.js';
type InferCallbackType<DB extends PgDatabase<any, any> | MySqlDatabase<any, any> | BaseSQLiteDatabase<any, any>, SCHEMA extends {
    [key: string]: PgTable | PgSchema | MySqlTable | MySqlSchema | SQLiteTable | Relations;
}> = DB extends PgDatabase<any, any> ? SCHEMA extends {
    [key: string]: PgTable | PgSchema | MySqlTable | MySqlSchema | SQLiteTable | Relations;
} ? {
    [table in keyof SCHEMA as SCHEMA[table] extends PgTable ? table : never]?: {
        count?: number;
        columns?: {
            [column in keyof SCHEMA[table] as SCHEMA[table][column] extends PgColumn ? column : never]?: AbstractGenerator<any>;
        };
        with?: {
            [refTable in keyof SCHEMA as SCHEMA[refTable] extends PgTable ? refTable : never]?: number | {
                weight: number;
                count: number | number[];
            }[];
        };
    };
} : {} : DB extends MySqlDatabase<any, any> ? SCHEMA extends {
    [key: string]: PgTable | PgSchema | MySqlTable | MySqlSchema | SQLiteTable | Relations;
} ? {
    [table in keyof SCHEMA as SCHEMA[table] extends MySqlTable ? table : never]?: {
        count?: number;
        columns?: {
            [column in keyof SCHEMA[table] as SCHEMA[table][column] extends MySqlColumn ? column : never]?: AbstractGenerator<any>;
        };
        with?: {
            [refTable in keyof SCHEMA as SCHEMA[refTable] extends MySqlTable ? refTable : never]?: number | {
                weight: number;
                count: number | number[];
            }[];
        };
    };
} : {} : DB extends BaseSQLiteDatabase<any, any> ? SCHEMA extends {
    [key: string]: PgTable | PgSchema | MySqlTable | MySqlSchema | SQLiteTable | Relations;
} ? {
    [table in keyof SCHEMA as SCHEMA[table] extends SQLiteTable ? table : never]?: {
        count?: number;
        columns?: {
            [column in keyof SCHEMA[table] as SCHEMA[table][column] extends SQLiteColumn ? column : never]?: AbstractGenerator<any>;
        };
        with?: {
            [refTable in keyof SCHEMA as SCHEMA[refTable] extends SQLiteTable ? refTable : never]?: number | {
                weight: number;
                count: number | number[];
            }[];
        };
    };
} : {} : {};
declare class SeedPromise<DB extends PgDatabase<any, any> | MySqlDatabase<any, any> | BaseSQLiteDatabase<any, any>, SCHEMA extends {
    [key: string]: PgTable | PgSchema | MySqlTable | MySqlSchema | SQLiteTable | Relations;
}, VERSION extends string | undefined> implements Promise<void> {
    private db;
    private schema;
    private options?;
    static readonly entityKind: string;
    [Symbol.toStringTag]: string;
    constructor(db: DB, schema: SCHEMA, options?: {
        count?: number;
        seed?: number;
        version?: VERSION;
    } | undefined);
    then<TResult1 = void, TResult2 = never>(onfulfilled?: ((value: void) => TResult1 | PromiseLike<TResult1>) | null | undefined, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | null | undefined): Promise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | null | undefined): Promise<void | TResult>;
    finally(onfinally?: (() => void) | null | undefined): Promise<void>;
    refine(callback: (funcs: FunctionsVersioning<VERSION>) => InferCallbackType<DB, SCHEMA>): Promise<void>;
}
type FunctionsVersioning<VERSION extends string | undefined> = VERSION extends `1` ? typeof generatorsFuncs : VERSION extends `2` ? typeof generatorsFuncsV2 : typeof generatorsFuncsV2;
export declare function getGeneratorsFunctions(): {
    default: (args_0: {
        defaultValue: unknown;
        arraySize?: number;
    }) => import("./services/Generators.js").GenerateDefault;
    valuesFromArray: (args_0: {
        values: (number | string | boolean | undefined)[] | {
            weight: number;
            values: (number | string | boolean | undefined)[];
        }[];
        isUnique?: boolean;
        arraySize?: number;
    }) => import("./services/Generators.js").GenerateValuesFromArray;
    intPrimaryKey: (...args: [] | [{}]) => import("./services/Generators.js").GenerateIntPrimaryKey;
    number: (...args: [] | [{
        minValue?: number;
        maxValue?: number;
        precision?: number;
        isUnique?: boolean;
        arraySize?: number;
    }]) => import("./services/Generators.js").GenerateNumber;
    int: (...args: [] | [{
        minValue?: number | bigint;
        maxValue?: number | bigint;
        isUnique?: boolean;
        arraySize?: number;
    }]) => import("./services/Generators.js").GenerateInt;
    boolean: (...args: [] | [{
        arraySize?: number;
    }]) => import("./services/Generators.js").GenerateBoolean;
    date: (...args: [] | [{
        minDate?: string | Date;
        maxDate?: string | Date;
        arraySize?: number;
    }]) => import("./services/Generators.js").GenerateDate;
    time: (...args: [] | [{
        arraySize?: number;
    }]) => import("./services/Generators.js").GenerateTime;
    timestamp: (...args: [] | [{
        arraySize?: number;
    }]) => import("./services/Generators.js").GenerateTimestamp;
    datetime: (...args: [] | [{
        arraySize?: number;
    }]) => import("./services/Generators.js").GenerateDatetime;
    year: (...args: [] | [{
        arraySize?: number;
    }]) => import("./services/Generators.js").GenerateYear;
    json: (...args: [] | [{
        arraySize?: number;
    }]) => import("./services/Generators.js").GenerateJson;
    interval: (...args: [] | [{
        fields?: "year" | "month" | "day" | "hour" | "minute" | "second" | "year to month" | "day to hour" | "day to minute" | "day to second" | "hour to minute" | "hour to second" | "minute to second";
        isUnique?: boolean;
        arraySize?: number;
    }]) => import("./services/Generators.js").GenerateInterval;
    string: (...args: [] | [{
        isUnique?: boolean;
        arraySize?: number;
    }]) => import("./services/Generators.js").GenerateString;
    uuid: (...args: [] | [{
        arraySize?: number;
    }]) => import("./services/Generators.js").GenerateUUID;
    firstName: (...args: [] | [{
        isUnique?: boolean;
        arraySize?: number;
    }]) => import("./services/Generators.js").GenerateFirstName;
    lastName: (...args: [] | [{
        isUnique?: boolean;
        arraySize?: number;
    }]) => import("./services/Generators.js").GenerateLastName;
    fullName: (...args: [] | [{
        isUnique?: boolean;
        arraySize?: number;
    }]) => import("./services/Generators.js").GenerateFullName;
    email: (...args: [] | [{
        arraySize?: number;
    }]) => import("./services/Generators.js").GenerateEmail;
    phoneNumber: (...args: [] | [{
        template?: string;
        prefixes?: string[];
        generatedDigitsNumbers?: number | number[];
        arraySize?: number;
    }]) => import("./services/Generators.js").GeneratePhoneNumber;
    country: (...args: [] | [{
        isUnique?: boolean;
        arraySize?: number;
    }]) => import("./services/Generators.js").GenerateCountry;
    city: (...args: [] | [{
        isUnique?: boolean;
        arraySize?: number;
    }]) => import("./services/Generators.js").GenerateCity;
    streetAddress: (...args: [] | [{
        isUnique?: boolean;
        arraySize?: number;
    }]) => import("./services/Generators.js").GenerateStreetAddress;
    jobTitle: (...args: [] | [{
        arraySize?: number;
    }]) => import("./services/Generators.js").GenerateJobTitle;
    postcode: (...args: [] | [{
        isUnique?: boolean;
        arraySize?: number;
    }]) => import("./services/Generators.js").GeneratePostcode;
    state: (...args: [] | [{
        arraySize?: number;
    }]) => import("./services/Generators.js").GenerateState;
    companyName: (...args: [] | [{
        isUnique?: boolean;
        arraySize?: number;
    }]) => import("./services/Generators.js").GenerateCompanyName;
    loremIpsum: (...args: [] | [{
        sentencesCount?: number;
        arraySize?: number;
    }]) => import("./services/Generators.js").GenerateLoremIpsum;
    point: (...args: [] | [{
        isUnique?: boolean;
        minXValue?: number;
        maxXValue?: number;
        minYValue?: number;
        maxYValue?: number;
        arraySize?: number;
    }]) => import("./services/Generators.js").GeneratePoint;
    line: (...args: [] | [{
        isUnique?: boolean;
        minAValue?: number;
        maxAValue?: number;
        minBValue?: number;
        maxBValue?: number;
        minCValue?: number;
        maxCValue?: number;
        arraySize?: number;
    }]) => import("./services/Generators.js").GenerateLine;
    weightedRandom: (args_0: {
        weight: number;
        value: AbstractGenerator<any>;
    }[]) => import("./services/Generators.js").WeightedRandomGenerator;
};
export declare function seedForDrizzleStudio({ sqlDialect, drizzleStudioObject, drizzleStudioRelations, schemasRefinements, options }: {
    sqlDialect: 'postgresql' | 'mysql' | 'sqlite';
    drizzleStudioObject: DrizzleStudioObjectType;
    drizzleStudioRelations: DrizzleStudioRelationType[];
    schemasRefinements?: {
        [schemaName: string]: RefinementsType;
    };
    options?: {
        count?: number;
        seed?: number;
    };
}): Promise<{
    [schemaName: string]: {
        tables: {
            tableName: string;
            rows: {
                [columnName: string]: string | number | boolean | undefined;
            }[];
        }[];
    };
}>;
/**
 * @param db - database you would like to seed.
 * @param schema - object that contains all your database tables you would like to seed.
 * @param options - object that contains properties `count` and `seed`:
 *
 *  `count` - number of rows you want to generate.
 *
 *  `seed` - a number that controls the state of generated data. (if the `seed` number is the same and nothing is changed in the seeding script, generated data will remain the same each time you seed database)
 *
 * @returns SeedPromise - a class object that has a refine method that is used to change generators for columns.
 *
 * @example
 * ```ts
 * // base seeding
 * await seed(db, schema);
 *
 * // seeding with count specified
 * await seed(db, schema, { count: 100000 });
 *
 * // seeding with count and seed specified
 * await seed(db, schema, { count: 100000, seed: 1 });
 *
 * //seeding using refine
 * await seed(db, schema, { count: 1000 }).refine((funcs) => ({
 *   users: {
 *     columns: {
 *       name: funcs.firstName({ isUnique: true }),
 *       email: funcs.email(),
 *       phone: funcs.phoneNumber({ template: "+380 99 ###-##-##" }),
 *       password: funcs.string({ isUnique: true }),
 *     },
 *     count: 100000,
 *   },
 *   posts: {
 *     columns: {
 *       title: funcs.valuesFromArray({
 *         values: ["Title1", "Title2", "Title3", "Title4", "Title5"],
 *       }),
 *       content: funcs.loremIpsum({ sentencesCount: 3 }),
 *     },
 *   },
 * }));
 *
 * ```
 */
export declare function seed<DB extends PgDatabase<any, any> | MySqlDatabase<any, any, any, any> | BaseSQLiteDatabase<any, any>, SCHEMA extends {
    [key: string]: PgTable | PgSchema | MySqlTable | MySqlSchema | SQLiteTable | Relations | any;
}, VERSION extends '2' | '1' | undefined>(db: DB, schema: SCHEMA, options?: {
    count?: number;
    seed?: number;
    version?: VERSION;
}): SeedPromise<DB, SCHEMA, VERSION>;
/**
 * deletes all data from specified tables
 *
 * @param db - database you would like to reset.
 * @param schema - object that contains all your database tables you would like to delete data from.
 *
 * `If db is a PgDatabase object`, we will execute sql query and delete data from your tables the following way:
 * ```sql
 * truncate tableName1, tableName2, ... cascade;
 * ```
 *
 * `If db is a MySqlDatabase object`, we will execute sql queries and delete data from your tables the following way:
 * ```sql
 * SET FOREIGN_KEY_CHECKS = 0;
 * truncate tableName1;
 * truncate tableName2;
 * .
 * .
 * .
 *
 * SET FOREIGN_KEY_CHECKS = 1;
 * ```
 *
 * `If db is a BaseSQLiteDatabase object`, we will execute sql queries and delete data from your tables the following way:
 * ```sql
 * PRAGMA foreign_keys = OFF;
 * delete from tableName1;
 * delete from tableName2;
 * .
 * .
 * .
 *
 * PRAGMA foreign_keys = ON;
 * ```
 *
 * @example
 * ```ts
 * await reset(db, schema);
 * ```
 */
export declare function reset<DB extends PgDatabase<any, any> | MySqlDatabase<any, any, any, any> | BaseSQLiteDatabase<any, any>, SCHEMA extends {
    [key: string]: PgTable | PgSchema | MySqlTable | MySqlSchema | SQLiteTable | any;
}>(db: DB, schema: SCHEMA): Promise<void>;
export { default as cities } from './datasets/cityNames.js';
export { default as countries } from './datasets/countries.js';
export { default as firstNames } from './datasets/firstNames.js';
export { default as lastNames } from './datasets/lastNames.js';
export { SeedService } from './services/SeedService.js';
