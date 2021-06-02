/**
 * Parses a time string.
 *
 * If a meridian is given, automatically limits the
 * maximum time to 24 hours.
 *
 * Upon successful parsing, returns the time as
 * a {@link TimeDescriptor} object.
 *
 * If parsing was not successful, or the time is
 * invalid, returns `undefined`.
 *
 * @param {string} time Time string input.
 * @param {ParseTimeOptions} options An options object.
 * @param {number} options.max The maximum (exclusive) total milliseconds to accept.
 * @returns {TimeDescriptor} A {@link TimeDescriptor} object or `undefined`.
 */
export function parseTime(
    time: string,
    options?: ParseTimeOptions
): TimeDescriptor | undefined;

/**
 * @alias parseTime
 */
export function timeParse(
    time: string,
    options?: ParseTimeOptions
): TimeDescriptor | undefined;

/**
 * Parses the time of the day.
 *
 * Limits the maximum time to 24 hours (exclusive).
 *
 * Upon successful parsing, returns the time as
 * a {@link TimeDescriptor} object.
 *
 * If parsing was not successful, or the time is
 * invalid, returns `undefined`.
 *
 * @param {string} time
 * @returns {TimeDescriptor} A {@link TimeDescriptor} object or `undefined`.
 */
export function parseTimeOfDay(time: string): TimeDescriptor | undefined;

/**
 * Time relative to the start of the day.
 */
export interface TimeDescriptor {
    /** The hour component. */
    hours: number;
    /** The minute component. */
    minutes: number;
    /** The total number of milliseconds since the start of the day. */
    totalMs: number;
    /** The total number of milliseconds since the start of the day. */
    valueOf: () => number;
}

/**
 * Time parsing options.
 */
export interface ParseTimeOptions {
    /** The maximum (exclusive) total milliseconds to accept. */
    max?: number;
}
