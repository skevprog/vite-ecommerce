import React, { useEffect, useMemo, useRef, useState } from "react";

import { Product } from "../../types";

interface ProductsProps {
  products: Product[];
  categoryName: string;
}

type SortConfigKey = "available" | "price" | "quantity";
type SortConfigDirection = "ascending" | "descending";
interface SortConfig {
  key: SortConfigKey;
  direction: SortConfigDirection;
}

interface CartItem {
  quantity: number;
  product: Product;
}

interface Cart {
  [key: string]: CartItem;
}

function Products({ products, categoryName }: ProductsProps): JSX.Element {
  const [sortedProducts, setSortedProducts] = useState<Product[]>(products);
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: "available",
    direction: "ascending",
  });
  const [shoppingCart, setShoppingCart] = useState<Cart>({});

  const sortedProds = useMemo(() => {
    let sortResult = [...products];

    if (!!sortConfig?.key) {
      sortResult.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }

        return 0;
      });
    }

    return sortResult;
  }, [products, sortConfig]);

  function setSort(key: SortConfigKey) {
    let direction: SortConfigDirection = "ascending";

    if (key === sortConfig.key && sortConfig.direction === "ascending") {
      direction = "descending";
    }

    setSortConfig({ key, direction });
  }

  function getClassNameFor(name: SortConfigKey): SortConfigDirection | undefined {
    if (!sortConfig) return;

    return sortConfig.key === name ? sortConfig.direction : undefined;
  }

  useEffect(() => {
    setSortedProducts(sortedProds);
  }, [sortedProds, sortConfig]);

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
            {sortedProducts.map((product: Product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.available ? "Yes" : "No"}</td>
                <td>{product.quantity}</td>
                <td>
                  <input
                    min="0"
                    name={product.name}
                    placeholder="0"
                    type="number"
                    onChange={(e) => handleChange(e, product)}
                    onKeyPress={preventMinus}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {sortedProducts.length > 0 && (
        <button type="button" onClick={addToBasket}>
          Add to Cart
        </button>
      )}
      {Object.keys(shoppingCart).length > 0 && (
        <>
          <h3>Cart</h3>
          <ul>
            {Object.keys(shoppingCart).map((item) => (
              <li key={item}>
                {item}: {shoppingCart[item].quantity}
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
}

export default Products;
