"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ProductsGrid from "./product/components/ProductsGrid";
import Select from "./common-components/Select";
import {
  getCategories,
  getProducts,
  getSingleCategory,
} from "./product/product.service";
import { Product } from "./product/product.interface";
import toast from "react-hot-toast";
import Button from "./common-components/Button";
import { useProducts } from "./context/ProductProvider";

export default function Home() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const {
    state: { isInitialized, products, categories },
    dispatch,
  } = useProducts();

  const getProductsData = async () => {
    try {
      const data = await getProducts();

      dispatch({ type: "SET_PRODUCTS", payload: data });
    } catch (error) {
      toast.error("Ocurrió un error al obtener productos.");
    }
  };

  const getCategoriesData = async () => {
    try {
      const data = await getCategories();
      dispatch({ type: "SET_CATEGORIES", payload: data });
    } catch (error) {
      toast.error("Ocurrió un error al obtener categorías.");
    }
  };

  const getCategoryProducts = async () => {
    try {
      const data = await getSingleCategory(selectedCategory);
      dispatch({ type: "SET_PRODUCTS", payload: data });
    } catch (error) {
      toast.error("Ocurrió un error al obtener productos de la categoría.");
    }
  };

  useEffect(() => {
    if (!isInitialized) return;

    if (products.length === 0) {
      getProductsData();
      getCategoriesData();
    }
  }, [isInitialized, products.length]);

  useEffect(() => {
    if (selectedCategory) {
      getCategoryProducts();
    } else {
      // getProductsData();
    }
  }, [selectedCategory]);

  const handleChangeCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };

  const handleOpenProductDetail = (product: Product) => {
    router.push(`/product/${product.id}`);
  };

  return (
    <section>
      <article className="mb-14">
        <h2 className="text-6xl mb-8 font-semibold">
          {selectedCategory
            ? `Tus productos de ${selectedCategory}`
            : "Todos tus productos"}
        </h2>

        <div className="flex justify-between">
          <div className="flex ml-2 gap-2 items-center">
            <p>Filtra por categoría:</p>
            <Select options={categories} onChange={handleChangeCategory} />
          </div>
          <Button hasLink href="/product/create">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5 mr-2"
              viewBox="0 0 30 30"
            >
              <path d="M15,3C8.373,3,3,8.373,3,15c0,6.627,5.373,12,12,12s12-5.373,12-12C27,8.373,21.627,3,15,3z M21,16h-5v5 c0,0.553-0.448,1-1,1s-1-0.447-1-1v-5H9c-0.552,0-1-0.447-1-1s0.448-1,1-1h5V9c0-0.553,0.448-1,1-1s1,0.447,1,1v5h5 c0.552,0,1,0.447,1,1S21.552,16,21,16z"></path>
            </svg>
            Agregar producto
          </Button>
        </div>
      </article>
      <ProductsGrid products={products} onClick={handleOpenProductDetail} />
    </section>
  );
}
