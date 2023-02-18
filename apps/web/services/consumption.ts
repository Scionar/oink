import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Consumption } from "database";
import { RootState } from "../store";
import { ConsumptionsResponseType } from "../types";

export const consumptionApi = createApi({
  reducerPath: "consumptionApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).user.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllConsumptions: builder.query<ConsumptionsResponseType, string>({
      query: () => `consumption`,
      extraOptions: {},
    }),
  }),
});

export const { useGetAllConsumptionsQuery } = consumptionApi;
