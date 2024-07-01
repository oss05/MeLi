import { Product } from "./product.interface";

export async function getProducts() {
  const response = await fetch("https://fakestoreapi.com/products");
  const data = await response.json();
  return data;
}

export async function createProduct(payload: Omit<Product, "id">) {
  const response = await fetch("https://fakestoreapi.com/products", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  const data = await response.json();
  return data;
}

export async function updateProduct(payload: Product) {
  const response = await fetch("https://fakestoreapi.com/products/1", {
    method: "PUT",
    body: JSON.stringify(payload),
  });
  const data = await response.json();
  return data;
}

export async function deleteProduct(productId: string) {
  const response = await fetch(
    `https://fakestoreapi.com/products/${productId}`,
    {
      method: "DELETE",
    }
  );
  const data = await response.json();
  return data;
}

export async function getCategories() {
  const response = await fetch("https://fakestoreapi.com/products/categories");
  const data = await response.json();
  return data;
}

export async function getSingleCategory(selectedCategory: string) {
  const response = await fetch(
    `https://fakestoreapi.com/products/category/${selectedCategory}`
  );
  const data = await response.json();
  return data;
}
