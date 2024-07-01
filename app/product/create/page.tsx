"use client";
import React, { useState } from "react";
import toast from "react-hot-toast";
import ProductDetail from "../components/ProductDetail";
import ProductForm from "../components/ProductForm";
import { createProduct } from "../product.service";
import { Product, Category } from "../product.interface";
import { useProducts } from "@/app/context/ProductProvider";
import { useRouter } from "next/navigation";
import useProductForm from "@/app/hooks/useProductForm";

const CreateProduct = () => {
  const router = useRouter();
  const { product, handleChangeProductFields, handleSubmit } = useProductForm();

  return (
    <div className="flex">
      <div className="w-1/3">
        <ProductForm
          title="Nuevo producto"
          buttonText="Crear Producto"
          onChange={handleChangeProductFields}
          onSubmit={handleSubmit}
        />
      </div>
      <div className="w-2/3">
        <ProductDetail product={product} />
      </div>
    </div>
  );
};

export default CreateProduct;
