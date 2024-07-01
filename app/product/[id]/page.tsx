"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ProductDetail from "../components/ProductDetail";
import Button from "@/app/common-components/Button";
import { deleteProduct } from "../product.service";
import { useProducts } from "@/app/context/ProductProvider";
import toast from "react-hot-toast";

const ProductDetailPage = () => {
  const router = useRouter();
  const params = useParams();
  const [product, setProduct] = useState({});
  const {
    state: { isInitialized, products, categories },
    dispatch,
  } = useProducts();

  console.log(params);
  useEffect(() => {
    //despues ver si funcion asincrona o meterla en services
    fetch(`https://fakestoreapi.com/products/${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setProduct(data);
      })
      .catch((error) => {
        console.error("Error al obtener los datos:", error);
      });
  }, []);

  const handleEditProduct = () => {
    localStorage.setItem("product", JSON.stringify(product));
    router.push("/product/edit");
  };

  const handleDeleteProduct = async () => {
    try {
      const data = await deleteProduct(params.id);
      dispatch({ type: "DELETE_PRODUCT", payload: data.id });
      toast.success("Producto eliminado correctamente.");
      router.push("/");
    } catch (error) {
      toast.error("Ocurrió un error al eliminar producto.");
    }
  };

  return (
    <>
      <ProductDetail product={product} hasActions />;
      <div className="flex mt-4 gap-2">
        <Button onClick={handleEditProduct} className="w-1/2 justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5 h-5 mr-2"
            viewBox="0 0 50 50"
          >
            <path d="M 46.574219 3.425781 C 45.625 2.476563 44.378906 2 43.132813 2 C 41.886719 2 40.640625 2.476563 39.691406 3.425781 C 39.691406 3.425781 39.621094 3.492188 39.53125 3.585938 C 39.523438 3.59375 39.511719 3.597656 39.503906 3.605469 L 4.300781 38.804688 C 4.179688 38.929688 4.089844 39.082031 4.042969 39.253906 L 2.035156 46.742188 C 1.941406 47.085938 2.039063 47.453125 2.292969 47.707031 C 2.484375 47.898438 2.738281 48 3 48 C 3.085938 48 3.171875 47.988281 3.257813 47.964844 L 10.746094 45.957031 C 10.917969 45.910156 11.070313 45.820313 11.195313 45.695313 L 46.394531 10.5 C 46.40625 10.488281 46.410156 10.472656 46.417969 10.460938 C 46.507813 10.371094 46.570313 10.308594 46.570313 10.308594 C 48.476563 8.40625 48.476563 5.324219 46.574219 3.425781 Z M 45.160156 4.839844 C 46.277344 5.957031 46.277344 7.777344 45.160156 8.894531 C 44.828125 9.222656 44.546875 9.507813 44.304688 9.75 L 40.25 5.695313 C 40.710938 5.234375 41.105469 4.839844 41.105469 4.839844 C 41.644531 4.296875 42.367188 4 43.132813 4 C 43.898438 4 44.617188 4.300781 45.160156 4.839844 Z M 5.605469 41.152344 L 8.847656 44.394531 L 4.414063 45.585938 Z"></path>
          </svg>
          Editar producto
        </Button>
        <Button
          className="w-1/2 !bg-red-500 text-white hover:!bg-red-600"
          onClick={handleDeleteProduct}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5 h-5 mr-2"
            viewBox="0 0 30 30"
          >
            <path d="M 14.984375 2.4863281 A 1.0001 1.0001 0 0 0 14 3.5 L 14 4 L 8.5 4 A 1.0001 1.0001 0 0 0 7.4863281 5 L 6 5 A 1.0001 1.0001 0 1 0 6 7 L 24 7 A 1.0001 1.0001 0 1 0 24 5 L 22.513672 5 A 1.0001 1.0001 0 0 0 21.5 4 L 16 4 L 16 3.5 A 1.0001 1.0001 0 0 0 14.984375 2.4863281 z M 6 9 L 7.7929688 24.234375 C 7.9109687 25.241375 8.7633438 26 9.7773438 26 L 20.222656 26 C 21.236656 26 22.088031 25.241375 22.207031 24.234375 L 24 9 L 6 9 z"></path>
          </svg>
          Eliminar producto
        </Button>
      </div>
    </>
  );
};

export default ProductDetailPage;
