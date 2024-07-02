"use client";
import GoBack from "@/app/common-components/GoBack";
import ProductDetail from "../components/ProductDetail";
import ProductForm from "../components/ProductForm";
import useProductForm from "@/app/hooks/useProductForm";
const CreateProduct = () => {
  const { product, handleChangeProductFields, handleSubmit } = useProductForm();

  return (
    <div>
      <GoBack />
      <div className="flex flex-col-reverse lg:flex-row mt-8">
        <div className="lg:w-1/3">
          <ProductForm
            title="Nuevo producto"
            buttonText="Crear Producto"
            onChange={handleChangeProductFields}
            onSubmit={handleSubmit}
          />
        </div>
        <div className="lg:w-2/3">
          <ProductDetail product={product} />
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;
