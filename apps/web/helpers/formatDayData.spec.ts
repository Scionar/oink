import { Food } from "database";
import { formatDayData } from "./formatDayData";
import { RecursivelyConvertDatesToStrings } from "./RecursivelyConvertDatesToStrings";

describe("formatDayData", () => {
  it("returns empty array if no input given", () => {
    expect(formatDayData(undefined)).toStrictEqual([]);
    expect(formatDayData([])).toStrictEqual([]);
  });

  it("forms data for one day when one food given", () => {
    const input: RecursivelyConvertDatesToStrings<Food[]> = [
      {
        id: 1,
        calories: 370,
        createdAt: "2023-02-04T20:32:12.634Z",
        name: "Muffin",
      },
    ];

    expect(formatDayData(input)).toStrictEqual([
      {
        date: "04.02.2023",
        calSummary: 370,
        consumptions: [
          {
            id: 1,
            calories: 370,
            name: "Muffin",
          },
        ],
      },
    ]);
  });

  it("groups foods from same day", () => {
    const input: RecursivelyConvertDatesToStrings<Food[]> = [
      {
        id: 1,
        calories: 370,
        createdAt: "2023-02-04T20:32:12.634Z",
        name: "Muffin",
      },
      {
        id: 2,
        calories: 290,
        createdAt: "2023-02-04T18:32:12.634Z",
        name: "Waffle",
      },
    ];

    expect(formatDayData(input)).toStrictEqual([
      {
        date: "04.02.2023",
        calSummary: 660,
        consumptions: [
          {
            id: 1,
            calories: 370,
            name: "Muffin",
          },
          {
            id: 2,
            calories: 290,
            name: "Waffle",
          },
        ],
      },
    ]);
  });

  it("groups foods for different days days and order days desc", () => {
    const input: RecursivelyConvertDatesToStrings<Food[]> = [
      {
        id: 1,
        calories: 370,
        createdAt: "2023-02-04T20:32:12.634Z",
        name: "Muffin",
      },
      {
        id: 2,
        calories: 290,
        createdAt: "2023-02-05T18:32:12.634Z",
        name: "Waffle",
      },
    ];

    expect(formatDayData(input)).toStrictEqual([
      {
        date: "05.02.2023",
        calSummary: 290,
        consumptions: [
          {
            id: 2,
            calories: 290,
            name: "Waffle",
          },
        ],
      },
      {
        date: "04.02.2023",
        calSummary: 370,
        consumptions: [
          {
            id: 1,
            calories: 370,
            name: "Muffin",
          },
        ],
      },
    ]);
  });
});
