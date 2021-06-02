const NUMBER_REGEX = /^\d+$/g;
const TIME_REGEX = /^\s*(\d{1,})\s*[:h\.]?\s*(\d{2})?\s*((?:a|p)m?)?\s*$/gi;
const kMsInDay = 86400e3;
const kTimeOfDayOptions = { max: kMsInDay };

function parseTime(time, options) {
    time = (time || '').trim() || '0';
    let hours = 0;
    let mins = 0;
    let meridiem = '';
    if (time.match(NUMBER_REGEX)) {
        const num = parseInt(time);
        if (num < 24 && time.length <= 2) {
            // Assume hours
            hours = num;
        } else if (time.length > 2) {
            // Assume hours and minutes
            hours = Math.floor(num / 100);
            mins = Math.round(num - hours * 100);
        } else {
            return undefined;
        }
    } else {
        // Match
        const matches = Array.from(
            (time || '').matchAll(TIME_REGEX) || [[]]
        )[0];
        if (!matches) return undefined;

        const c = matches.length;
        const hourStr = (c > 1 && matches[1]) || '';
        hours = c > 1 ? parseInt(hourStr || '0') : 0;
        mins = c > 2 ? parseInt(matches[2] || '0') : 0;
        meridiem = ((c > 3 && matches[3]) || '').toLowerCase();
        // Handle format HHmm, which is stored in hours matches.
        if (hourStr.length === 4) {
            if (mins !== 0) return undefined;
            if (meridiem.length !== 0) return undefined;

            hours = parseInt(hourStr.substring(0, 2));
            mins = parseInt(hourStr.substring(2, 4));
        }
    }

    if (mins >= 60) return undefined;

    if (meridiem.startsWith('p')) {
        if (hours === 0 && mins === 0) {
            return undefined;
        } else if (hours > 12) {
            return undefined;
        } else if (hours < 12) {
            hours += 12;
        }
    } else if (meridiem.startsWith('a')) {
        if (hours > 12) {
            return undefined;
        } else if (hours === 12) {
            hours = 0;
        }
    }

    const totalMs = (hours * 60 + mins) * 60e3;
    if (meridiem.length !== 0 && totalMs >= kMsInDay) {
        return undefined;
    }
    if (
        options &&
        typeof options.max !== 'undefined' &&
        totalMs >= options.max
    ) {
        return undefined;
    }
    return {
        hours,
        minutes: mins,
        totalMs,
        valueOf() {
            return totalMs;
        },
    };
}

module.exports.parseTime = parseTime;
module.exports.timeParse = parseTime;

function parseTimeOfDay(time) {
    return parseTime(time, kTimeOfDayOptions);
}

module.exports.parseTimeOfDay = parseTimeOfDay;
