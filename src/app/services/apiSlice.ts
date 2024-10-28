import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IProduct } from '../../interfaces';

export const apiSlice = createApi({
  reducerPath: 'api',
  tagTypes: ['Products'],
  refetchOnReconnect: true, // refetch data when you are offline and be online
  refetchOnMountOrArgChange: true,
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
    deleteDashboardProduct: builder.mutation<void, { productId: number }>(
      {
        query: ({ productId }) => ({
          url: `/api/products/${productId}`,
          method: "DELETE"
        }),

      }
    )
  })
})
export const { useGetDashboardProductsQuery, useDeleteDashboardProductMutation } = apiSlice;