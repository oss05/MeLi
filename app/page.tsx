"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
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
import usePagination from "./hooks/usePagination"; // Import the custom hook

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
      console.error(error);
      toast.error("Ocurrió un error al obtener productos.");
    }
  };

  const getCategoriesData = async () => {
    try {
      const data = await getCategories();
      dispatch({ type: "SET_CATEGORIES", payload: data });
    } catch (error) {
      console.error(error);
      toast.error("Ocurrió un error al obtener categorías.");
    }
  };

  const getCategoryProducts = async () => {
    try {
      const data = await getSingleCategory(selectedCategory);
      dispatch({ type: "SET_PRODUCTS", payload: data });
    } catch (error) {
      console.error(error);
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

  const filteredProducts = useMemo(() => {
    if (selectedCategory) {
      return products.filter(
        (product) => product.category === selectedCategory
      );
    }
    return products;
  }, [products, selectedCategory]);

  const { currentPage, totalPages, currentItems, paginate, setCurrentPage } =
    usePagination({
      items: filteredProducts,
      itemsPerPage: 8,
    });

  const handleChangeCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
    setCurrentPage(1);
  };

  const handleOpenProductDetail = (product: Product) => {
    router.push(`/product/${product.id}`);
  };

  return (
    <section>
      <article className="mb-4 lg:mb-14">
        <h2 className="text-xl lg:text-6xl mb-4 lg:mb-8 font-semibold">
          {selectedCategory
            ? `Tus productos de ${selectedCategory}`
            : "Todos tus productos"}
        </h2>

        <div className="flex flex-col lg:flex-row justify-between">
          <div className="flex flex-col lg:flex-row lg:ml-2 gap-2 lg:items-center mb-4 lg:mb-0">
            <div className="w-2/8">
              <p>Filtra por categoría:</p>
            </div>
            <div className="w-6/8">
              <Select options={categories} onChange={handleChangeCategory} />
            </div>
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
      <ProductsGrid products={currentItems} onClick={handleOpenProductDetail} />
      <nav className="flex justify-center mt-8">
        <ul className="flex list-none">
          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (number) => (
              <li key={number} className="mx-1">
                <button
                  onClick={() => paginate(number)}
                  className={`px-4 py-2 border rounded ${
                    currentPage === number
                      ? "border-primary bg-secondary text-primary"
                      : "border-gray-300 bg-white "
                  }`}
                >
                  {number}
                </button>
              </li>
            )
          )}
        </ul>
      </nav>
    </section>
  );
}
