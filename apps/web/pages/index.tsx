import {
  Accordion,
  Article,
  Autocomplete,
  Button,
  DateInput,
  IconTrash,
  Input,
  Snout,
  Spacer,
  Table,
} from "ui";
import "ui/normalize.css";
import "ui/global.css";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { ChangeEvent, useMemo, useState } from "react";
import { swrPostFetcher } from "../helpers";
import { Food } from "database";
import { formatDayData } from "../helpers/formatDayData";
import { RecursivelyConvertDatesToStrings } from "../helpers/RecursivelyConvertDatesToStrings";

const options = [
  { name: "Chicken McNugget", calories: 48, id: "mcnugget" },
  { name: "French Fries", calories: 222, id: "frenchfries" },
  { name: "Whopper", calories: 672, id: "whopper" },
  { name: "Hawaiian Pizza", calories: 154, id: "hawaiian-pizza" },
] as any;

export type AutocompleteOption = {
  name: string;
  calories: string;
  id: string;
};

export default function Web() {
  const { data, error, isLoading, mutate } = useSWR<
    RecursivelyConvertDatesToStrings<Food[]>
  >(`${process.env.NEXT_PUBLIC_API_URL}/foods`);

  const { trigger, isMutating } = useSWRMutation(
    `${process.env.NEXT_PUBLIC_API_URL}/consumption`,
    swrPostFetcher,
    {
      onSuccess: () => {
        mutate();
      },
    }
  );
  const [addInputCaloriesValue, setAddInputCaloriesValue] =
    useState<string>("");
  const [date, setDate] = useState<string>("");

  const caloriesOnChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setAddInputCaloriesValue(event.currentTarget.value);
  };

  const dateOnChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setDate(event.currentTarget.value);
  };

  const autocompleteChangeHandler = (
    option: AutocompleteOption | null | undefined
  ) => {
    !!option && setAddInputCaloriesValue(option?.calories);
  };

  const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(event.currentTarget.foodName.value, "name");
    console.log(event.currentTarget.calories.value, "calories");
    console.log(event.currentTarget.date.value, "date");

    await trigger({
      foodName: event.currentTarget.foodName.value,
      calories: Number.parseInt(event.currentTarget.calories.value),
      userId: 1,
      date: event.currentTarget.date.value,
    });
  };

  const autocompleteOptionList = useMemo(() => {
    if (!data) return [];

    return data.map((item: any) => ({
      name: item.name,
      calories: item.calories,
      id: item.id,
    }));
  }, [data]);

  const dateList = useMemo(() => formatDayData(data), [data]);

  if (isLoading) return <div>Loading...</div>;
  if (!data || error) return <div>Failed</div>;

  return (
    <Article>
      <Spacer>
        <form onSubmit={onSubmitHandler}>
          <Spacer variant="form">
            <Snout style={{ alignSelf: "center" }} />

            <Autocomplete
              label="Name"
              name="foodName"
              optionList={autocompleteOptionList}
              required
              onSelectedItemChange={autocompleteChangeHandler}
            />

            <Input
              label="Calories"
              value={addInputCaloriesValue}
              name="calories"
              type="number"
              required
              onChange={caloriesOnChangeHandler}
            />

            <DateInput
              label="Date"
              value={date}
              name="date"
              onChange={dateOnChangeHandler}
            />

            <Button variant="positive" type="submit" disabled={isMutating}>
              Submit
            </Button>
          </Spacer>
        </form>

        <div>
          {dateList.map((day) => {
            const tableColumns = [
              { accessorKey: "Name" },
              { accessorKey: "Calories" },
              {
                accessorKey: " ",
                cell: (props: any) => (
                  <div style={{ textAlign: "right" }}>
                    <Button
                      onClick={() => {
                        console.log(props.row.id);
                      }}
                    >
                      <IconTrash size={15} />
                    </Button>
                  </div>
                ),
              },
            ];

            const tableData = [
              { Name: "Muffin", Calories: 100, id: 1 },
              { Name: "Muffin", Calories: 100, id: 1 },
            ];

            return (
              <Accordion
                summary={`${day.date} - ${day.calSummary} kcal`}
                key={day.date}
              >
                <Table columns={tableColumns} data={tableData} />
                <ul>
                  {day.consumptions.map((consumption: any) => (
                    <li key={consumption.id}>
                      {consumption.name} - {consumption.calories} kcal
                    </li>
                  ))}
                </ul>
              </Accordion>
            );
          })}
        </div>
      </Spacer>
    </Article>
  );
}
