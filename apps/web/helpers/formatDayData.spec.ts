import { formatDayData } from './formatDayData';
import { ConsumptionsResponseType } from '../types';

describe('formatDayData', () => {
  it('returns empty array if no input given', () => {
    expect(formatDayData(undefined)).toStrictEqual([]);
    expect(formatDayData([])).toStrictEqual([]);
  });

  it('forms data for one day when one food given', () => {
    const input: ConsumptionsResponseType = [
      {
        id: 1,
        foodId: 1,
        createdAt: '2023-02-04T20:32:12.634Z',
        food: {
          id: 1,
          calories: 370,
          name: 'Muffin',
          createdAt: '2023-02-04T20:32:12.634Z',
        },
        userId: 1,
      },
    ];

    expect(formatDayData(input)).toStrictEqual([
      {
        date: '04.02.2023',
        calSummary: 370,
        consumptions: [
          {
            id: 1,
            calories: 370,
            name: 'Muffin',
          },
        ],
      },
    ]);
  });

  it('groups foods from same day', () => {
    const input: ConsumptionsResponseType = [
      {
        id: 1,
        foodId: 1,
        createdAt: '2023-02-04T20:32:12.634Z',
        food: {
          id: 1,
          calories: 370,
          name: 'Muffin',
          createdAt: '2023-02-04T20:32:12.634Z',
        },
        userId: 1,
      },
      {
        id: 2,
        foodId: 2,
        createdAt: '2023-02-04T18:32:12.634Z',
        food: {
          id: 2,
          calories: 290,
          name: 'Waffle',
          createdAt: '2023-02-04T18:32:12.634Z',
        },
        userId: 1,
      },
    ];

    expect(formatDayData(input)).toStrictEqual([
      {
        date: '04.02.2023',
        calSummary: 660,
        consumptions: [
          {
            id: 1,
            calories: 370,
            name: 'Muffin',
          },
          {
            id: 2,
            calories: 290,
            name: 'Waffle',
          },
        ],
      },
    ]);
  });

  it('groups foods for different days days and order days desc', () => {
    const input: ConsumptionsResponseType = [
      {
        id: 1,
        foodId: 1,
        createdAt: '2023-02-04T20:32:12.634Z',
        food: {
          id: 1,
          calories: 370,
          name: 'Muffin',
          createdAt: '2023-02-04T20:32:12.634Z',
        },
        userId: 1,
      },
      {
        id: 2,
        foodId: 2,
        createdAt: '2023-02-05T18:32:12.634Z',
        food: {
          id: 2,
          calories: 290,
          name: 'Waffle',
          createdAt: '2023-02-05T18:32:12.634Z',
        },
        userId: 1,
      },
    ];

    expect(formatDayData(input)).toStrictEqual([
      {
        date: '05.02.2023',
        calSummary: 290,
        consumptions: [
          {
            id: 2,
            calories: 290,
            name: 'Waffle',
          },
        ],
      },
      {
        date: '04.02.2023',
        calSummary: 370,
        consumptions: [
          {
            id: 1,
            calories: 370,
            name: 'Muffin',
          },
        ],
      },
    ]);
  });
});
