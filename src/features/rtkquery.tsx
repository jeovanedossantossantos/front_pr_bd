
import { BaseQueryFn, createApi } from "@reduxjs/toolkit/query/react";
import axios, { AxiosError, AxiosRequestConfig } from "axios";




interface AxiosQueryArgs {
    url: string;
    method?: AxiosRequestConfig["method"];
    data?: AxiosRequestConfig["data"];
    params?: AxiosRequestConfig["params"];
    successMessage?: string;
    errorMessage?: string;
}

interface AxiosBaseQueryProps {
    baseURL: string;
}

const axiosBaseQuery =
    (
        { baseURL }: AxiosBaseQueryProps = { baseURL: "" }
    ): BaseQueryFn<AxiosQueryArgs, unknown, unknown> =>
        async (
            { url, method = "get", data, params },
            api
        ) => {
            // const token = await localStorage.getItem("accessToken");
            const headers: Record<string, string> = {
                "Content-Type": "application/json",
            };
            // if (token) {
            //     headers["token"] = `${token}`;
            // }


            const axiosClient = axios.create({
                baseURL,
                headers,
            });

            axiosClient.defaults.withCredentials = false;

            try {
                const result = await axiosClient({ url, method, data, params });

                return { data: result.data };
            } catch (axiosError) {
                const err = axiosError as AxiosError;

                // if (err?.response?.statusText === "Unauthorized") {
                //     localStorage.removeItem("accessToken");

                // }
                return {
                    error: {
                        status: err.response?.status,
                        data: err.response?.data || err.message,
                    },
                };
            }
        };

export const baseQuery = axiosBaseQuery({
    baseURL: "",
});

export const rtkApi = createApi({
    baseQuery: baseQuery,
    reducerPath: "rtkquery",
    endpoints: () => ({}),
});