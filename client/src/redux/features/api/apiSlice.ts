import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./baseQuery";
import { Product, Category, CartItem } from "@/types";

interface CartCountResponse {
  count?: number;
  quantity: number;
}

export const api = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery({ baseUrl: "http://localhost:5000/api/v1" }),
  tagTypes: ["Product", "Categories", "Cart", "Order"],
  endpoints: (builder) => ({
    // POST /auth/login
    login: builder.mutation<any, { email: string; password: string }>({
      query: (body) => ({
        url: "/auth/login",
        method: "post",
        data: body,
      }),
      invalidatesTags: ["Product", "Categories", "Cart", "Order"],
    }),

    // GET /products
    getProducts: builder.query<Product, void>({
      query: () => ({ url: "/product", method: "get" }),
      providesTags: ["Product"],
    }),

    // GET /products/:id
    getProduct: builder.query<Product, string>({
      query: (id) => ({ url: `/product/${id}`, method: "get" }),
      providesTags: (result, error, id) => [{ type: "Product", id }],
    }),

    // POST /products
    addProduct: builder.mutation<Product, Partial<Product>>({
      query: (body) => ({
        url: "/products",
        method: "post",
        data: body,
      }),
      invalidatesTags: ["Product"],
    }),

    // GET /categories
    getCategories: builder.query<Category[], void>({
      query: () => ({ url: "/categories", method: "get" }),
      providesTags: ["Categories"],
    }),

    // GET /category/:id
    getCategoryById: builder.query<Category[], void>({
      query: (id) => ({ url: `/categories/${id}`, method: "get" }),
      providesTags: ["Categories"],
    }),

    // GET /cart/count
    getCartCount: builder.query<CartCountResponse, void>({
      query: () => ({ url: "/cart/count", method: "get" }),
      providesTags: ["Cart"],
    }),

    // POST /cart
    addItemToCart: builder.mutation<Product, Partial<Product>>({
      query: (body) => ({
        url: "/cart",
        method: "post",
        data: body,
      }),
      invalidatesTags: ["Cart"],
    }),

    // GET /cart
    getCart: builder.query<CartItem, string>({
      query: () => ({ url: "/cart", method: "get" }),
      providesTags: ["Cart"],
    }),

    // DELETE /cart/:id
    deleteCartItem: builder.mutation<void, string>({
      query: (id) => ({
        url: `/cart/${id}`,
        method: "delete",
      }),
      invalidatesTags: ["Cart"],
    }),

    // UPDATE /cart/:id
    updateCartItem: builder.mutation<void, UpdateCartItemPayload>({
      query: ({ id, quantity }) => ({
        url: `/cart/${id}`,
        method: "put",
        data: { quantity },
      }),
      invalidatesTags: ["Cart"],
    }),
  }),
});

// Export auto‑generated hooks for use in components:
export const {
  // Auth
  useLoginMutation,
  // Produucts
  useGetProductsQuery,
  useGetProductQuery,
  useAddProductMutation,
  useGetCategoriesQuery,
  useGetCategoryByIdQuery,

  // Cart
  useGetCartCountQuery,
  useAddItemToCartMutation,
  useGetCartQuery,
  useDeleteCartItemMutation,
  useUpdateCartItemMutation,
} = api;
