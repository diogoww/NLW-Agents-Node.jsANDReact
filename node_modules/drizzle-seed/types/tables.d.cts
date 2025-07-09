export type Column = {
    name: string;
    dataType: string;
    columnType: string;
    typeParams: {
        precision?: number;
        scale?: number;
        length?: number;
        dimensions?: number;
    };
    size?: number;
    default?: any;
    hasDefault: boolean;
    enumValues?: string[];
    isUnique: boolean;
    notNull: boolean;
    primary: boolean;
    generatedIdentityType?: 'always' | 'byDefault' | undefined;
    baseColumn?: Omit<Column, 'generatedIdentityType'>;
};
export type Table = {
    name: string;
    columns: Column[];
    primaryKeys: string[];
};
export type Relation = {
    type?: 'one' | 'many';
    table: string;
    columns: string[];
    refTable: string;
    refColumns: string[];
};
export type RelationWithReferences = Relation & {
    isCyclic?: boolean;
    refTableRels: RelationWithReferences[];
};
export type Prettify<T> = {
    [K in keyof T]: T[K];
} & {};
