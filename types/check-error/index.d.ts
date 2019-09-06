// Type definitions for check-error 1.0
// Project: https://github.com/chaijs/check-error
// Definitions by: Porama Ruengrairatanaroj <https://github.com/Seally>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

export type ErrorLike = Error | string | {
    new (...args: any[]): Error
} | {
    (...args: any[]): Error
};

/**
 * Checks if two instances are compatible (strict equal).
 *
 * Returns false if errorLike is not an instance of Error, because instances
 * can only be compatible if they're both error instances.
 *
 * @param thrown - error
 * @param errorLike - object to compare against
 */
export function compatibleInstance(thrown: ErrorLike, errorLike: ErrorLike): boolean;

/**
 * Checks if two constructors are compatible.
 *
 * This function can receive either an error constructor or an error
 * instance as the `errorLike` argument.
 *
 * Constructors are compatible if they're the same or if one is an instance
 * of another.
 *
 * @param thrown - error
 * @param errorLike - object to compare against
 */
export function compatibleConstructor(thrown: ErrorLike, errorLike: ErrorLike): boolean;

/**
 * Checks if an error's message is compatible with a matcher (String or
 * RegExp).
 *
 * If the message contains the String or passes the RegExp test,
 * it is considered compatible.
 *
 * @param thrown - error
 * @param errMatcher - string/regex to look for in the message
 */
export function compatibleMessage(thrown: ErrorLike, errMatcher: string | RegExp): boolean;

/**
 * Gets the error message from an error.
 *
 * If `err` is a String itself, we return it.
 * If the error has no message, we return an empty string.
 *
 * @param errorLike
 */
export function getMessage(errorLike: ErrorLike): string;

/**
 * Gets the constructor name for an Error instance or constructor itself.
 */
export function getConstructorName(errorLike: ErrorLike): string;
