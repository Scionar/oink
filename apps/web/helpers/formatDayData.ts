import { Food } from "database";
import { compareDesc, format, parse, parseISO } from "date-fns";
import { RecursivelyConvertDatesToStrings } from "./RecursivelyConvertDatesToStrings";

export const formatDayData = (
  foods?: RecursivelyConvertDatesToStrings<Food[]>
) => {
  if (!foods || !foods.length) return [];

  const groupedData = foods.reduce(
    (
      groups: {
        [n: string]: { date: string; calSummary: number; consumptions: any };
      },
      consumption
    ) => {
      const dateFormat = format(
        parseISO(consumption.createdAt as unknown as string),
        "dd.MM.yyyy"
      );
      if (!groups[dateFormat]) {
        groups[dateFormat] = {
          date: dateFormat,
          calSummary: 0,
          consumptions: [],
        };
      }
      groups[dateFormat].consumptions.push({
        id: consumption.id,
        calories: consumption.calories,
        name: consumption.name,
      });
      return groups;
    },
    {}
  );

  const toArray = Object.values(groupedData);

  const calcCalSummaries = toArray.map((day) => ({
    ...day,
    calSummary: day.consumptions.reduce(
      (sum: number, consumption: any) => sum + consumption.calories,
      0
    ),
  }));

  const sortedData = calcCalSummaries.sort((a, b) =>
    compareDesc(
      parse(a.date, "dd.MM.yyyy", new Date()),
      parse(b.date, "dd.MM.yyyy", new Date())
    )
  );

  return sortedData;
};
