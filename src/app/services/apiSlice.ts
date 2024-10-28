import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IProduct } from '../../interfaces';

export const apiSlice = createApi({
  reducerPath: 'api',
  tagTypes: ['Products'],
  baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_STRAPI_SERVER_URL}` }),
  endpoints: (builder) => ({
    getDashboardProducts: builder.query<IProduct[], { page: number }>(
      {
        query: ({ page = 1 }) => {
          return {
            url: `/api/products?populate=category,thumbnail&pagination[page]=${page}&pagination[pageSize]=7`
          }
        }
      }
    ),
  })
})
export const { useGetDashboardProductsQuery } = apiSlice;