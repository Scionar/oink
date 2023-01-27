import { Button } from "ui";
import useSWR from "swr";

export default function Web() {
  const { data, error, isLoading } = useSWR(`http://localhost:3001/foods`);

  if (isLoading) return <div>Loading...</div>;
  if (!data || error) return <div>Failed</div>;

  return (
    <div>
      <h1>Foods</h1>
      <ul>
        {data.map((item: any) => (
          <li key={item.name}>
            {item.name} / {item.calories}
          </li>
        ))}
      </ul>
    </div>
  );
}
