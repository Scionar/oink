import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { ConsumptionsResponseType } from "../types";

export const consumptionApi = createApi({
  reducerPath: "consumptionApi",
  tagTypes: ["Consumption", "Food"],
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
      providesTags: ["Consumption", "Food"],
      query: () => `consumption`,
      extraOptions: {},
    }),
    addConsumption: builder.mutation({
      invalidatesTags: ["Consumption"],
      query: (body) => ({
        url: "consumption",
        method: "POST",
        body,
      }),
    }),
    deleteConsumption: builder.mutation({
      invalidatesTags: ["Consumption"],
      query: (body) => ({
        url: "consumption",
        method: "DELETE",
        body,
      }),
    }),
  }),
});

export const {
  useGetAllConsumptionsQuery,
  useAddConsumptionMutation,
  useDeleteConsumptionMutation,
} = consumptionApi;
