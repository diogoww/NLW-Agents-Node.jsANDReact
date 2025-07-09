import type { AbstractGenerator } from './Generators.js';
import { GenerateArray, GenerateBoolean, GenerateCity, GenerateCompanyName, GenerateCountry, GenerateDate, GenerateDatetime, GenerateDefault, GenerateEmail, GenerateEnum, GenerateFirstName, GenerateFullName, GenerateInt, GenerateInterval, GenerateIntPrimaryKey, GenerateJobTitle, GenerateJson, GenerateLastName, GenerateLine, GenerateLoremIpsum, GenerateNumber, GeneratePhoneNumber, GeneratePoint, GeneratePostcode, GenerateSelfRelationsValuesFromArray, GenerateState, GenerateStreetAddress, GenerateString, GenerateTime, GenerateTimestamp, GenerateUniqueCity, GenerateUniqueCompanyName, GenerateUniqueCountry, GenerateUniqueFirstName, GenerateUniqueFullName, GenerateUniqueInt, GenerateUniqueInterval, GenerateUniqueLastName, GenerateUniqueLine, GenerateUniqueNumber, GenerateUniquePoint, GenerateUniquePostcode, GenerateUniqueStreetAddress, GenerateUniqueString, GenerateUUID, GenerateValuesFromArray, GenerateWeightedCount, GenerateYear, HollowGenerator, WeightedRandomGenerator } from './Generators.js';
import { GenerateStringV2, GenerateUniqueIntervalV2, GenerateUniqueStringV2 } from './versioning/v2.js';
export declare const generatorsFuncs: {
    /**
     * generates same given value each time the generator is called.
     * @param defaultValue - value you want to generate
     * @param arraySize - number of elements in each one-dimensional array. (If specified, arrays will be generated.)
     *
     * @example
     * ```ts
     *  await seed(db, schema, { count: 1000 }).refine((funcs) => ({
     *   posts: {
     *    columns: {
     *     content: funcs.default({ defaultValue: "post content" }),
     *    },
     *   },
     *  }));
     * ```
     */
    default: (args_0: {
        defaultValue: unknown;
        arraySize?: number;
    }) => GenerateDefault;
    /**
     * generates values from given array
     * @param values - array of values you want to generate. can be array of weighted values.
     * @param isUnique - property that controls if generated values gonna be unique or not.
     * @param arraySize - number of elements in each one-dimensional array. (If specified, arrays will be generated.)
     *
     * @example
     * ```ts
     *  await seed(db, schema, { count: 1000 }).refine((funcs) => ({
     *    posts: {
     *      columns: {
     *        title: funcs.valuesFromArray({
     *          values: ["Title1", "Title2", "Title3", "Title4", "Title5"],
     *          isUnique: true
     *        }),
     *      },
     *    },
     *  }));
     *
     * ```
     * weighted values example
     * @example
     * ```ts
     *  await seed(db, schema, { count: 1000 }).refine((funcs) => ({
     *    posts: {
     *      columns: {
     *        title: funcs.valuesFromArray({
     *          values: [
     *            { weight: 0.35, values: ["Title1", "Title2"] },
     *            { weight: 0.5, values: ["Title3", "Title4"] },
     *            { weight: 0.15, values: ["Title5"] },
     *          ],
     *          isUnique: false
     *        }),
     *      },
     *    },
     *  }));
     *
     * ```
     */
    valuesFromArray: (args_0: {
        values: (number | string | boolean | undefined)[] | {
            weight: number;
            values: (number | string | boolean | undefined)[];
        }[];
        isUnique?: boolean;
        arraySize?: number;
    }) => GenerateValuesFromArray;
    /**
     * generates sequential integers starting with 1.
     * @example
     * ```ts
     *  await seed(db, schema, { count: 1000 }).refine((funcs) => ({
     *    posts: {
     *      columns: {
     *        id: funcs.intPrimaryKey(),
     *      },
     *    },
     *  }));
     *
     * ```
     */
    intPrimaryKey: (...args: [] | [{}]) => GenerateIntPrimaryKey;
    /**
     * generates numbers with floating point in given range.
     * @param minValue - lower border of range.
     * @param maxValue - upper border of range.
     * @param precision - precision of generated number:
     * precision equals 10 means that values will be accurate to one tenth (1.2, 34.6);
     * precision equals 100 means that values will be accurate to one hundredth (1.23, 34.67).
     * @param isUnique - property that controls if generated values gonna be unique or not.
     * @param arraySize - number of elements in each one-dimensional array. (If specified, arrays will be generated.)
     *
     * @example
     * ```ts
     *  await seed(db, schema, { count: 1000 }).refine((funcs) => ({
     *    products: {
     *      columns: {
     *        unitPrice: funcs.number({ minValue: 10, maxValue: 120, precision: 100, isUnique: false }),
     *      },
     *    },
     *  }));
     *
     * ```
     */
    number: (...args: [] | [{
        minValue?: number;
        maxValue?: number;
        precision?: number;
        isUnique?: boolean;
        arraySize?: number;
    }]) => GenerateNumber;
    /**
     * generates integers within given range.
     * @param minValue - lower border of range.
     * @param maxValue - upper border of range.
     * @param isUnique - property that controls if generated values gonna be unique or not.
     * @param arraySize - number of elements in each one-dimensional array. (If specified, arrays will be generated.)
     *
     * @example
     * ```ts
     *  await seed(db, schema, { count: 1000 }).refine((funcs) => ({
     *    products: {
     *      columns: {
     *        unitsInStock: funcs.number({ minValue: 0, maxValue: 100, isUnique: false }),
     *      },
     *    },
     *  }));
     *
     * ```
     */
    int: (...args: [] | [{
        minValue?: number | bigint;
        maxValue?: number | bigint;
        isUnique?: boolean;
        arraySize?: number;
    }]) => GenerateInt;
    /**
     * generates boolean values(true or false)
     * @param arraySize - number of elements in each one-dimensional array. (If specified, arrays will be generated.)
     *
     * @example
     * ```ts
     *  await seed(db, schema, { count: 1000 }).refine((funcs) => ({
     *    users: {
     *      columns: {
     *        isAvailable: funcs.boolean()
     *      },
     *    },
     *  }));
     *
     * ```
     */
    boolean: (...args: [] | [{
        arraySize?: number;
    }]) => GenerateBoolean;
    /**
     * generates date within given range.
     * @param minDate - lower border of range.
     * @param maxDate - upper border of range.
     * @param arraySize - number of elements in each one-dimensional array. (If specified, arrays will be generated.)
     *
     * @example
     * ```ts
     *  await seed(db, schema, { count: 1000 }).refine((funcs) => ({
     *    users: {
     *      columns: {
     *        birthDate: funcs.date({ minDate: "1990-01-01", maxDate: "2010-12-31" })
     *      },
     *    },
     *  }));
     *
     * ```
     */
    date: (...args: [] | [{
        minDate?: string | Date;
        maxDate?: string | Date;
        arraySize?: number;
    }]) => GenerateDate;
    /**
     * generates time in 24 hours style.
     * @param arraySize - number of elements in each one-dimensional array. (If specified, arrays will be generated.)
     *
     * @example
     * ```ts
     *  await seed(db, schema, { count: 1000 }).refine((funcs) => ({
     *    users: {
     *      columns: {
     *        birthTime: funcs.time()
     *      },
     *    },
     *  }));
     *
     * ```
     */
    time: (...args: [] | [{
        arraySize?: number;
    }]) => GenerateTime;
    /**
     * generates timestamps.
     * @param arraySize - number of elements in each one-dimensional array. (If specified, arrays will be generated.)
     *
     * @example
     * ```ts
     *  await seed(db, schema, { count: 1000 }).refine((funcs) => ({
     *    orders: {
     *      columns: {
     *        shippedDate: funcs.timestamp()
     *      },
     *    },
     *  }));
     *
     * ```
     */
    timestamp: (...args: [] | [{
        arraySize?: number;
    }]) => GenerateTimestamp;
    /**
     * generates datetime objects.
     * @param arraySize - number of elements in each one-dimensional array. (If specified, arrays will be generated.)
     *
     * @example
     * ```ts
     *  await seed(db, schema, { count: 1000 }).refine((funcs) => ({
     *    orders: {
     *      columns: {
     *        shippedDate: funcs.datetime()
     *      },
     *    },
     *  }));
     *
     * ```
     */
    datetime: (...args: [] | [{
        arraySize?: number;
    }]) => GenerateDatetime;
    /**
     * generates years.
     * @param arraySize - number of elements in each one-dimensional array. (If specified, arrays will be generated.)
     *
     * @example
     * ```ts
     *  await seed(db, schema, { count: 1000 }).refine((funcs) => ({
     *    users: {
     *      columns: {
     *        birthYear: funcs.year()
     *      },
     *    },
     *  }));
     *
     * ```
     */
    year: (...args: [] | [{
        arraySize?: number;
    }]) => GenerateYear;
    /**
     * generates json objects with fixed structure.
     * @param arraySize - number of elements in each one-dimensional array. (If specified, arrays will be generated.)
     *
     * json structure can equal this:
     * ```
     * {
     *     email,
     *     name,
     *     isGraduated,
     *     hasJob,
     *     salary,
     *     startedWorking,
     *     visitedCountries,
     * }
     * ```
     * or this
     * ```
     * {
     *     email,
     *     name,
     *     isGraduated,
     *     hasJob,
     *     visitedCountries,
     * }
     * ```
     *
     * @example
     * ```ts
     *  await seed(db, schema, { count: 1000 }).refine((funcs) => ({
     *    users: {
     *      columns: {
     *        metadata: funcs.json()
     *      },
     *    },
     *  }));
     * ```
     */
    json: (...args: [] | [{
        arraySize?: number;
    }]) => GenerateJson;
    /**
     * generates time intervals.
     *
     * interval example: "1 years 12 days 5 minutes"
     *
     * @param isUnique - property that controls if generated values gonna be unique or not.
     * @param arraySize - number of elements in each one-dimensional array. (If specified, arrays will be generated.)
     * @param fields - range of values you want to see in your intervals.
     * @example
     * ```ts
     * await seed(db, schema, { count: 1000 }).refine((funcs) => ({
     *    users: {
     *      columns: {
     *        timeSpentOnWebsite: funcs.interval()
     *      },
     *    },
     *  }));
     * ```
     */
    interval: (...args: [] | [{
        fields?: "year" | "month" | "day" | "hour" | "minute" | "second" | "year to month" | "day to hour" | "day to minute" | "day to second" | "hour to minute" | "hour to second" | "minute to second";
        isUnique?: boolean;
        arraySize?: number;
    }]) => GenerateInterval;
    /**
     * generates random strings.
     * @param isUnique - property that controls if generated values gonna be unique or not.
     * @param arraySize - number of elements in each one-dimensional array. (If specified, arrays will be generated.)
     *
     * @example
     * ```ts
     * await seed(db, schema, { count: 1000 }).refine((funcs) => ({
     *    users: {
     *      columns: {
     *        hashedPassword: funcs.string({isUnique: false})
     *      },
     *    },
     *  }));
     * ```
     */
    string: (...args: [] | [{
        isUnique?: boolean;
        arraySize?: number;
    }]) => GenerateString;
    /**
     * generates v4 UUID strings if arraySize is not specified, or v4 UUID 1D arrays if it is.
     *
     * @param arraySize - number of elements in each one-dimensional array. (If specified, arrays will be generated.)
     *
     * @example
     * ```ts
     *  await seed(db, schema, { count: 1000 }).refine((funcs) => ({
     *    users: {
     *      columns: {
     *        uuid: funcs.uuid({
     *          arraySize: 4
     *        })
     *      },
     *    },
     *  }));
     * ```
     */
    uuid: (...args: [] | [{
        arraySize?: number;
    }]) => GenerateUUID;
    /**
     * generates person's first names.
     * @param isUnique - property that controls if generated values gonna be unique or not.
     * @param arraySize - number of elements in each one-dimensional array. (If specified, arrays will be generated.)
     *
     * @example
     * ```ts
     *  await seed(db, schema, { count: 1000 }).refine((funcs) => ({
     *    users: {
     *      columns: {
     *        firstName: funcs.firstName({isUnique: true})
     *      },
     *    },
     *  }));
     * ```
     */
    firstName: (...args: [] | [{
        isUnique?: boolean;
        arraySize?: number;
    }]) => GenerateFirstName;
    /**
     * generates person's last names.
     * @param isUnique - property that controls if generated values gonna be unique or not.
     * @param arraySize - number of elements in each one-dimensional array. (If specified, arrays will be generated.)
     *
     * @example
     * ```ts
     *  await seed(db, schema, { count: 1000 }).refine((funcs) => ({
     *    users: {
     *      columns: {
     *        lastName: funcs.lastName({isUnique: false})
     *      },
     *    },
     *  }));
     * ```
     */
    lastName: (...args: [] | [{
        isUnique?: boolean;
        arraySize?: number;
    }]) => GenerateLastName;
    /**
     * generates person's full names.
     * @param isUnique - property that controls if generated values gonna be unique or not.
     * @param arraySize - number of elements in each one-dimensional array. (If specified, arrays will be generated.)
     *
     * @example
     * ```ts
     *  await seed(db, schema, { count: 1000 }).refine((funcs) => ({
     *    users: {
     *      columns: {
     *        fullName: funcs.fullName({isUnique: true})
     *      },
     *    },
     *  }));
     * ```
     */
    fullName: (...args: [] | [{
        isUnique?: boolean;
        arraySize?: number;
    }]) => GenerateFullName;
    /**
     * generates unique emails.
     * @param arraySize - number of elements in each one-dimensional array. (If specified, arrays will be generated.)
     *
     * @example
     * ```ts
     *  await seed(db, schema, { count: 1000 }).refine((funcs) => ({
     *    users: {
     *      columns: {
     *        email: funcs.email()
     *      },
     *    },
     *  }));
     * ```
     */
    email: (...args: [] | [{
        arraySize?: number;
    }]) => GenerateEmail;
    /**
     * generates unique phone numbers.
     * @param arraySize - number of elements in each one-dimensional array. (If specified, arrays will be generated.)
     *
     * @param template - phone number template, where all '#' symbols will be substituted with generated digits.
     * @param prefixes - array of any string you want to be your phone number prefixes.(not compatible with template property)
     * @param generatedDigitsNumbers - number of digits that will be added at the end of prefixes.(not compatible with template property)
     * @example
     * ```ts
     *  //generate phone number using template property
     *  await seed(db, schema, { count: 1000 }).refine((funcs) => ({
     *    users: {
     *      columns: {
     *        phoneNumber: funcs.phoneNumber({template: "+(380) ###-####"})
     *      },
     *    },
     *  }));
     *
     *  //generate phone number using prefixes and generatedDigitsNumbers properties
     *  await seed(db, schema, { count: 1000 }).refine((funcs) => ({
     *    users: {
     *      columns: {
     *        phoneNumber: funcs.phoneNumber({prefixes: [ "+380 99", "+380 67" ], generatedDigitsNumbers: 7})
     *      },
     *    },
     *  }));
     *
     *  //generate phone number using prefixes and generatedDigitsNumbers properties but with different generatedDigitsNumbers for prefixes
     *  await seed(db, schema, { count: 1000 }).refine((funcs) => ({
     *    users: {
     *      columns: {
     *        phoneNumber: funcs.phoneNumber({prefixes: [ "+380 99", "+380 67", "+1" ], generatedDigitsNumbers: [7, 7, 10]})
     *      },
     *    },
     *  }));
     *
     * ```
     */
    phoneNumber: (...args: [] | [{
        template?: string;
        prefixes?: string[];
        generatedDigitsNumbers?: number | number[];
        arraySize?: number;
    }]) => GeneratePhoneNumber;
    /**
     * generates country's names.
     * @param isUnique - property that controls if generated values gonna be unique or not.
     * @param arraySize - number of elements in each one-dimensional array. (If specified, arrays will be generated.)
     *
     * @example
     * ```ts
     *  await seed(db, schema, { count: 1000 }).refine((funcs) => ({
     *    users: {
     *      columns: {
     *        country: funcs.country({isUnique: false})
     *      },
     *    },
     *  }));
     * ```
     */
    country: (...args: [] | [{
        isUnique?: boolean;
        arraySize?: number;
    }]) => GenerateCountry;
    /**
     * generates city's names.
     * @param isUnique - property that controls if generated values gonna be unique or not.
     * @param arraySize - number of elements in each one-dimensional array. (If specified, arrays will be generated.)
     *
     * @example
     * ```ts
     *  await seed(db, schema, { count: 1000 }).refine((funcs) => ({
     *    users: {
     *      columns: {
     *        city: funcs.city({isUnique: false})
     *      },
     *    },
     *  }));
     * ```
     */
    city: (...args: [] | [{
        isUnique?: boolean;
        arraySize?: number;
    }]) => GenerateCity;
    /**
     * generates street address.
     * @param isUnique - property that controls if generated values gonna be unique or not.
     * @param arraySize - number of elements in each one-dimensional array. (If specified, arrays will be generated.)
     *
     * @example
     * ```ts
     *  await seed(db, schema, { count: 1000 }).refine((funcs) => ({
     *    users: {
     *      columns: {
     *        streetAddress: funcs.streetAddress({isUnique: true})
     *      },
     *    },
     *  }));
     * ```
     */
    streetAddress: (...args: [] | [{
        isUnique?: boolean;
        arraySize?: number;
    }]) => GenerateStreetAddress;
    /**
     * generates job titles.
     * @param arraySize - number of elements in each one-dimensional array. (If specified, arrays will be generated.)
     *
     * @example
     * ```ts
     *  await seed(db, schema, { count: 1000 }).refine((funcs) => ({
     *    users: {
     *      columns: {
     *        jobTitle: funcs.jobTitle()
     *      },
     *    },
     *  }));
     * ```
     */
    jobTitle: (...args: [] | [{
        arraySize?: number;
    }]) => GenerateJobTitle;
    /**
     * generates postal codes.
     *
     * @param isUnique - property that controls if generated values gonna be unique or not.
     * @param arraySize - number of elements in each one-dimensional array. (If specified, arrays will be generated.)
     *
     * @example
     * ```ts
     *  await seed(db, schema, { count: 1000 }).refine((funcs) => ({
     *    users: {
     *      columns: {
     *        postcode: funcs.postcode({isUnique: true})
     *      },
     *    },
     *  }));
     * ```
     */
    postcode: (...args: [] | [{
        isUnique?: boolean;
        arraySize?: number;
    }]) => GeneratePostcode;
    /**
     * generates states of America.
     * @param arraySize - number of elements in each one-dimensional array. (If specified, arrays will be generated.)
     *
     * @example
     * ```ts
     *  await seed(db, schema, { count: 1000 }).refine((funcs) => ({
     *    users: {
     *      columns: {
     *        state: funcs.state()
     *      },
     *    },
     *  }));
     * ```
     */
    state: (...args: [] | [{
        arraySize?: number;
    }]) => GenerateState;
    /**
     * generates company's names.
     *
     * @param isUnique - property that controls if generated values gonna be unique or not.
     * @param arraySize - number of elements in each one-dimensional array. (If specified, arrays will be generated.)
     *
     * @example
     * ```ts
     *  await seed(db, schema, { count: 1000 }).refine((funcs) => ({
     *    users: {
     *      columns: {
     *        company: funcs.companyName({isUnique: true})
     *      },
     *    },
     *  }));
     * ```
     */
    companyName: (...args: [] | [{
        isUnique?: boolean;
        arraySize?: number;
    }]) => GenerateCompanyName;
    /**
     * generates 'lorem ipsum' text sentences.
     *
     * @param sentencesCount - number of sentences you want to generate as one generated value(string).
     * @param arraySize - number of elements in each one-dimensional array. (If specified, arrays will be generated.)
     *
     * @example
     * ```ts
     *  await seed(db, schema, { count: 1000 }).refine((funcs) => ({
     *    posts: {
     *      columns: {
     *        content: funcs.loremIpsum({sentencesCount: 2})
     *      },
     *    },
     *  }));
     * ```
     */
    loremIpsum: (...args: [] | [{
        sentencesCount?: number;
        arraySize?: number;
    }]) => GenerateLoremIpsum;
    /**
     * generates 2D points within specified ranges for x and y coordinates.
     *
     * @param isUnique - property that controls if generated values gonna be unique or not.
     * @param minXValue - lower bound of range for x coordinate.
     * @param maxXValue - upper bound of range for x coordinate.
     * @param minYValue - lower bound of range for y coordinate.
     * @param maxYValue - upper bound of range for y coordinate.
     * @param arraySize - number of elements in each one-dimensional array. (If specified, arrays will be generated.)
     *
     * @example
     * ```ts
     *  await seed(db, schema, { count: 1000 }).refine((funcs) => ({
     *    triangles: {
     *      columns: {
     *        pointCoords: funcs.point({
     *          isUnique: true,
     *          minXValue: -5, maxXValue:20,
     *          minYValue: 0, maxYValue: 30
     *        })
     *      },
     *    },
     *  }));
     * ```
     */
    point: (...args: [] | [{
        isUnique?: boolean;
        minXValue?: number;
        maxXValue?: number;
        minYValue?: number;
        maxYValue?: number;
        arraySize?: number;
    }]) => GeneratePoint;
    /**
     * generates 2D lines within specified ranges for a, b and c parameters of line.
     *
     * ```
     * line equation: a*x + b*y + c = 0
     * ```
     *
     * @param isUnique - property that controls if generated values gonna be unique or not.
     * @param minAValue - lower bound of range for a parameter.
     * @param maxAValue - upper bound of range for x parameter.
     * @param minBValue - lower bound of range for y parameter.
     * @param maxBValue - upper bound of range for y parameter.
     * @param minCValue - lower bound of range for y parameter.
     * @param maxCValue - upper bound of range for y parameter.
     * @param arraySize - number of elements in each one-dimensional array. (If specified, arrays will be generated.)
     *
     * @example
     * ```ts
     *  await seed(db, schema, { count: 1000 }).refine((funcs) => ({
     *    lines: {
     *      columns: {
     *        lineParams: funcs.point({
     *          isUnique: true,
     *          minAValue: -5, maxAValue:20,
     *          minBValue: 0, maxBValue: 30,
     *          minCValue: 0, maxCValue: 10
     *        })
     *      },
     *    },
     *  }));
     * ```
     */
    line: (...args: [] | [{
        isUnique?: boolean;
        minAValue?: number;
        maxAValue?: number;
        minBValue?: number;
        maxBValue?: number;
        minCValue?: number;
        maxCValue?: number;
        arraySize?: number;
    }]) => GenerateLine;
    /**
     * gives you the opportunity to call different generators with different probabilities to generate values for one column.
     * @param params - array of generators with probabilities you would like to call them to generate values.
     *
     * @example
     * ```ts
     *  await seed(db, schema, { count: 1000 }).refine((funcs) => ({
     *    posts: {
     *      columns: {
     *        content: funcs.weightedRandom([
     *          {
     *            weight: 0.6,
     *            value: funcs.loremIpsum({ sentencesCount: 3 }),
     *          },
     *          {
     *            weight: 0.4,
     *            value: funcs.default({ defaultValue: "TODO" }),
     *          },
     *        ]),
     *      },
     *    },
     *  }));
     * ```
     */
    weightedRandom: (args_0: {
        weight: number;
        value: AbstractGenerator<any>;
    }[]) => WeightedRandomGenerator;
};
export declare const generatorsFuncsV2: {
    /**
     * generates same given value each time the generator is called.
     * @param defaultValue - value you want to generate
     * @param arraySize - number of elements in each one-dimensional array. (If specified, arrays will be generated.)
     *
     * @example
     * ```ts
     *  await seed(db, schema, { count: 1000 }).refine((funcs) => ({
     *   posts: {
     *    columns: {
     *     content: funcs.default({ defaultValue: "post content" }),
     *    },
     *   },
     *  }));
     * ```
     */
    default: (args_0: {
        defaultValue: unknown;
        arraySize?: number;
    }) => GenerateDefault;
    /**
     * generates values from given array
     * @param values - array of values you want to generate. can be array of weighted values.
     * @param isUnique - property that controls if generated values gonna be unique or not.
     * @param arraySize - number of elements in each one-dimensional array. (If specified, arrays will be generated.)
     *
     * @example
     * ```ts
     *  await seed(db, schema, { count: 1000 }).refine((funcs) => ({
     *    posts: {
     *      columns: {
     *        title: funcs.valuesFromArray({
     *          values: ["Title1", "Title2", "Title3", "Title4", "Title5"],
     *          isUnique: true
     *        }),
     *      },
     *    },
     *  }));
     *
     * ```
     * weighted values example
     * @example
     * ```ts
     *  await seed(db, schema, { count: 1000 }).refine((funcs) => ({
     *    posts: {
     *      columns: {
     *        title: funcs.valuesFromArray({
     *          values: [
     *            { weight: 0.35, values: ["Title1", "Title2"] },
     *            { weight: 0.5, values: ["Title3", "Title4"] },
     *            { weight: 0.15, values: ["Title5"] },
     *          ],
     *          isUnique: false
     *        }),
     *      },
     *    },
     *  }));
     *
     * ```
     */
    valuesFromArray: (args_0: {
        values: (number | string | boolean | undefined)[] | {
            weight: number;
            values: (number | string | boolean | undefined)[];
        }[];
        isUnique?: boolean;
        arraySize?: number;
    }) => GenerateValuesFromArray;
    /**
     * generates sequential integers starting with 1.
     * @example
     * ```ts
     *  await seed(db, schema, { count: 1000 }).refine((funcs) => ({
     *    posts: {
     *      columns: {
     *        id: funcs.intPrimaryKey(),
     *      },
     *    },
     *  }));
     *
     * ```
     */
    intPrimaryKey: (...args: [] | [{}]) => GenerateIntPrimaryKey;
    /**
     * generates numbers with floating point in given range.
     * @param minValue - lower border of range.
     * @param maxValue - upper border of range.
     * @param precision - precision of generated number:
     * precision equals 10 means that values will be accurate to one tenth (1.2, 34.6);
     * precision equals 100 means that values will be accurate to one hundredth (1.23, 34.67).
     * @param isUnique - property that controls if generated values gonna be unique or not.
     * @param arraySize - number of elements in each one-dimensional array. (If specified, arrays will be generated.)
     *
     * @example
     * ```ts
     *  await seed(db, schema, { count: 1000 }).refine((funcs) => ({
     *    products: {
     *      columns: {
     *        unitPrice: funcs.number({ minValue: 10, maxValue: 120, precision: 100, isUnique: false }),
     *      },
     *    },
     *  }));
     *
     * ```
     */
    number: (...args: [] | [{
        minValue?: number;
        maxValue?: number;
        precision?: number;
        isUnique?: boolean;
        arraySize?: number;
    }]) => GenerateNumber;
    /**
     * generates integers within given range.
     * @param minValue - lower border of range.
     * @param maxValue - upper border of range.
     * @param isUnique - property that controls if generated values gonna be unique or not.
     * @param arraySize - number of elements in each one-dimensional array. (If specified, arrays will be generated.)
     *
     * @example
     * ```ts
     *  await seed(db, schema, { count: 1000 }).refine((funcs) => ({
     *    products: {
     *      columns: {
     *        unitsInStock: funcs.number({ minValue: 0, maxValue: 100, isUnique: false }),
     *      },
     *    },
     *  }));
     *
     * ```
     */
    int: (...args: [] | [{
        minValue?: number | bigint;
        maxValue?: number | bigint;
        isUnique?: boolean;
        arraySize?: number;
    }]) => GenerateInt;
    /**
     * generates boolean values(true or false)
     * @param arraySize - number of elements in each one-dimensional array. (If specified, arrays will be generated.)
     *
     * @example
     * ```ts
     *  await seed(db, schema, { count: 1000 }).refine((funcs) => ({
     *    users: {
     *      columns: {
     *        isAvailable: funcs.boolean()
     *      },
     *    },
     *  }));
     *
     * ```
     */
    boolean: (...args: [] | [{
        arraySize?: number;
    }]) => GenerateBoolean;
    /**
     * generates date within given range.
     * @param minDate - lower border of range.
     * @param maxDate - upper border of range.
     * @param arraySize - number of elements in each one-dimensional array. (If specified, arrays will be generated.)
     *
     * @example
     * ```ts
     *  await seed(db, schema, { count: 1000 }).refine((funcs) => ({
     *    users: {
     *      columns: {
     *        birthDate: funcs.date({ minDate: "1990-01-01", maxDate: "2010-12-31" })
     *      },
     *    },
     *  }));
     *
     * ```
     */
    date: (...args: [] | [{
        minDate?: string | Date;
        maxDate?: string | Date;
        arraySize?: number;
    }]) => GenerateDate;
    /**
     * generates time in 24 hours style.
     * @param arraySize - number of elements in each one-dimensional array. (If specified, arrays will be generated.)
     *
     * @example
     * ```ts
     *  await seed(db, schema, { count: 1000 }).refine((funcs) => ({
     *    users: {
     *      columns: {
     *        birthTime: funcs.time()
     *      },
     *    },
     *  }));
     *
     * ```
     */
    time: (...args: [] | [{
        arraySize?: number;
    }]) => GenerateTime;
    /**
     * generates timestamps.
     * @param arraySize - number of elements in each one-dimensional array. (If specified, arrays will be generated.)
     *
     * @example
     * ```ts
     *  await seed(db, schema, { count: 1000 }).refine((funcs) => ({
     *    orders: {
     *      columns: {
     *        shippedDate: funcs.timestamp()
     *      },
     *    },
     *  }));
     *
     * ```
     */
    timestamp: (...args: [] | [{
        arraySize?: number;
    }]) => GenerateTimestamp;
    /**
     * generates datetime objects.
     * @param arraySize - number of elements in each one-dimensional array. (If specified, arrays will be generated.)
     *
     * @example
     * ```ts
     *  await seed(db, schema, { count: 1000 }).refine((funcs) => ({
     *    orders: {
     *      columns: {
     *        shippedDate: funcs.datetime()
     *      },
     *    },
     *  }));
     *
     * ```
     */
    datetime: (...args: [] | [{
        arraySize?: number;
    }]) => GenerateDatetime;
    /**
     * generates years.
     * @param arraySize - number of elements in each one-dimensional array. (If specified, arrays will be generated.)
     *
     * @example
     * ```ts
     *  await seed(db, schema, { count: 1000 }).refine((funcs) => ({
     *    users: {
     *      columns: {
     *        birthYear: funcs.year()
     *      },
     *    },
     *  }));
     *
     * ```
     */
    year: (...args: [] | [{
        arraySize?: number;
    }]) => GenerateYear;
    /**
     * generates json objects with fixed structure.
     * @param arraySize - number of elements in each one-dimensional array. (If specified, arrays will be generated.)
     *
     * json structure can equal this:
     * ```
     * {
     *     email,
     *     name,
     *     isGraduated,
     *     hasJob,
     *     salary,
     *     startedWorking,
     *     visitedCountries,
     * }
     * ```
     * or this
     * ```
     * {
     *     email,
     *     name,
     *     isGraduated,
     *     hasJob,
     *     visitedCountries,
     * }
     * ```
     *
     * @example
     * ```ts
     *  await seed(db, schema, { count: 1000 }).refine((funcs) => ({
     *    users: {
     *      columns: {
     *        metadata: funcs.json()
     *      },
     *    },
     *  }));
     * ```
     */
    json: (...args: [] | [{
        arraySize?: number;
    }]) => GenerateJson;
    /**
     * generates time intervals.
     *
     * interval example: "1 years 12 days 5 minutes"
     *
     * @param isUnique - property that controls if generated values gonna be unique or not.
     * @param arraySize - number of elements in each one-dimensional array. (If specified, arrays will be generated.)
     * @param fields - range of values you want to see in your intervals.
     * @example
     * ```ts
     * await seed(db, schema, { count: 1000 }).refine((funcs) => ({
     *    users: {
     *      columns: {
     *        timeSpentOnWebsite: funcs.interval()
     *      },
     *    },
     *  }));
     * ```
     */
    interval: (...args: [] | [{
        fields?: "year" | "month" | "day" | "hour" | "minute" | "second" | "year to month" | "day to hour" | "day to minute" | "day to second" | "hour to minute" | "hour to second" | "minute to second";
        isUnique?: boolean;
        arraySize?: number;
    }]) => GenerateInterval;
    /**
     * generates random strings.
     * @param isUnique - property that controls if generated values gonna be unique or not.
     * @param arraySize - number of elements in each one-dimensional array. (If specified, arrays will be generated.)
     *
     * @example
     * ```ts
     * await seed(db, schema, { count: 1000 }).refine((funcs) => ({
     *    users: {
     *      columns: {
     *        hashedPassword: funcs.string({isUnique: false})
     *      },
     *    },
     *  }));
     * ```
     */
    string: (...args: [] | [{
        isUnique?: boolean;
        arraySize?: number;
    }]) => GenerateString;
    /**
     * generates v4 UUID strings if arraySize is not specified, or v4 UUID 1D arrays if it is.
     *
     * @param arraySize - number of elements in each one-dimensional array. (If specified, arrays will be generated.)
     *
     * @example
     * ```ts
     *  await seed(db, schema, { count: 1000 }).refine((funcs) => ({
     *    users: {
     *      columns: {
     *        uuid: funcs.uuid({
     *          arraySize: 4
     *        })
     *      },
     *    },
     *  }));
     * ```
     */
    uuid: (...args: [] | [{
        arraySize?: number;
    }]) => GenerateUUID;
    /**
     * generates person's first names.
     * @param isUnique - property that controls if generated values gonna be unique or not.
     * @param arraySize - number of elements in each one-dimensional array. (If specified, arrays will be generated.)
     *
     * @example
     * ```ts
     *  await seed(db, schema, { count: 1000 }).refine((funcs) => ({
     *    users: {
     *      columns: {
     *        firstName: funcs.firstName({isUnique: true})
     *      },
     *    },
     *  }));
     * ```
     */
    firstName: (...args: [] | [{
        isUnique?: boolean;
        arraySize?: number;
    }]) => GenerateFirstName;
    /**
     * generates person's last names.
     * @param isUnique - property that controls if generated values gonna be unique or not.
     * @param arraySize - number of elements in each one-dimensional array. (If specified, arrays will be generated.)
     *
     * @example
     * ```ts
     *  await seed(db, schema, { count: 1000 }).refine((funcs) => ({
     *    users: {
     *      columns: {
     *        lastName: funcs.lastName({isUnique: false})
     *      },
     *    },
     *  }));
     * ```
     */
    lastName: (...args: [] | [{
        isUnique?: boolean;
        arraySize?: number;
    }]) => GenerateLastName;
    /**
     * generates person's full names.
     * @param isUnique - property that controls if generated values gonna be unique or not.
     * @param arraySize - number of elements in each one-dimensional array. (If specified, arrays will be generated.)
     *
     * @example
     * ```ts
     *  await seed(db, schema, { count: 1000 }).refine((funcs) => ({
     *    users: {
     *      columns: {
     *        fullName: funcs.fullName({isUnique: true})
     *      },
     *    },
     *  }));
     * ```
     */
    fullName: (...args: [] | [{
        isUnique?: boolean;
        arraySize?: number;
    }]) => GenerateFullName;
    /**
     * generates unique emails.
     * @param arraySize - number of elements in each one-dimensional array. (If specified, arrays will be generated.)
     *
     * @example
     * ```ts
     *  await seed(db, schema, { count: 1000 }).refine((funcs) => ({
     *    users: {
     *      columns: {
     *        email: funcs.email()
     *      },
     *    },
     *  }));
     * ```
     */
    email: (...args: [] | [{
        arraySize?: number;
    }]) => GenerateEmail;
    /**
     * generates unique phone numbers.
     * @param arraySize - number of elements in each one-dimensional array. (If specified, arrays will be generated.)
     *
     * @param template - phone number template, where all '#' symbols will be substituted with generated digits.
     * @param prefixes - array of any string you want to be your phone number prefixes.(not compatible with template property)
     * @param generatedDigitsNumbers - number of digits that will be added at the end of prefixes.(not compatible with template property)
     * @example
     * ```ts
     *  //generate phone number using template property
     *  await seed(db, schema, { count: 1000 }).refine((funcs) => ({
     *    users: {
     *      columns: {
     *        phoneNumber: funcs.phoneNumber({template: "+(380) ###-####"})
     *      },
     *    },
     *  }));
     *
     *  //generate phone number using prefixes and generatedDigitsNumbers properties
     *  await seed(db, schema, { count: 1000 }).refine((funcs) => ({
     *    users: {
     *      columns: {
     *        phoneNumber: funcs.phoneNumber({prefixes: [ "+380 99", "+380 67" ], generatedDigitsNumbers: 7})
     *      },
     *    },
     *  }));
     *
     *  //generate phone number using prefixes and generatedDigitsNumbers properties but with different generatedDigitsNumbers for prefixes
     *  await seed(db, schema, { count: 1000 }).refine((funcs) => ({
     *    users: {
     *      columns: {
     *        phoneNumber: funcs.phoneNumber({prefixes: [ "+380 99", "+380 67", "+1" ], generatedDigitsNumbers: [7, 7, 10]})
     *      },
     *    },
     *  }));
     *
     * ```
     */
    phoneNumber: (...args: [] | [{
        template?: string;
        prefixes?: string[];
        generatedDigitsNumbers?: number | number[];
        arraySize?: number;
    }]) => GeneratePhoneNumber;
    /**
     * generates country's names.
     * @param isUnique - property that controls if generated values gonna be unique or not.
     * @param arraySize - number of elements in each one-dimensional array. (If specified, arrays will be generated.)
     *
     * @example
     * ```ts
     *  await seed(db, schema, { count: 1000 }).refine((funcs) => ({
     *    users: {
     *      columns: {
     *        country: funcs.country({isUnique: false})
     *      },
     *    },
     *  }));
     * ```
     */
    country: (...args: [] | [{
        isUnique?: boolean;
        arraySize?: number;
    }]) => GenerateCountry;
    /**
     * generates city's names.
     * @param isUnique - property that controls if generated values gonna be unique or not.
     * @param arraySize - number of elements in each one-dimensional array. (If specified, arrays will be generated.)
     *
     * @example
     * ```ts
     *  await seed(db, schema, { count: 1000 }).refine((funcs) => ({
     *    users: {
     *      columns: {
     *        city: funcs.city({isUnique: false})
     *      },
     *    },
     *  }));
     * ```
     */
    city: (...args: [] | [{
        isUnique?: boolean;
        arraySize?: number;
    }]) => GenerateCity;
    /**
     * generates street address.
     * @param isUnique - property that controls if generated values gonna be unique or not.
     * @param arraySize - number of elements in each one-dimensional array. (If specified, arrays will be generated.)
     *
     * @example
     * ```ts
     *  await seed(db, schema, { count: 1000 }).refine((funcs) => ({
     *    users: {
     *      columns: {
     *        streetAddress: funcs.streetAddress({isUnique: true})
     *      },
     *    },
     *  }));
     * ```
     */
    streetAddress: (...args: [] | [{
        isUnique?: boolean;
        arraySize?: number;
    }]) => GenerateStreetAddress;
    /**
     * generates job titles.
     * @param arraySize - number of elements in each one-dimensional array. (If specified, arrays will be generated.)
     *
     * @example
     * ```ts
     *  await seed(db, schema, { count: 1000 }).refine((funcs) => ({
     *    users: {
     *      columns: {
     *        jobTitle: funcs.jobTitle()
     *      },
     *    },
     *  }));
     * ```
     */
    jobTitle: (...args: [] | [{
        arraySize?: number;
    }]) => GenerateJobTitle;
    /**
     * generates postal codes.
     *
     * @param isUnique - property that controls if generated values gonna be unique or not.
     * @param arraySize - number of elements in each one-dimensional array. (If specified, arrays will be generated.)
     *
     * @example
     * ```ts
     *  await seed(db, schema, { count: 1000 }).refine((funcs) => ({
     *    users: {
     *      columns: {
     *        postcode: funcs.postcode({isUnique: true})
     *      },
     *    },
     *  }));
     * ```
     */
    postcode: (...args: [] | [{
        isUnique?: boolean;
        arraySize?: number;
    }]) => GeneratePostcode;
    /**
     * generates states of America.
     * @param arraySize - number of elements in each one-dimensional array. (If specified, arrays will be generated.)
     *
     * @example
     * ```ts
     *  await seed(db, schema, { count: 1000 }).refine((funcs) => ({
     *    users: {
     *      columns: {
     *        state: funcs.state()
     *      },
     *    },
     *  }));
     * ```
     */
    state: (...args: [] | [{
        arraySize?: number;
    }]) => GenerateState;
    /**
     * generates company's names.
     *
     * @param isUnique - property that controls if generated values gonna be unique or not.
     * @param arraySize - number of elements in each one-dimensional array. (If specified, arrays will be generated.)
     *
     * @example
     * ```ts
     *  await seed(db, schema, { count: 1000 }).refine((funcs) => ({
     *    users: {
     *      columns: {
     *        company: funcs.companyName({isUnique: true})
     *      },
     *    },
     *  }));
     * ```
     */
    companyName: (...args: [] | [{
        isUnique?: boolean;
        arraySize?: number;
    }]) => GenerateCompanyName;
    /**
     * generates 'lorem ipsum' text sentences.
     *
     * @param sentencesCount - number of sentences you want to generate as one generated value(string).
     * @param arraySize - number of elements in each one-dimensional array. (If specified, arrays will be generated.)
     *
     * @example
     * ```ts
     *  await seed(db, schema, { count: 1000 }).refine((funcs) => ({
     *    posts: {
     *      columns: {
     *        content: funcs.loremIpsum({sentencesCount: 2})
     *      },
     *    },
     *  }));
     * ```
     */
    loremIpsum: (...args: [] | [{
        sentencesCount?: number;
        arraySize?: number;
    }]) => GenerateLoremIpsum;
    /**
     * generates 2D points within specified ranges for x and y coordinates.
     *
     * @param isUnique - property that controls if generated values gonna be unique or not.
     * @param minXValue - lower bound of range for x coordinate.
     * @param maxXValue - upper bound of range for x coordinate.
     * @param minYValue - lower bound of range for y coordinate.
     * @param maxYValue - upper bound of range for y coordinate.
     * @param arraySize - number of elements in each one-dimensional array. (If specified, arrays will be generated.)
     *
     * @example
     * ```ts
     *  await seed(db, schema, { count: 1000 }).refine((funcs) => ({
     *    triangles: {
     *      columns: {
     *        pointCoords: funcs.point({
     *          isUnique: true,
     *          minXValue: -5, maxXValue:20,
     *          minYValue: 0, maxYValue: 30
     *        })
     *      },
     *    },
     *  }));
     * ```
     */
    point: (...args: [] | [{
        isUnique?: boolean;
        minXValue?: number;
        maxXValue?: number;
        minYValue?: number;
        maxYValue?: number;
        arraySize?: number;
    }]) => GeneratePoint;
    /**
     * generates 2D lines within specified ranges for a, b and c parameters of line.
     *
     * ```
     * line equation: a*x + b*y + c = 0
     * ```
     *
     * @param isUnique - property that controls if generated values gonna be unique or not.
     * @param minAValue - lower bound of range for a parameter.
     * @param maxAValue - upper bound of range for x parameter.
     * @param minBValue - lower bound of range for y parameter.
     * @param maxBValue - upper bound of range for y parameter.
     * @param minCValue - lower bound of range for y parameter.
     * @param maxCValue - upper bound of range for y parameter.
     * @param arraySize - number of elements in each one-dimensional array. (If specified, arrays will be generated.)
     *
     * @example
     * ```ts
     *  await seed(db, schema, { count: 1000 }).refine((funcs) => ({
     *    lines: {
     *      columns: {
     *        lineParams: funcs.point({
     *          isUnique: true,
     *          minAValue: -5, maxAValue:20,
     *          minBValue: 0, maxBValue: 30,
     *          minCValue: 0, maxCValue: 10
     *        })
     *      },
     *    },
     *  }));
     * ```
     */
    line: (...args: [] | [{
        isUnique?: boolean;
        minAValue?: number;
        maxAValue?: number;
        minBValue?: number;
        maxBValue?: number;
        minCValue?: number;
        maxCValue?: number;
        arraySize?: number;
    }]) => GenerateLine;
    /**
     * gives you the opportunity to call different generators with different probabilities to generate values for one column.
     * @param params - array of generators with probabilities you would like to call them to generate values.
     *
     * @example
     * ```ts
     *  await seed(db, schema, { count: 1000 }).refine((funcs) => ({
     *    posts: {
     *      columns: {
     *        content: funcs.weightedRandom([
     *          {
     *            weight: 0.6,
     *            value: funcs.loremIpsum({ sentencesCount: 3 }),
     *          },
     *          {
     *            weight: 0.4,
     *            value: funcs.default({ defaultValue: "TODO" }),
     *          },
     *        ]),
     *      },
     *    },
     *  }));
     * ```
     */
    weightedRandom: (args_0: {
        weight: number;
        value: AbstractGenerator<any>;
    }[]) => WeightedRandomGenerator;
};
export declare const generatorsMap: {
    readonly HollowGenerator: readonly [typeof HollowGenerator];
    readonly GenerateDefault: readonly [typeof GenerateDefault];
    readonly GenerateValuesFromArray: readonly [typeof GenerateValuesFromArray];
    readonly GenerateSelfRelationsValuesFromArray: readonly [typeof GenerateSelfRelationsValuesFromArray];
    readonly GenerateIntPrimaryKey: readonly [typeof GenerateIntPrimaryKey];
    readonly GenerateNumber: readonly [typeof GenerateNumber];
    readonly GenerateUniqueNumber: readonly [typeof GenerateUniqueNumber];
    readonly GenerateInt: readonly [typeof GenerateInt];
    readonly GenerateUniqueInt: readonly [typeof GenerateUniqueInt];
    readonly GenerateBoolean: readonly [typeof GenerateBoolean];
    readonly GenerateDate: readonly [typeof GenerateDate];
    readonly GenerateTime: readonly [typeof GenerateTime];
    readonly GenerateTimestamp: readonly [typeof GenerateTimestamp];
    readonly GenerateDatetime: readonly [typeof GenerateDatetime];
    readonly GenerateYear: readonly [typeof GenerateYear];
    readonly GenerateJson: readonly [typeof GenerateJson];
    readonly GenerateEnum: readonly [typeof GenerateEnum];
    readonly GenerateInterval: readonly [typeof GenerateInterval];
    readonly GenerateUniqueInterval: readonly [typeof GenerateUniqueInterval, typeof GenerateUniqueIntervalV2];
    readonly GenerateString: readonly [typeof GenerateString, typeof GenerateStringV2];
    readonly GenerateUniqueString: readonly [typeof GenerateUniqueString, typeof GenerateUniqueStringV2];
    readonly GenerateUUID: readonly [typeof GenerateUUID];
    readonly GenerateFirstName: readonly [typeof GenerateFirstName];
    readonly GenerateUniqueFirstName: readonly [typeof GenerateUniqueFirstName];
    readonly GenerateLastName: readonly [typeof GenerateLastName];
    readonly GenerateUniqueLastName: readonly [typeof GenerateUniqueLastName];
    readonly GenerateFullName: readonly [typeof GenerateFullName];
    readonly GenerateUniqueFullName: readonly [typeof GenerateUniqueFullName];
    readonly GenerateEmail: readonly [typeof GenerateEmail];
    readonly GeneratePhoneNumber: readonly [typeof GeneratePhoneNumber];
    readonly GenerateCountry: readonly [typeof GenerateCountry];
    readonly GenerateUniqueCountry: readonly [typeof GenerateUniqueCountry];
    readonly GenerateCity: readonly [typeof GenerateCity];
    readonly GenerateUniqueCity: readonly [typeof GenerateUniqueCity];
    readonly GenerateStreetAddress: readonly [typeof GenerateStreetAddress];
    readonly GenerateUniqueStreetAddress: readonly [typeof GenerateUniqueStreetAddress];
    readonly GenerateJobTitle: readonly [typeof GenerateJobTitle];
    readonly GeneratePostcode: readonly [typeof GeneratePostcode];
    readonly GenerateUniquePostcode: readonly [typeof GenerateUniquePostcode];
    readonly GenerateState: readonly [typeof GenerateState];
    readonly GenerateCompanyName: readonly [typeof GenerateCompanyName];
    readonly GenerateUniqueCompanyName: readonly [typeof GenerateUniqueCompanyName];
    readonly GenerateLoremIpsum: readonly [typeof GenerateLoremIpsum];
    readonly GeneratePoint: readonly [typeof GeneratePoint];
    readonly GenerateUniquePoint: readonly [typeof GenerateUniquePoint];
    readonly GenerateLine: readonly [typeof GenerateLine];
    readonly GenerateUniqueLine: readonly [typeof GenerateUniqueLine];
    readonly WeightedRandomGenerator: readonly [typeof WeightedRandomGenerator];
    readonly GenerateArray: readonly [typeof GenerateArray];
    readonly GenerateWeightedCount: readonly [typeof GenerateWeightedCount];
};
