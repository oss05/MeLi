"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import GoBack from "@/app/common-components/GoBack";
import ProductDetail from "../components/ProductDetail";
import { deleteProduct, getProduct } from "../product.service";
import { useProducts } from "@/app/context/ProductProvider";
import toast from "react-hot-toast";
import { Product } from "../product.interface";
import Loader from "@/app/common-components/Loader";

const ProductDetailPage = () => {
  const router = useRouter();
  const params = useParams();
  const [product, setProduct] = useState<Product>();
  const [loading, setLoading] = useState(false);
  const { dispatch } = useProducts();

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const data = await getProduct(params.id);
        if (!data) {
          return "loafing...";
        }
        setProduct(data);
      } catch (error) {
        console.error(error);
        toast.error("Ocurrió un error al consultar el producto.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, []);

  const handleEditProduct = () => {
    router.push("/product/edit");
    dispatch({ type: "SET_PRODUCT", payload: product });
  };

  const handleDeleteProduct = async () => {
    setLoading(true);
    try {
      const data = await deleteProduct(params.id);
      dispatch({ type: "DELETE_PRODUCT", payload: data.id });
      toast.success("Producto eliminado correctamente.");
      router.push("/");
    } catch (error) {
      console.error(error);
      toast.error("Ocurrió un error al eliminar producto.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <GoBack />
      <ProductDetail
        product={product}
        actions={{
          hasActions: true,
          handleEditProduct,
          handleDeleteProduct,
        }}
      />
    </>
  );
};

export default ProductDetailPage;
