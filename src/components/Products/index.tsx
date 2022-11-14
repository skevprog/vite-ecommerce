import React, { useEffect, useRef, useState } from "react";

import useSort, { SortConfigDirection } from "../../hooks/sort";
import { Product } from "../../types";
import { isObjectEmpty } from "../../utils";
import Cart from "../Cart";

interface ProductsProps {
  products: Product[];
  categoryName: string;
}

interface CartItem {
  quantity: number;
  product: Product;
}

export interface CartItems {
  [key: string]: CartItem;
}

type SortConfigKey = "available" | "price" | "quantity";

function Products({ products, categoryName }: ProductsProps): JSX.Element {
  const [sortedProducts, setSortedProducts] = useState<Product[]>(products);
  const [shoppingCart, setShoppingCart] = useState<CartItems>({});

  const { sortedItems, setSort, sortConfig } = useSort<Product, SortConfigKey>(products, {
    key: "available",
    direction: "ascending",
  });

  function getClassNameFor(name: SortConfigKey): SortConfigDirection | undefined {
    if (!sortConfig) return;

    return sortConfig.key === name ? sortConfig.direction : undefined;
  }

  useEffect(() => {
    setSortedProducts(sortedItems);
  }, [sortedItems, sortConfig]);

  const shoppingCartItems = useRef({});

  function preventMinus(e: React.KeyboardEvent): void {
    if (e.code === "Minus") {
      e.preventDefault();
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>, product: Product): void {
    shoppingCartItems.current = {
      ...shoppingCartItems.current,
      [e.target.name]: { quantity: e.target.value, product },
    };
  }

  function addToBasket(): void {
    setShoppingCart(shoppingCartItems.current);
  }

  // Renders sorted products
  function renderProducts(productsData: Product[]) {
    return productsData.map((product: Product) => {
      const { id, name, price, available, quantity } = product;

      return (
        <tr key={id}>
          <td>{name}</td>
          <td>{price}</td>
          <td>{available ? "Yes" : "No"}</td>
          <td>{quantity}</td>
          <td>
            <input
              min="0"
              name={name}
              placeholder="0"
              type="number"
              onChange={(e) => handleChange(e, product)}
              onKeyPress={preventMinus}
            />
          </td>
        </tr>
      );
    });
  }

  return (
    <>
      <h2>{categoryName}</h2>
      {!sortedProducts.length ? (
        <h3>Category empty</h3>
      ) : (
        <table>
          <tbody>
            <tr>
              <th>Name</th>
              <th>
                <button
                  className={getClassNameFor("price")}
                  type="button"
                  onClick={() => setSort("price")}
                >
                  Price
                </button>
              </th>
              <th>
                <button
                  className={getClassNameFor("available")}
                  type="button"
                  onClick={() => setSort("available")}
                >
                  Available
                </button>
              </th>
              <th>
                <button
                  className={getClassNameFor("quantity")}
                  type="button"
                  onClick={() => setSort("quantity")}
                >
                  Quantity
                </button>
              </th>
              <th>Add to cart</th>
            </tr>
            {renderProducts(sortedProducts)}
          </tbody>
        </table>
      )}
      {sortedProducts.length > 0 && (
        <button type="button" onClick={addToBasket}>
          Add to Cart
        </button>
      )}
      {isObjectEmpty(shoppingCart) && (
        <>
          <h3>Cart</h3>
          <Cart items={shoppingCart} />
        </>
      )}
    </>
  );
}

export default Products;
