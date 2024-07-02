"use client";
import ProductDetail from "../components/ProductDetail";
import ProductForm from "../components/ProductForm";
import { useProducts } from "@/app/context/ProductProvider";
import useProductForm from "@/app/hooks/useProductForm";

const EditProduct = () => {
  const { state } = useProducts();

  const { product, handleChangeProductFields, handleSubmit } = useProductForm({
    initialProduct: state?.product,
  });

  return (
    <div className="flex flex-col-reverse lg:flex-row">
      <div className="lg:w-1/3">
        <ProductForm
          title="Editar producto"
          buttonText="Editar Producto"
          onChange={handleChangeProductFields}
          onSubmit={handleSubmit}
          values={product}
        />
      </div>
      <div className="lg:w-2/3">
        <ProductDetail product={product} />
      </div>
    </div>
  );
};

export default EditProduct;
