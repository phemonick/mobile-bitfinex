import {
    BaseQueryFn,
    createApi,
    fetchBaseQuery,
    FetchArgs,
    FetchBaseQueryError,
  } from "@reduxjs/toolkit/query/react";
  
  const baseQuery = fetchBaseQuery({
    baseUrl: "https://api-pub.bitfinex.com/v2/", // Retrieve the base URL from environment variables
  });
  
  const baseQueryWithInterceptor: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
  > = async (args, api, extraOptions) => {
    try {
      const result = await baseQuery(args, api, extraOptions);
  
      if (result.error && result.error.status === 401) {
        console.log(result.error)
      }
  
      return result;
    } catch (error) {
      console.error("Sorry, there is an error", error);
      throw error;
    }
  };
  
  // expose base api
  export const api = createApi({
    baseQuery: baseQueryWithInterceptor,
    endpoints: () => ({}),
  });
  