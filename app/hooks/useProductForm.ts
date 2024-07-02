import { useState, useCallback, FormEvent } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useProducts } from "@/app/context/ProductProvider";
import { Product } from "../product/product.interface";
import { createProduct, updateProduct } from "../product/product.service";

type UseProductFormProps = {
  initialProduct?: Product | null;
};

const useProductForm = ({ initialProduct }: UseProductFormProps = {}) => {
  const router = useRouter();
  const { dispatch } = useProducts();
  const [product, setProduct] = useState<Omit<Product, "id">>(
    initialProduct || {
      title: "",
      description: "",
      price: 0,
      category: "electronics",
      image: "",
      rating: {
        rate: 0,
        count: 0,
      },
    }
  );

  const handleChangeProductFields = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;

      // setProduct((prevProduct) => ({
      //   ...prevProduct,
      //   [name]: name === "price" ? Number(value) : value,
      //   rating:
      //     name === "rate" || name === "count"
      //       ? { ...prevProduct.rating, [name]: Number(value) }
      //       : prevProduct.rating,
      // }));
      setProduct({
        ...product,
        [name]: value,
      });
    },
    []
  );

  const validateProduct = (product: Omit<Product, "id">) => {
    if (
      !product.title ||
      !product.description ||
      product.price <= 0 ||
      !product.image ||
      product.rating?.rate <= 0 ||
      product.rating?.count <= 0
    ) {
      toast.error("Por favor completa todos los campos.");
      return false;
    }
    return true;
  };

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!validateProduct(product)) return;

      try {
        let data;
        if (initialProduct) {
          data = await updateProduct({ ...product, id: initialProduct.id });
          dispatch({
            type: "UPDATE_PRODUCT",
            payload: { ...product, id: initialProduct.id },
          });
          toast.success("Producto actualizado con éxito.");
        } else {
          data = await createProduct(product);
          dispatch({
            type: "ADD_PRODUCT",
            payload: { ...product, id: data.id },
          });
          toast.success("Producto creado con éxito.");
        }

        router.push("/");
      } catch (error) {
        console.error(error);
        toast.error("Ocurrió un error al guardar el producto.");
      }
    },
    [product, initialProduct, dispatch, router]
  );

  return {
    product,
    handleChangeProductFields,
    handleSubmit,
  };
};

export default useProductForm;
