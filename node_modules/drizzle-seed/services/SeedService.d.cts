import type { MySqlTable } from 'drizzle-orm/mysql-core';
import { MySqlDatabase } from 'drizzle-orm/mysql-core';
import type { PgTable } from 'drizzle-orm/pg-core';
import { PgDatabase } from 'drizzle-orm/pg-core';
import type { SQLiteTable } from 'drizzle-orm/sqlite-core';
import { BaseSQLiteDatabase } from 'drizzle-orm/sqlite-core';
import type { GeneratePossibleGeneratorsColumnType, RefinementsType, TableGeneratorsType } from '../types/seedService.js';
import type { Column, Prettify, Relation, Table } from '../types/tables.js';
import type { AbstractGenerator, GenerateArray, GenerateInterval } from './Generators.js';
export declare class SeedService {
    static readonly entityKind: string;
    private defaultCountForTable;
    private postgresPgLiteMaxParametersNumber;
    private postgresMaxParametersNumber;
    private mysqlMaxParametersNumber;
    private sqliteMaxParametersNumber;
    private version?;
    generatePossibleGenerators: (connectionType: "postgresql" | "mysql" | "sqlite", tables: Table[], relations: (Relation & {
        isCyclic: boolean;
    })[], refinements?: RefinementsType, options?: {
        count?: number;
        seed?: number;
        version?: number;
    }) => {
        tableName: string;
        count?: number | undefined;
        withCount?: number | undefined;
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
    }[];
    selectVersionOfGenerator: (generator: AbstractGenerator<any>) => AbstractGenerator<any>;
    cyclicTablesCompare: (table1: Table, table2: Table, relation: Relation & {
        isCyclic: boolean;
    }, reverseRelation: (Relation & {
        isCyclic: boolean;
    }) | undefined) => 1 | 0 | -1;
    getOrderedTablesList: (tablesInOutRelations: ReturnType<typeof this.getInfoFromRelations>["tablesInOutRelations"]) => string[];
    getInfoFromRelations: (relations: (Relation & {
        isCyclic: boolean;
    })[]) => {
        tablesInOutRelations: {
            [tableName: string]: {
                out: number;
                in: number;
                selfRelation: boolean;
                selfRelCount: number;
                requiredTableNames: Set<string>;
                dependantTableNames: Set<string>;
            };
        };
    };
    getWeightedWithCount: (weightedCount: {
        weight: number;
        count: number | number[];
    }[], count: number, seed: number) => number;
    selectGeneratorForPostgresColumn: (table: Table, col: Column) => GenerateArray | import("./Generators.js").GenerateDefault | import("./Generators.js").GenerateIntPrimaryKey | import("./Generators.js").GenerateNumber | import("./Generators.js").GenerateInt | import("./Generators.js").GenerateBoolean | import("./Generators.js").GenerateDate | import("./Generators.js").GenerateTime | import("./Generators.js").GenerateTimestamp | import("./Generators.js").GenerateJson | import("./Generators.js").GenerateEmail | import("./Generators.js").GenerateFirstName | import("./Generators.js").GenerateEnum | GenerateInterval | import("./Generators.js").GenerateString | import("./Generators.js").GenerateUniqueString | import("./Generators.js").GenerateUUID | import("./Generators.js").GeneratePoint | import("./Generators.js").GenerateLine | undefined;
    selectGeneratorForMysqlColumn: (table: Table, col: Column) => import("./Generators.js").GenerateDefault | import("./Generators.js").GenerateIntPrimaryKey | import("./Generators.js").GenerateNumber | import("./Generators.js").GenerateInt | import("./Generators.js").GenerateBoolean | import("./Generators.js").GenerateDate | import("./Generators.js").GenerateTime | import("./Generators.js").GenerateTimestamp | import("./Generators.js").GenerateDatetime | import("./Generators.js").GenerateYear | import("./Generators.js").GenerateJson | import("./Generators.js").GenerateEmail | import("./Generators.js").GenerateFirstName | import("./Generators.js").GenerateEnum | import("./Generators.js").GenerateString | import("./Generators.js").GenerateUniqueString | undefined;
    selectGeneratorForSqlite: (table: Table, col: Column) => import("./Generators.js").GenerateDefault | import("./Generators.js").GenerateIntPrimaryKey | import("./Generators.js").GenerateNumber | import("./Generators.js").GenerateInt | import("./Generators.js").GenerateBoolean | import("./Generators.js").GenerateTimestamp | import("./Generators.js").GenerateJson | import("./Generators.js").GenerateEmail | import("./Generators.js").GenerateFirstName | import("./Generators.js").GenerateString | import("./Generators.js").GenerateUniqueString | undefined;
    filterCyclicTables: (tablesGenerators: ReturnType<typeof this.generatePossibleGenerators>) => {
        filteredTablesGenerators: {
            tableName: string;
            count?: number | undefined;
            withCount?: number | undefined;
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
        }[];
        tablesUniqueNotNullColumn: {
            [tableName: string]: {
                uniqueNotNullColName: string;
            };
        };
    };
    generateTablesValues: (relations: (Relation & {
        isCyclic: boolean;
    })[], tablesGenerators: ReturnType<typeof this.generatePossibleGenerators>, db?: PgDatabase<any> | MySqlDatabase<any, any> | BaseSQLiteDatabase<any, any>, schema?: {
        [key: string]: PgTable | MySqlTable | SQLiteTable;
    }, options?: {
        count?: number;
        seed?: number;
        preserveData?: boolean;
        preserveCyclicTablesData?: boolean;
        insertDataInDb?: boolean;
        updateDataInDb?: boolean;
        tablesValues?: {
            tableName: string;
            rows: {
                [columnName: string]: string | number | boolean | undefined;
            }[];
        }[];
        tablesUniqueNotNullColumn?: {
            [tableName: string]: {
                uniqueNotNullColName: string;
            };
        };
    }) => Promise<{
        tableName: string;
        rows: {
            [columnName: string]: string | number | boolean | undefined;
        }[];
    }[]>;
    generateColumnsValuesByGenerators: ({ tableGenerators, db, schema, tableName, count, preserveData, insertDataInDb, updateDataInDb, uniqueNotNullColName, batchSize, }: {
        tableGenerators: Prettify<TableGeneratorsType>;
        db?: PgDatabase<any> | MySqlDatabase<any, any> | BaseSQLiteDatabase<any, any>;
        schema?: {
            [key: string]: PgTable | MySqlTable | SQLiteTable;
        };
        tableName?: string;
        count?: number;
        preserveData?: boolean;
        insertDataInDb?: boolean;
        updateDataInDb?: boolean;
        uniqueNotNullColName?: string;
        batchSize?: number;
    }) => Promise<{
        [columnName: string]: string | number | boolean | undefined;
    }[]>;
    insertInDb: ({ generatedValues, db, schema, tableName, override, }: {
        generatedValues: {
            [columnName: string]: number | string | boolean | undefined;
        }[];
        db: PgDatabase<any, any> | MySqlDatabase<any, any> | BaseSQLiteDatabase<any, any>;
        schema: {
            [key: string]: PgTable | MySqlTable | SQLiteTable;
        };
        tableName: string;
        override: boolean;
    }) => Promise<any>;
    updateDb: ({ generatedValues, db, schema, tableName, uniqueNotNullColName, }: {
        generatedValues: {
            [columnName: string]: number | string | boolean | undefined;
        }[];
        db: PgDatabase<any, any> | MySqlDatabase<any, any> | BaseSQLiteDatabase<any, any>;
        schema: {
            [key: string]: PgTable | MySqlTable | SQLiteTable;
        };
        tableName: string;
        uniqueNotNullColName: string;
    }) => Promise<void>;
}
