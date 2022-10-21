import { useEffect, useMemo, useState } from "react";

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

function Products({ products, categoryName }: ProductsProps): JSX.Element {
  const [sortedProducts, setSortedProducts] = useState<Product[]>(products);
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: "available",
    direction: "ascending",
  });

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
            </tr>
            {sortedProducts.map((product: Product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.available ? "Yes" : "No"}</td>
                <td>{product.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}

export default Products;
