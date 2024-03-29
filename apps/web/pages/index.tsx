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
} from 'ui';
import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { formatDayData } from '../helpers/formatDayData';
import { useAuth0 } from '@auth0/auth0-react';
import {
  useAddConsumptionMutation,
  useDeleteConsumptionMutation,
  useGetAllConsumptionsQuery,
  useGetAllFoodsQuery,
} from '../redux/services/consumption';
import { useAppDispatch, useAppSelector } from '../hooks';
import { setToken } from '../redux/features/user/userSlice';

export type AutocompleteOption = {
  name: string;
  calories: string;
  id: string;
};

export default function Web() {
  const [addInputCaloriesValue, setAddInputCaloriesValue] =
    useState<string>('');
  const [date, setDate] = useState<string>('');
  const [showGraphModal, setShowGraphModal] = useState<boolean>(false);
  const token = useAppSelector((state) => state.user.token);

  const dispatch = useAppDispatch();
  const router = useRouter();

  const {
    isLoading: authenticationIsLoading,
    isAuthenticated,
    error: authenticationError,
    user: authenticationUser,
    loginWithRedirect,
    logout,
    getAccessTokenSilently,
  } = useAuth0();

  // Redirect to /login if user is not authenticated
  useEffect(() => {
    if (!authenticationIsLoading && !isAuthenticated) {
      // Make sure we're in the browser
      if (typeof window !== 'undefined') {
        router.push('/login');
      }
    }
  }, [authenticationIsLoading, isAuthenticated, router]);

  // Handle state for token
  useEffect(() => {
    const fetchToken = async () => {
      const fetchedToken = await getAccessTokenSilently();

      dispatch(setToken(fetchedToken));
    };

    if (!authenticationIsLoading) {
      if (isAuthenticated) {
        fetchToken();
      } else {
        dispatch(setToken(null));
      }
    }
  }, [
    isAuthenticated,
    getAccessTokenSilently,
    dispatch,
    authenticationIsLoading,
  ]);

  const {
    data: dataFoods,
    error: errorFoods,
    isLoading: isLoadingFoods,
  } = useGetAllFoodsQuery('');

  const {
    data: dataConsumptions,
    error: errorConsumptions,
    isLoading: isLoadingConsumptions,
  } = useGetAllConsumptionsQuery('', {
    skip: !token,
  });

  const [addConsumption, { isLoading: isAddConsumptionUpdating }] =
    useAddConsumptionMutation({
      fixedCacheKey: 'mutate',
    });

  const [deleteConsumption, { isLoading: isDeleteConsumptionUpdating }] =
    useDeleteConsumptionMutation({
      fixedCacheKey: 'mutate',
    });

  const caloriesOnChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setAddInputCaloriesValue(event.currentTarget.value);
  };

  const dateOnChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setDate(event.currentTarget.value);
  };

  const autocompleteChangeHandler = (
    option: AutocompleteOption | null | undefined,
  ) => {
    !!option && setAddInputCaloriesValue(option?.calories);
  };

  const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await addConsumption({
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
    return logout();
  };

  const autocompleteOptionList = useMemo(() => {
    if (!dataFoods) return [];

    return dataFoods.map((item: any) => ({
      name: item.name,
      calories: item.calories,
      id: item.id,
    }));
  }, [dataFoods]);

  const tableColumns = useMemo(() => {
    return [
      { header: 'Name', accessorKey: 'name' },
      { header: 'Calories', accessorKey: 'calories' },
      {
        accessorKey: ' ',
        accessorFn: (row: any) => row.id,
        cell: (props: any) => (
          <div style={{ textAlign: 'right' }}>
            <Button
              disabled={isDeleteConsumptionUpdating}
              onClick={async () => {
                await deleteConsumption({ id: props.getValue() });
              }}
            >
              <IconTrash size={15} />
            </Button>
          </div>
        ),
      },
    ];
  }, [deleteConsumption, isDeleteConsumptionUpdating]);

  const dateList = useMemo(
    () => formatDayData(dataConsumptions),
    [dataConsumptions],
  );

  const chartData = dateList.map((day) => ({
    name: day.date,
    calories: day.calSummary,
  }));

  if (isLoadingFoods || isLoadingConsumptions) return <div>Loading...</div>;
  if (!dataFoods || errorFoods || errorConsumptions) {
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
          display: 'flex',
          justifyContent: 'flex-end',
          padding: '0 1rem',
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
              <Snout style={{ alignSelf: 'center' }} />

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

              <Button
                variant="creative"
                type="submit"
                disabled={isAddConsumptionUpdating || !token}
              >
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
