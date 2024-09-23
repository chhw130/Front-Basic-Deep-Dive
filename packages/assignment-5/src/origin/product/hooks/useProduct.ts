import { useState } from "react";
import { Product } from "../../../types";

export const useProduct = (product: Product[]) => {
  const [products, setProducts] = useState<Product[]>(product);

  const updateProducts = (updatedProduct: Product) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
  };

  const addProduct = (newProduct: Product) => {
    setProducts((prevProducts) => [...prevProducts, newProduct]);
  };

  return { products, addProduct, updateProducts };
};
