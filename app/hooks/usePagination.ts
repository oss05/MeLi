import { useState, useMemo } from "react";
import { Product } from "../product/product.interface";

type UsePaginationProps = {
  items: Product[];
  itemsPerPage: number;
};

const usePagination = ({ items, itemsPerPage }: UsePaginationProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  const reversedItems = useMemo(() => [...items].reverse(), [items]);

  const totalPages = useMemo(
    () => Math.ceil(reversedItems.length / itemsPerPage),
    [reversedItems, itemsPerPage]
  );

  const currentItems = useMemo(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return reversedItems.slice(indexOfFirstItem, indexOfLastItem);
  }, [currentPage, itemsPerPage, reversedItems]);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return {
    currentPage,
    totalPages,
    currentItems,
    paginate,
    setCurrentPage,
  };
};

export default usePagination;
