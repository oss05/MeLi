"use client";

import React, { createContext, useReducer, useContext, useEffect } from "react";
import { Product } from "../product/product.interface";

interface ProductState {
  products: Product[];
  product: Product | null;
  categories: string[];
  isInitialized: boolean;
}

interface ProductAction {
  type:
    | "SET_PRODUCTS"
    | "SET_PRODUCT"
    | "SET_CATEGORIES"
    | "ADD_PRODUCT"
    | "UPDATE_PRODUCT"
    | "DELETE_PRODUCT"
    | "INITIALIZE_PRODUCTS";
  payload?: any;
}

const productReducer = (
  state: ProductState,
  action: ProductAction
): ProductState => {
  switch (action.type) {
    case "SET_PRODUCTS":
      return { ...state, products: action.payload };
    case "SET_PRODUCT":
      return { ...state, product: action.payload };
    case "SET_CATEGORIES":
      return { ...state, categories: action.payload };
    case "ADD_PRODUCT":
      return { ...state, products: [...state.products, action.payload] };
    case "UPDATE_PRODUCT":
      return {
        ...state,
        products: state.products.map((product) =>
          product.id === action.payload.id ? action.payload : product
        ),
      };
    case "DELETE_PRODUCT":
      return {
        ...state,
        products: state.products.filter(
          (product) => product.id !== action.payload
        ),
      };
    case "INITIALIZE_PRODUCTS":
      return { ...state, isInitialized: true };
    default:
      return state;
  }
};

const ProductContext = createContext<{
  state: ProductState;
  dispatch: React.Dispatch<ProductAction>;
}>({
  state: { products: [], product: null, categories: [], isInitialized: false },
  dispatch: () => null,
});

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(productReducer, {
    products: [],
    product: null,
    categories: [],
    isInitialized: false,
  });

  useEffect(() => {
    const storedProducts = localStorage.getItem("products");
    if (storedProducts) {
      dispatch({ type: "SET_PRODUCTS", payload: JSON.parse(storedProducts) });
    }

    const storedCategories = localStorage.getItem("categories");
    if (storedCategories) {
      dispatch({
        type: "SET_CATEGORIES",
        payload: JSON.parse(storedCategories),
      });
    }

    dispatch({ type: "INITIALIZE_PRODUCTS" });
  }, []);

  useEffect(() => {
    if (state.isInitialized) {
      localStorage.setItem("products", JSON.stringify(state.products));
    }
  }, [state.products, state.isInitialized]);

  useEffect(() => {
    if (state.isInitialized) {
      localStorage.setItem("categories", JSON.stringify(state.categories));
    }
  }, [state.categories, state.isInitialized]);

  return (
    <ProductContext.Provider value={{ state, dispatch }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  return useContext(ProductContext);
};
