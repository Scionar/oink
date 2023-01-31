import {
  Article,
  Autocomplete,
  Button,
  DateInput,
  Input,
  Snout,
  SpacerForm,
} from "ui";
import "ui/normalize.css";
import "ui/global.css";
import useSWR from "swr";
import { ChangeEvent, useState } from "react";

const options = [
  { name: "Chicken McNugget", calories: 48, id: "mcnugget" },
  { name: "French Fries", calories: 222, id: "frenchfries" },
  { name: "Whopper", calories: 672, id: "whopper" },
  { name: "Hawaiian Pizza", calories: 154, id: "hawaiian-pizza" },
] as any;

export default function Web() {
  const { data, error, isLoading } = useSWR(`http://localhost:3001/foods`);
  const [addInputNameValue, setAddInputNameValue] = useState<string>("");
  const [addInputCaloriesValue, setAddInputCaloriesValue] =
    useState<string>("");
  const [date, setDate] = useState<string>("");

  if (isLoading) return <div>Loading...</div>;
  if (!data || error) return <div>Failed</div>;

  const nameOnChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setAddInputNameValue(event.currentTarget.value);
  };

  const caloriesOnChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setAddInputCaloriesValue(event.currentTarget.value);
  };

  const dateOnChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setDate(event.currentTarget.value);
  };

  return (
    <Article>
      <SpacerForm>
        <Snout style={{ alignSelf: "center" }} />

        <Autocomplete label="Search" optionList={options} />

        <Input
          label="Name"
          value={addInputNameValue}
          onChange={nameOnChangeHandler}
        />

        <Input
          label="Calories"
          value={addInputCaloriesValue}
          onChange={caloriesOnChangeHandler}
        />

        <DateInput label="Date" value={date} onChange={dateOnChangeHandler} />

        <Button>Submit</Button>
      </SpacerForm>

      <h1>Foods</h1>
      <ul>
        {data.map((item: any) => (
          <li key={item.name}>
            {item.name} / {item.calories}
          </li>
        ))}
      </ul>
    </Article>
  );
}
