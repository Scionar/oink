import { Article, Autocomplete, Button, Header, Snout } from "ui";
import "ui/normalize.css";
import "ui/global.css";
import useSWR from "swr";

const options = [
  { name: "Chicken McNugget", calories: 48, id: "mcnugget" },
  { name: "French Fries", calories: 222, id: "frenchfries" },
  { name: "Whopper", calories: 672, id: "whopper" },
  { name: "Hawaiian Pizza", calories: 154, id: "hawaiian-pizza" },
] as any;

const onAddHandler = (value: string) => {
  console.log(value, "value");
};

export default function Web() {
  const { data, error, isLoading } = useSWR(`http://localhost:3001/foods`);

  if (isLoading) return <div>Loading...</div>;
  if (!data || error) return <div>Failed</div>;

  return (
    <div>
      <Header></Header>

      <Article>
        <>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Snout />
            <Autocomplete
              label="Add food"
              optionList={options}
              onAdd={onAddHandler}
            />
          </div>

          <h1>Foods</h1>
          <ul>
            {data.map((item: any) => (
              <li key={item.name}>
                {item.name} / {item.calories}
              </li>
            ))}
          </ul>
        </>
      </Article>
    </div>
  );
}
