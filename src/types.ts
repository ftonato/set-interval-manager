/** A function that takes no arguments and returns no value. */
export type IntervalFn = () => void;

/** An object to store interval IDs keyed by string identifiers. */
export type IntervalIds = Record<string, number | NodeJS.Timer>;
