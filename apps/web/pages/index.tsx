import {
  Accordion,
  Article,
  Autocomplete,
  Button,
  DateInput,
  Input,
  Snout,
  Spacer,
} from "ui";
import "ui/normalize.css";
import "ui/global.css";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { ChangeEvent, useMemo, useState } from "react";
import { swrPostFetcher } from "../helpers";

const options = [
  { name: "Chicken McNugget", calories: 48, id: "mcnugget" },
  { name: "French Fries", calories: 222, id: "frenchfries" },
  { name: "Whopper", calories: 672, id: "whopper" },
  { name: "Hawaiian Pizza", calories: 154, id: "hawaiian-pizza" },
] as any;

export default function Web() {
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/foods`
  );
  const { trigger, isMutating } = useSWRMutation(
    `${process.env.NEXT_PUBLIC_API_URL}/consumption`,
    swrPostFetcher
  );
  const [addInputNameValue, setAddInputNameValue] = useState<string>("");
  const [addInputCaloriesValue, setAddInputCaloriesValue] =
    useState<string>("");
  const [date, setDate] = useState<string>("");

  const nameOnChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setAddInputNameValue(event.currentTarget.value);
  };

  const caloriesOnChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setAddInputCaloriesValue(event.currentTarget.value);
  };

  const dateOnChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setDate(event.currentTarget.value);
  };

  const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(event.currentTarget.foodName.value, "name");
    console.log(event.currentTarget.calories.value, "calories");

    await trigger({
      foodName: event.currentTarget.foodName.value,
      calories: Number.parseInt(event.currentTarget.calories.value),
      userId: 1,
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

  if (isLoading) return <div>Loading...</div>;
  if (!data || error) return <div>Failed</div>;

  return (
    <Article>
      <Spacer>
        <form onSubmit={onSubmitHandler}>
          <Spacer variant="form">
            <Snout style={{ alignSelf: "center" }} />

            <Autocomplete label="Search" optionList={autocompleteOptionList} />

            <Input
              label="Name"
              value={addInputNameValue}
              name="foodName"
              required
              onChange={nameOnChangeHandler}
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
          <Accordion summary="1.2.2022 - 942kcal">
            <ul>
              <li>Chicken McNugget</li>
              <li>French Fries</li>
              <li>Whopper</li>
            </ul>
          </Accordion>
          <Accordion summary="2.2.2022 - 942kcal">
            <ul>
              <li>Chicken McNugget</li>
              <li>French Fries</li>
              <li>Whopper</li>
            </ul>
          </Accordion>
        </div>

        <div>
          <h2>Foods in database</h2>
          <ul>
            {data.map((item: any) => (
              <li key={item.name}>
                {item.name} / {item.calories}
              </li>
            ))}
          </ul>
        </div>
      </Spacer>
    </Article>
  );
}
