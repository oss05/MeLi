import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useProducts } from "@/app/context/ProductProvider";
import { Product } from "../product/product.interface";
import { createProduct, updateProduct } from "../product/product.service";

type UseProductFormProps = {
  initialProduct?: Omit<Product, "id">; // Producto inicial para la edición
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

  console.log("aca en eldesde", initialProduct);

  const handleChangeProductFields = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: name === "price" ? Number(value) : value,
      rating:
        name === "rate" || name === "count"
          ? { ...prevProduct.rating, [name]: Number(value) }
          : prevProduct.rating,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validación de campos
    if (
      !product.title ||
      !product.description ||
      product.price <= 0 ||
      !product.image ||
      product.rating?.rate <= 0 ||
      product.rating?.count <= 0
    ) {
      toast.error("Por favor completa todos los campos.");
      return;
    }

    const storedProduct = localStorage.getItem("product");

    try {
      let data;
      if (storedProduct) {
        data = await updateProduct({
          ...product,
          id: JSON.parse(storedProduct.id),
        });
        dispatch({
          type: "UPDATE_PRODUCT",
          payload: { ...product, id: JSON.parse(storedProduct.id) },
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
      console.log(error);
      toast.error("Ocurrió un error al guardar el producto.");
    }
  };

  return {
    product,
    handleChangeProductFields,
    handleSubmit,
  };
};

export default useProductForm;
