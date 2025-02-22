const { heatmap, getStreak } = require('./index');

test('getStreak handles day zero', () => {
    const today = '2025-01-05'
    const start = '2025-01-01'
    const dates = ['2025-01-05']
    const actual = getStreak(dates, today, start)
    const expected = 0
    expect(actual).toEqual(expected)
})

test('getStreak gets days since last failure', () => {
    const today = '2025-01-05'
    const start = '2025-01-01'
    const dates = ['2025-01-02']
    const actual = getStreak(dates, today, start)
    const expected = 2
    expect(actual).toEqual(expected)
})

test('getStreak handles no logs yet', () => {
    const today = '2025-01-05'
    const start = '2025-01-01'
    const dates = []
    const actual = getStreak(dates, today, start)
    const expected = 3
    expect(actual).toEqual(expected)
})

test('heatmap handles success days before first fail day', () => {
    const dates = ['2025-01-19']
    const today = '2025-01-20'
    const start = '2025-01-16'
    const result = heatmap(dates, today, start)
    const january = {
        year: 2025,
        month: 'Jan',
        days: [
            [null, false, false, false, false],  // Sundays
            [null, false, false, false, false],  // Mondays
            [null, false, false, false, false],  // Tuesdays
            [false, false, false, false, false],  // Wednesdays
            [false, false, false, false, false], // Thursdays
            [false, false, true, false, false], // Fridays 
            [false, false, true, false, null],  // Saturdays 
        ]
    }
    expect(result.length).toEqual(12)
    expect(result[0]).toEqual(january)
})

test('heatmap handles no logs yet', () => {
    const dates = []
    const result = heatmap(dates, '2025-01-05', '2025-01-02')
    const january = {
        year: 2025,
        month: 'Jan',
        days: [
            [null, false, false, false, false],  // Sundays
            [null, false, false, false, false],  // Mondays
            [null, false, false, false, false],  // Tuesdays
            [false, false, false, false, false],  // Wednesdays
            [false, false, false, false, false], // Thursdays
            [true, false, false, false, false], // Fridays 
            [true, false, false, false, null],  // Saturdays 
        ]
    }
    expect(result.length).toEqual(12)
    expect(result[0]).toEqual(january)
})

test('heatmap handles empty dates', () => {
    const dates = []
    const result = heatmap(dates, '2025-01-01')
    const january = {
        year: 2025,
        month: 'Jan',
        days: [
            [null, false, false, false, false],  // Sundays
            [null, false, false, false, false],  // Mondays
            [null, false, false, false, false],  // Tuesdays
            [false, false, false, false, false],  // Wednesdays
            [false, false, false, false, false], // Thursdays
            [false, false, false, false, false], // Fridays 
            [false, false, false, false, null],  // Saturdays 
        ]
    }
    expect(result.length).toEqual(12)
    expect(result[0]).toEqual(january)
})

test('heatmap logs days', () => {
    const dates = ['2024-12-29', '2024-12-31',]
    const result = heatmap(dates, '2025-01-01')
    const december = {
        year: 2024,
        month: 'Dec',
        days: [
            [false, false, false, false, false], // Sundays
            [false, false, false, false, true], // Mondays
            [false, false, false, false, false],  // Tuesdays
            [false, false, false, false, null],  // Wednesdays
            [false, false, false, false, null],  // Thursdays
            [false, false, false, false, null],  // Fridays
            [false, false, false, false, null],  // Saturdays
        ]
    }
    const january = {
        year: 2025,
        month: 'Jan',
        days: [
            [null, false, false, false, false],  // Sundays
            [null, false, false, false, false],  // Mondays
            [null, false, false, false, false],  // Tuesdays
            [false, false, false, false, false],  // Wednesdays
            [false, false, false, false, false], // Thursdays
            [false, false, false, false, false], // Fridays 
            [false, false, false, false, null],  // Saturdays 
        ]
    }
    expect(result.length).toEqual(12)
    expect(result[0]).toEqual(december)
    expect(result[1]).toEqual(january)
})

test('heatmap handles months starting in the middle of the week', () => {
    const dates = [
        '2025-01-31',
    ]
    const expected = {
        year: 2025,
        month: 'Jan',
        days: [
            [null, false, false, false, false],  // Sundays
            [null, false, false, false, false],  // Mondays
            [null, false, false, false, false],  // Tuesdays
            [false, false, false, false, false],  // Wednesdays
            [false, false, false, false, false], // Thursdays
            [false, false, false, false, false], // Fridays 
            [false, false, false, false, null],  // Saturdays 
        ]
    }
    const result = heatmap(dates, '2025-01-01');
    expect(result[0]).toEqual(expected);
});

test('handles habits less than a year old', () => {
    const dates = [
        '2024-12-24',
    ]
    const result = heatmap(dates, '2025-01-01');
    expect(result.length).toEqual(12);
});

test('handles habits more than a year old', () => {
    const dates = [
        '2024-12-24',
        '2026-01-01'
    ]
    const result = heatmap(dates, '2025-01-01');
    expect(result.length).toEqual(13);
});

