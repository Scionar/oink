import {
  Accordion,
  Article,
  Autocomplete,
  Backdrop,
  Button,
  Chart,
  DateInput,
  IconTrash,
  Input,
  Modal,
  Snout,
  Spacer,
  Table,
  UserMenu,
} from "ui";
import "ui/normalize.css";
import "ui/global.css";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { ChangeEvent, useMemo, useState } from "react";
import { swrDeleteFetcher, swrGetFetcher, swrPostFetcher } from "../helpers";
import { Food } from "database";
import { formatDayData } from "../helpers/formatDayData";
import { RecursivelyConvertDatesToStrings } from "../helpers/RecursivelyConvertDatesToStrings";
import { ConsumptionsResponseType } from "../types";
import { useAuth0 } from "@auth0/auth0-react";
import { useToken } from "../providers/TokenProvider";

export type AutocompleteOption = {
  name: string;
  calories: string;
  id: string;
};

export default function Web() {
  const [addInputCaloriesValue, setAddInputCaloriesValue] =
    useState<string>("");
  const [date, setDate] = useState<string>("");
  const [showGraphModal, setShowGraphModal] = useState<boolean>(false);
  const token = useToken();

  const {
    isLoading: authenticationIsLoading,
    isAuthenticated,
    error: authenticationError,
    user: authenticationUser,
    loginWithRedirect,
    logout,
  } = useAuth0();

  const { data, error, isLoading, mutate } = useSWR<
    RecursivelyConvertDatesToStrings<Food[]>
  >(
    `${process.env.NEXT_PUBLIC_API_URL}/foods`,
    swrGetFetcher(token ? token : undefined)
  );

  const {
    data: dataConsumptions,
    error: errorConsumptions,
    isLoading: isLoadingConsumptions,
    mutate: mutateConsumptions,
  } = useSWR<ConsumptionsResponseType>(
    `${process.env.NEXT_PUBLIC_API_URL}/consumption`,
    swrGetFetcher(token ? token : undefined)
  );

  const { trigger, isMutating } = useSWRMutation(
    `${process.env.NEXT_PUBLIC_API_URL}/consumption`,
    swrPostFetcher,
    {
      onSuccess: () => {
        mutate();
        mutateConsumptions();
      },
    }
  );

  const {
    trigger: triggerDeleteConsumption,
    isMutating: isMutatingDeleteConsumption,
  } = useSWRMutation(
    `${process.env.NEXT_PUBLIC_API_URL}/consumption`,
    swrDeleteFetcher,
    {
      onSuccess: () => {
        mutate();
        mutateConsumptions();
      },
    }
  );

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

  const showGraphClickHandler = () => {
    setShowGraphModal(!showGraphModal);
  };

  const closeModalHandler = () => {
    setShowGraphModal(false);
  };

  const loginOnClickHandler = () => {
    return loginWithRedirect();
  };

  const logoutOnClickHandler = () => {
    return logout({ returnTo: "http://localhost:3000" });
  };

  const autocompleteOptionList = useMemo(() => {
    if (!data) return [];

    return data.map((item: any) => ({
      name: item.name,
      calories: item.calories,
      id: item.id,
    }));
  }, [data]);

  const tableColumns = useMemo(() => {
    return [
      { header: "Name", accessorKey: "name" },
      { header: "Calories", accessorKey: "calories" },
      {
        accessorKey: " ",
        accessorFn: (row: any) => row.id,
        cell: (props: any) => (
          <div style={{ textAlign: "right" }}>
            <Button
              disabled={isMutatingDeleteConsumption}
              onClick={async () => {
                await triggerDeleteConsumption({ id: props.getValue() });
              }}
            >
              <IconTrash size={15} />
            </Button>
          </div>
        ),
      },
    ];
  }, [triggerDeleteConsumption, isMutatingDeleteConsumption]);

  const dateList = useMemo(
    () => formatDayData(dataConsumptions),
    [dataConsumptions]
  );

  const chartData = dateList.map((day) => ({
    name: day.date,
    calories: day.calSummary,
  }));

  if (isLoading || isLoadingConsumptions) return <div>Loading...</div>;
  if (!data || !dataConsumptions || error || errorConsumptions) {
    return <div>Failed</div>;
  }

  return (
    <>
      {showGraphModal && (
        <Backdrop>
          <Modal closeHandler={closeModalHandler}>
            <Chart data={chartData} />
          </Modal>
        </Backdrop>
      )}

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          padding: "0 1rem",
        }}
      >
        <UserMenu
          avatarUrl={authenticationUser?.picture}
          name={authenticationUser?.name}
          loginOnClick={loginOnClickHandler}
          logoutOnClick={logoutOnClickHandler}
        />
      </div>

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
            <Button onClick={showGraphClickHandler}>Show graph</Button>
          </div>

          <>
            {isAuthenticated && (
              <div>
                {dateList.map((day) => {
                  return (
                    <Accordion
                      summary={`${day.date} - ${day.calSummary} kcal`}
                      key={day.date}
                    >
                      <Table columns={tableColumns} data={day.consumptions} />
                    </Accordion>
                  );
                })}
              </div>
            )}
          </>
        </Spacer>
      </Article>
    </>
  );
}
