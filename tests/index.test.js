const { parseTime, parseTimeOfDay } = require('..');

function parseTotalMins(x) {
    return (parseTime(x) || 0) / 60000;
}

describe('timeParse', () => {
    describe('parseTime', () => {
        it('should parse 24-hour and minute time with colon', () => {
            expect(parseTime('00:00')).toMatchObject({
                hours: 0,
                minutes: 0,
                totalMs: 0,
            });
            expect(parseTime('00:00') == 0).toBeTruthy();
            expect(parseTime('01:23')).toMatchObject({
                hours: 1,
                minutes: 23,
                totalMs: (1 * 60 + 23) * 60e3,
            });
            expect(parseTime('01:23') == (1 * 60 + 23) * 60e3).toBeTruthy();
            expect(parseTime('12:01')).toMatchObject({
                hours: 12,
                minutes: 1,
                totalMs: (12 * 60 + 1) * 60e3,
            });
            expect(parseTime('18:01')).toMatchObject({
                hours: 18,
                minutes: 1,
                totalMs: (18 * 60 + 1) * 60e3,
            });
            expect(parseTime('24:00')).toMatchObject({
                hours: 24,
                minutes: 0,
                totalMs: 86400e3,
            });
            expect(parseTime('01:63')).toBeFalsy();
        });

        it('should parse 24-hour and minute time with dot', () => {
            expect(parseTotalMins('00.00')).toBe(0);
            expect(parseTotalMins('01.23')).toBe(83);
            expect(parseTotalMins('12.01')).toBe(721);
            expect(parseTotalMins('18.01')).toBe(1081);
            expect(parseTime('01.63')).toBeFalsy();
        });

        it('should parse 12-hour and minute time with colon', () => {
            expect(parseTotalMins('00:00 am')).toBe(0);
            expect(parseTotalMins('00:00 pm')).toBeFalsy();
            expect(parseTotalMins('01:23 am')).toBe(83);
            expect(parseTotalMins('01:01 pm')).toBe(781);
            expect(parseTotalMins('12:01 am')).toBe(1);
            expect(parseTotalMins('12:01 pm')).toBe(721);
            expect(parseTime('18:01 am')).toBeFalsy();
            expect(parseTime('18:01 pm')).toBeFalsy();
            expect(parseTime('24:00 am')).toBeFalsy();
            expect(parseTime('24:00 pm')).toBeFalsy();

            expect(parseTime('01:63 am')).toBeFalsy();
            expect(parseTotalMins('01:23 AM')).toBe(83);
            expect(parseTotalMins('01:23am')).toBe(83);
            expect(parseTotalMins('01:23AM')).toBe(83);
            expect(parseTotalMins('01:23a')).toBe(83);
            expect(parseTotalMins('01:23A')).toBe(83);
            expect(parseTotalMins('01:23P')).toBe(803);
            expect(parseTime('01:23 amz')).toBeFalsy();
        });

        it('should parse hour numbers', () => {
            expect(parseTotalMins('0')).toBe(0);
            expect(parseTotalMins('1')).toBe(60);
            expect(parseTotalMins('12')).toBe(720);
            expect(parseTotalMins('18')).toBe(1080);
            expect(parseTime('24')).toBeFalsy();
            expect(parseTime('34')).toBeFalsy();
        });

        it('should parse hour and minute numbers', () => {
            expect(parseTotalMins('000')).toBe(0);
            expect(parseTotalMins('023')).toBe(23);
            expect(parseTotalMins('123')).toBe(83);
            expect(parseTotalMins('930')).toBe(570);
            expect(parseTotalMins('1201')).toBe(721);
            expect(parseTotalMins('1801')).toBe(1081);
            expect(parseTime('1263')).toBeFalsy();
            expect(parseTotalMins('2501')).toBe(1501);
        });

        it('should trim text', () => {
            expect(parseTotalMins('  ')).toBe(0);
            expect(parseTotalMins(' 023 ')).toBe(23);
        });

        it('should not parse text', () => {
            expect(parseTime('abc')).toBeFalsy();
        });

        it('should limit when max is supplied', () => {
            expect(parseTime('00:59', { max: 60 * 60e3 })).toMatchObject({
                hours: 0,
                minutes: 59,
            });
            expect(parseTime('01:00', { max: 60 * 60e3 })).toBeFalsy();
            expect(parseTime('01:01', { max: 60 * 60e3 })).toBeFalsy();
        });
    });

    describe('parseTimeOfDay', () => {
        it('should not accept 24 hours and above', () => {
            expect(parseTimeOfDay('24:00')).toBeFalsy();
            expect(parseTimeOfDay('124:00')).toBeFalsy();
        });
    });
});
